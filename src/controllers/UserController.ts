import { NextFunction, Request, Response } from "express";
import { User } from "../entities/User";
import { userRepository } from "../repositories/userRepositories";
import { BadRequestError, NotFoundError } from "../helpers/api-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserValidation } from "../validations/userValidation";
import { IUserPost } from "../interfaces";

export class UserController {
  async post(req: Request, res: Response, next: NextFunction) {
    try {
      const userData: IUserPost = UserValidation.postMethod(req.body);

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
      return next(new Error("Failed to create user"));
    }
  }
}
