import { Router } from "express";
import { login, setup } from "./auth.service.js";
import { successResponse } from "../../common/utils/response/success.response.js";

const router = Router();

router.post("/setup", async (req, res, next) => {
  try {
    const account = await setup();
    return successResponse({ res, status: 201, data: { account } });
  } catch (error) {
    next(error); 
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const account = await login(req.body);
    return successResponse({ res, data: { account } });
  } catch (error) {
    next(error);
  }
});

export default router;