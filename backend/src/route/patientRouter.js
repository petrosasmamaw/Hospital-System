import express from "express";
import { getAllPatients,getPatientById,
    getPatientByUserId, updatePatient,createPatient,
    deletePatient } from "../controller/patientController.js";

const router = express.Router();

router.get("/", getAllPatients);
router.get("/:id", getPatientById);
router.get("/user/:userId", getPatientByUserId);
router.post("/", createPatient);
router.put("/:id", updatePatient);
router.delete("/:id", deletePatient);

export default router;
 