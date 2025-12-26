import express from "express";
import upload from "../middleware/upload.js";
import { getAllDoctors,getDoctorById,
    getDoctorByUserId, updateDoctor,
    updateDoctorStatus,createDoctor,
    deleteDoctor } from "../controller/doctorController.js";

const router = express.Router();

router.get("/", getAllDoctors); 
router.get("/:id", getDoctorById);
router.get("/user/:userId", getDoctorByUserId);
router.post("/", upload.single("Image"), createDoctor);
router.put("/:id", upload.single("Image"), updateDoctor);
router.patch("/:id/status", updateDoctorStatus);
router.delete("/:id", deleteDoctor);

export default router;
 