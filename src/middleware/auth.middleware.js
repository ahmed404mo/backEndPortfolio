import jwt from "jsonwebtoken"
import { unauthorizedExpeption } from "../common/utils/response/error.response.js"
import { JWT_SECRET } from "../../config/config.service.js"

const authMiddleware = (req, res, next) => {
  try {
    const token = req.header("Authorization")
    
    if (!token) {
      return unauthorizedExpeption("not allowed access to admin") // 👈 ضفنا return هنا للأمان
    } 
    
    const verified = jwt.verify(token.replace("Bearer ",""), JWT_SECRET)
    req.user = verified
    next()
    
  } catch(error) {
    return unauthorizedExpeption("invalid or expired token")
  }
}

export default authMiddleware