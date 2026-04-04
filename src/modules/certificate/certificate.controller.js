import { Router } from "express";
import * as certificateServices from "./certificate.service.js";

const router = Router();

router.get("/", certificateServices.getCertificates);
router.post("/", certificateServices.addCertificate);
router.put("/:id", certificateServices.updateCertificate);
router.delete("/:id", certificateServices.deleteCertificate);

export default router;