
import {
  conflictExpeption,
  notFoundExpeption,
} from "../../common/utils/response/index.js";
import { findOne } from "../../DB/database.repository.js";
import { UserModel } from "../../DB/models/index.js";
import { compareHash, generateHash } from "./../../common/utils/security/index.js";
import { EMAIL, PASSWORD, SALT_ROUND } from "../../../config/config.service.js";

export const setup = async () => {
    const checkEmailExist = await UserModel.findOne()
    if (checkEmailExist) {
      throw conflictExpeption("email admin aleardy is exist")
    }

    const adminEmail = EMAIL
    const adminPassword = PASSWORD

    const hashPassword = await generateHash({plainText:adminPassword,salt: Number(SALT_ROUND)|| 10});
    const adminAccount = await UserModel({
      email: adminEmail,
      password: hashPassword,
    });
    await adminAccount.save();

};

export const login = async (inputs) => {
  const { email, password } = inputs;
  const user = await findOne({
    model: UserModel,
    filter: { email },
    options: {
      lean: true,
    },
  });
  if (!user) {
    throw notFoundExpeption("invalid login");
  }
  const match = await compareHash({plainText:password,cipherText:user.password})
  if (!match) {
    throw notFoundExpeption("invalid login");
  }
return user
};
