import { NextFunction, Request, Response } from "express";
import { userRepository } from "../repositories/userRepositories";
import { BadRequestError, NotFoundError } from "../helpers/api-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { zodValidationError } from "../helpers/zodValidationError";
import { IUserPost, IUserLogin } from "../interfaces";
import { logger } from "../helpers/logger";

export class UserController {
  async register(req: Request, res: Response, next: NextFunction) {
    const userSchema = z
      .object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email format"),
        password: z
          .string()
          .min(6, "Password must be at least 6 characters long"),
      })
      .strict();

    try {
      const userData: IUserPost = userSchema.parse(req.body);

      const { name, email, password } = userData;

      const userExist = await userRepository.findOneBy({ email });

      if (userExist) {
        return res.status(400).json({ 
          message: "Email already in use", 
        });
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = userRepository.create({
        name,
        email,
        password: hashPassword,
      });

      await userRepository.save(newUser);

      const responseUser = {
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdAt,
      };

      logger(`User register method called`);

      return res.status(201).json(responseUser);
    } catch (error) {
      const validationError = zodValidationError(error);
      if (validationError) {
        return res.status(400).json(validationError);
      }
      return next(new Error("Failed to create user"));
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const loginSchema = z
      .object({
        email: z.string().email("Invalid email format"),
        password: z
          .string()
          .min(6, "Password must be at least 6 characters long"),
      })
      .strict();

    try {
      const loginData: IUserLogin = loginSchema.parse(req.body);

      const { email, password } = loginData;

      const user = await userRepository.findOneBy({ email });

      if (!user) {
        return new BadRequestError("Invalid credentials");
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return new BadRequestError("Invalid credentials");
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET ?? "", {
        expiresIn: "7d",
      });

      logger(`User login method called and token returned`);

      return res.status(200).json({ token });
    } catch (error) {
      const validationError = zodValidationError(error);
      if (validationError) {
        return res.status(400).json(validationError);
      }
      return next(new Error("Failed to login"));
    }
  }

  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user;

      if (!user) {
        return next(new NotFoundError("User not found"));
      }

      logger(`User getProfile method called`);

      return res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      });
    } catch (error) {
      return next(new Error("Failed to get profile"));
    }
  }
}
