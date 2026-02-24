import { compare, genSalt, hash } from "bcrypt";
import { SALT_ROUND } from "../../../../config/config.service.js";

// generate
export const generateHash = async ({
  plainText,
  salt=SALT_ROUND,
  minor="b",
}={})=>{
  const generatedSalt = await genSalt(salt,minor)
  const Hashvalue=await hash(plainText,generatedSalt)
return Hashvalue
}

// compare
export const compareHash = async ({
  plainText,
  cipherText,
  minor="b",
}={})=>{
  // const generatedSalt = await genSalt(salt,minor)
  const match=await compare(plainText,cipherText)
return match
}