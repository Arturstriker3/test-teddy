import { z } from "zod";
import { IUserPost } from "../interfaces/IUserPost";
import { BadRequestError } from "../helpers/api-errors";

export class UserValidation {
  static postMethod(userData: IUserPost): IUserPost {
    const userSchema = z.object({
      name: z.string().min(1, "Name is required"),
      email: z.string().email("Invalid email format"),
      password: z.string().min(6, "Password must be at least 6 characters long"),
    });

    try {
      return userSchema.parse(userData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new BadRequestError(error.errors.map(e => e.message).join(", "));
      }
      throw error;
    }
  }
}
