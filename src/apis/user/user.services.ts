import { BaseMongoService } from "../../services/mongoose";

import { UserModel, IUserModel } from "./user.model";
export const UserService = new BaseMongoService<IUserModel>(UserModel);
