import jwt from "jsonwebtoken"
import { unauthorizedExpeption } from "../common/utils/response/error.response.js"
import { JWT_SECRET } from "../../config/config.service.js"

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")
  if (!token) {
    unauthorizedExpeption("not allowed access to admin")
  } 
  try{
    const verified = jwt.verify(token.replace("Bearer ",""),JWT_SECRET)
    req.user = verified
    next()
  }catch(error){
badrequestExpeption("invalid token4")
  }
}

export default authMiddleware
