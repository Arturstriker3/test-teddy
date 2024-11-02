import { NextFunction, Request, Response } from "express";
import { urlRepositories } from "../repositories/urlRepositories";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../helpers/api-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { zodValidationError } from "../helpers/zodValidationError";
import { IUrlPost, IUrlGet } from "../interfaces";
import { generateShortUrl } from "../helpers/generateShortUrl";
import "dotenv/config";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? `${process.env.SERVER_URL}:${process.env.PORT}`
    : `http://localhost:${process.env.PORT || "3000"}`;

export class UrlController {
  async post(req: Request, res: Response, next: NextFunction) {
    const urlSchema = z
      .object({
        url: z.string().url("Invalid url format"),
      })
      .strict();

    try {
      const urlData: IUrlPost = urlSchema.parse(req.body);
      const { url } = urlData;

      let shortCode;
      let urlExists;

      do {
        shortCode = generateShortUrl();
        urlExists = await urlRepositories.findOneBy({ shortUrl: shortCode });
      } while (urlExists);

      const user = req.user;

      const newUrl = urlRepositories.create({
        originalUrl: url,
        shortUrl: shortCode,
        user: req.user ? req.user : undefined,
      });

      await urlRepositories.save(newUrl);

      const shortUrlFull = `${BASE_URL}/${newUrl.shortUrl}`;

      const responseUrl = {
        url: shortUrlFull,
        createdAt: newUrl.createdAt,
        ...(user && { userId: user.id }),
      };

      return res.status(201).json(responseUrl);
    } catch (error) {
      const validationError = zodValidationError(error);
      if (validationError) {
        return res.status(400).json(validationError);
      }
      return next(new Error("Failed to create url"));
    }
  }

  async redirect(req: Request, res: Response, next: NextFunction) {
    const { shortUrl } = req.params;

    try {
      const urlRecord = await urlRepositories.findOneBy({ shortUrl });

      if (!urlRecord) {
        throw new NotFoundError("URL not found");
      }

      urlRecord.clickCount += 1;
      await urlRepositories.save(urlRecord);

      return res.redirect(urlRecord.originalUrl);
    } catch (error) {
      return next(new Error("Failed to redirect to url"));
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    const user = req.user;

    if (!user) {
      return next(new UnauthorizedError("Not Authorized"));
    }

    const urlGetSchema = z
      .object({
        page: z.coerce.number().min(1).optional(),
        limit: z.coerce.number().min(1).max(100).optional(),
      })
      .strict();

    try {
      const { page, limit } = urlGetSchema.parse(req.query);

      const queryParams: IUrlGet = {
        page: page || 1,
        limit: limit || 10,
      };

      const [urls, total] = await urlRepositories.findAndCount({
        where: { user: { id: user.id }, isActive: true },
        order: { createdAt: "DESC" },
        skip: (queryParams.page - 1) * queryParams.limit,
        take: queryParams.limit,
      });

      if (urls.length === 0) {
        return next(new NotFoundError("Not Urls found"));
      }

      const responseUrls = urls.map((url) => ({
        urlId: url.id,
        originalUrl: url.originalUrl,
        shortUrl: `${BASE_URL}/${url.shortUrl}`,
        createdAt: url.createdAt,
        updatedAt: url.updatedAt,
        clickCount: url.clickCount,
      }));

      return res.status(200).json({
        data: responseUrls,
        total,
        page: queryParams.page,
        lastPage: Math.ceil(total / queryParams.limit),
      });
    } catch (error) {
      const validationError = zodValidationError(error);
      if (validationError) {
        return res.status(400).json(validationError);
      }
      return next(new Error("Failed to retrieve urls"));
    }
  }
}
