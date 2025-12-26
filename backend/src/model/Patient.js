import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    userId: { type: String, required: true, unique: true },
    gender: { type: String, enum: ["male", "female", "other"] },
    age : { type: String },
    phone: { type: String, required: true },
    emergencyPhone: { type: String, required: true },
    bloodType: { type: String, required: true },
    medicalHistory: { type: String, required: true },
},
{ timestamps: true }
);

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;