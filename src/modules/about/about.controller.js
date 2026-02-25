import { Router } from "express";
import * as aboutService from "./about.service.js";
import { successResponse } from "../../common/utils/response/success.response.js";
import authMiddleware from "../../middleware/auth.middleware.js";

const router = Router();

router.get("/", async (req, res, next) => {
  const aboutData = await aboutService.getAboutData();
  return successResponse({ res, data: aboutData });
});

router.put("/", authMiddleware, async (req, res, next) => {
  const updatedAbout = await aboutService.updateAboutData(req.body);
  return successResponse({ res, message: "About page updated successfully", data: { updatedAbout } });
});

export default router;