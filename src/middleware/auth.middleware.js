import jwt from "jsonwebtoken"
import { unauthorizedExpeption } from "../common/utils/response/error.response.js"
import { JWT_SECRET } from "../../config/config.service.js"

const authMiddleware = (req, res, next) => {
  try {
const authHeader = req.header("Authorization");
const token = authHeader && authHeader.split(" ")[1]; 

if (!token) return unauthorizedExpeption("No token provided");

const verified = jwt.verify(token, JWT_SECRET);
    
    req.user = verified
    next()
    
  } catch(error) {
    return unauthorizedExpeption("invalid or expired token")
  }
}

export default authMiddleware