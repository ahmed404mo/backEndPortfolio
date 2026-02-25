import jwt from "jsonwebtoken"
import { unauthorizedExpeption } from "../common/utils/response/error.response.js"
import { JWT_SECRET } from "../../config/config.service.js"

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    
    // 1. التأكد إن الهيدر موجود ويبدأ بـ Bearer
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return unauthorizedExpeption("No token provided or invalid format");
    }

    // 2. قص التوكن بدقة (بياخد النص اللي بعد المسافة)
    const token = authHeader.split(" ")[1];
    
    // 3. فك التشفير
    const verified = jwt.verify(token, JWT_SECRET);
    
    // 4. تخزين بيانات المستخدم في الـ Request
    req.user = verified;
    next();
    
  } catch (error) {
    console.error("JWT Verify Error:", error.message);
    // لو المشكلة في السر أو انتهاء الوقت هيرد هنا
    return unauthorizedExpeption("invalid or expired token");
  }
}

export default authMiddleware;