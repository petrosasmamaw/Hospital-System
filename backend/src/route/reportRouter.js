import express from "express";
import {getAllReports,createReport,getReportsByPatientId,getReportsByDoctorId,getReportsByPatientAndDoctor,getReportById,deleteReport,updateReport} from "../controller/reportController.js";

const router = express.Router();

router.get("/", getAllReports);
router.post("/", createReport);
router.get("/patient/:patientId", getReportsByPatientId);
router.get("/patient/:patientId/doctor/:doctorId", getReportsByPatientAndDoctor);
router.get("/doctor/:doctorId", getReportsByDoctorId);
router.get("/:id", getReportById);
router.delete("/:id", deleteReport);
router.put("/:id", updateReport);

export default router;
