import { JWT_SECRET } from "../../../../config/config.service.js";
import jwt  from 'jsonwebtoken';

export const generateToken = async({
payload={},
secret=JWT_SECRET,
options={}
}={})=>{
  return jwt.sign(payload,secret,options)
}