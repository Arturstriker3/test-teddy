import { NextFunction, Request, Response } from "express";
import { User } from "../entities/User";
import { userRepository } from "../repositories/userRepositories";
import { BadRequestError, NotFoundError } from "../helpers/api-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { zodValidationError } from "../helpers/zodValidationError";
import { IUserPost } from "../interfaces";

export class UserController {
  async post(req: Request, res: Response, next: NextFunction) {
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
        throw new BadRequestError("User already exists");
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = userRepository.create({
        name,
        email,
        password: hashPassword,
      });

      await userRepository.save(newUser);

      const { password: _, ...user } = newUser;

      return res.status(201).json(user);
    } catch (error) {
      const validationError = zodValidationError(error);
      if (validationError) {
        return res.status(400).json(validationError);
      }
      return next(new Error("Failed to create user"));
    }
  }
}
