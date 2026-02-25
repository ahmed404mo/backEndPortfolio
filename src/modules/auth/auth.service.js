
// import {
//   conflictExpeption,
//   notFoundExpeption,
// } from "../../common/utils/response/index.js";
// import { findOne } from "../../DB/database.repository.js";
// import { UserModel } from "../../DB/models/index.js";
// import { compareHash, generateHash } from "./../../common/utils/security/index.js";
// import { EMAIL, PASSWORD, SALT_ROUND, TOKEN_SIGNATURE } from "../../../config/config.service.js";

// export const setup = async () => {
//     const checkEmailExist = await UserModel.findOne()
//     if (checkEmailExist) {
//       throw conflictExpeption("email admin aleardy is exist")
//     }

//     const adminEmail = EMAIL
//     const adminPassword = PASSWORD

//     const hashPassword = await generateHash({plainText:adminPassword,salt: Number(SALT_ROUND)|| 10});
//     const adminAccount = await UserModel({
//       email: adminEmail,
//       password: hashPassword,
//     });
//     await adminAccount.save();

// };

// // export const login = async (inputs) => {
// //   const { email, password } = inputs;
// //   const user = await findOne({
// //     model: UserModel,
// //     filter: { email },
// //     options: {
// //       lean: true,
// //     },
// //   });
// //   if (!user) {
// //     throw notFoundExpeption("invalid login");
// //   }
// //   const match = await compareHash({plainText:password,cipherText:user.password})
// //   if (!match) {
// //     throw notFoundExpeption("invalid login");
// //   }
// //   const token = await generateToken({ 
// //     payload: { id: user._id, email: user.email }, 
// //     signature: TOKEN_SIGNATURE || "default_secret" 
// //   })
// // const { password: _, ...userWithoutPassword } = user;
// //   return { token, user: userWithoutPassword };
// // };


// export const login = async (inputs) => {
//   const { email, password } = inputs;
  
//   // 🔍 اطبع اللي اليوزر كاتبه واللي في السيرفر عشان تقارن
//   console.log("Input Email:", email);
//   console.log("Input Password:", password);

//   const user = await findOne({
//     model: UserModel,
//     filter: { email },
//     options: { lean: true },
//   });

//   if (!user) {
//     console.log("❌ User not found in Database");
//     throw notFoundExpeption("invalid login");
//   }

//   const match = await compareHash({ plainText: password, cipherText: user.password });
  
//   if (!match) {
//     console.log("❌ Password doesn't match hash");
//     throw notFoundExpeption("invalid login");
//   }

//   const token = await generateToken({ 
//     payload: { id: user._id, email: user.email }, 
//     signature: TOKEN_SIGNATURE || "احمد_مختار_سيكرت" 
//   });

//   return { token, user };
// };

import { conflictExpeption, notFoundExpeption } from "../../common/utils/response/index.js";
import { findOne } from "../../DB/database.repository.js";
import { UserModel } from "../../DB/models/index.js";
// ✅ 1. ضفنا generateToken هنا
import { compareHash, generateHash, generateToken } from "./../../common/utils/security/index.js"; 
import { EMAIL, PASSWORD, SALT_ROUND, JWT_SECRET } from "../../../config/config.service.js";

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
  
  console.log("Input Email:", email);
  console.log("Input Password:", password);

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