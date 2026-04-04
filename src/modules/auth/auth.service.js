import { conflictExpeption, notFoundExpeption } from "../../common/utils/response/index.js";
import { findOne } from "../../DB/database.repository.js";
import { UserModel } from "../../DB/models/index.js";

import { compareHash, generateHash, generateToken } from "./../../common/utils/security/index.js"; 
import { EMAIL, PASSWORD, SALT_ROUND, JWT_SECRET } from "../../../config/config.service.js";

export const setup = async () => {
    const checkEmailExist = await UserModel.findOne();
    if (checkEmailExist) {
      throw conflictExpeption("email admin already exists");
    }

    const adminEmail = EMAIL;
    const adminPassword = PASSWORD;

    if (!adminEmail || !adminPassword) {
      throw new Error("Missing EMAIL or PASSWORD in environment variables");
    }

    const hashPassword = await generateHash({ plainText: adminPassword, salt: Number(SALT_ROUND) || 10 });
    
    const adminAccount = new UserModel({
      email: adminEmail,
      password: hashPassword,
    });
    
    await adminAccount.save();
    
    return adminAccount;
};

export const login = async (inputs) => {
  const { email, password } = inputs;
  
  console.log("Input Email:", email);

  const user = await findOne({
    model: UserModel,
    filter: { email },
    options: { lean: true },
  });

  if (!user) {
    console.log("❌ User not found in Database");
    throw notFoundExpeption("invalid login");
  }

  const match = await compareHash({ plainText: password, cipherText: user.password });
  
  if (!match) {
    console.log("❌ Password doesn't match hash");
    throw notFoundExpeption("invalid login");
  }

  const token = await generateToken({ 
    payload: { id: user._id, email: user.email }, 
    secret: JWT_SECRET || 'AhmedMokhtar_FullStack_2028_Key'
  });

  return { token, user };
};