import { certificateModel } from "../../DB/models/certificate.model.js";

export const addCertificate = async (req, res, next) => {
  try {
    const { title, issuer, issueDate, certImage, certLink } = req.body;
    
    const newCertificate = await certificateModel.create({
      title,
      issuer,
      issueDate,
      certImage,
      certLink
    });

    return res.status(201).json({ success: true, message: "Certificate added successfully", data: newCertificate });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error adding certificate", error: error.message });
  }
};

export const getCertificates = async (req, res, next) => {
  try {
    const certificates = await certificateModel.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: certificates });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error fetching certificates", error: error.message });
  }
};

export const deleteCertificate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCert = await certificateModel.findByIdAndDelete(id);
    
    if (!deletedCert) {
      return res.status(404).json({ success: false, message: "Certificate not found" });
    }
    
    return res.status(200).json({ success: true, message: "Certificate deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error deleting certificate", error: error.message });
  }
};