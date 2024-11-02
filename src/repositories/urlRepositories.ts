import { AppDataSource } from "../data-source";
import { Url } from "../entities/Url";

export const userRepository = AppDataSource.getRepository(Url); {

}