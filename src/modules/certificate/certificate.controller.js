import { Router } from "express";
import * as certificateController from "./certificate.controller.js";

const router = Router();

router.get("/", certificateController.getCertificates);
router.post("/", certificateController.addCertificate);
router.put("/:id", certificateController.updateCertificate);
router.delete("/:id", certificateController.deleteCertificate);

export { router as certificateRouter };