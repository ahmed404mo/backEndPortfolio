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
    return res.status(201).json({ success: true, data: newCertificate });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const updateCertificate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, issuer, issueDate, certImage, certLink } = req.body;
    const updatedCert = await certificateModel.findByIdAndUpdate(
      id,
      { title, issuer, issueDate, certImage, certLink },
      { new: true }
    );
    if (!updatedCert) return res.status(404).json({ success: false, message: "Not found" });
    return res.status(200).json({ success: true, data: updatedCert });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getCertificates = async (req, res, next) => {
  try {
    const certificates = await certificateModel.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: certificates });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteCertificate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCert = await certificateModel.findByIdAndDelete(id);
    if (!deletedCert) return res.status(404).json({ success: false, message: "Not found" });
    return res.status(200).json({ success: true, message: "Deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};