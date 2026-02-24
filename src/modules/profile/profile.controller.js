import { Router } from "express";
import * as profileService from "./profile.service.js";
import { successResponse } from "../../common/utils/response/success.response.js";
import authMiddleware from "../../middleware/auth.middleware.js";

const router = Router();

router.get("/", async (req, res, next) => {
  const profile = await profileService.getProfile();
  return successResponse({ res, data: profile });
});


router.put("/", authMiddleware, async (req, res, next) => {
  const updateProfile = await profileService.upsertProfile(
    req.body
  );
  return successResponse({ res, message:"Done Update Profile",data: { updateProfile } });
});



export default router;
