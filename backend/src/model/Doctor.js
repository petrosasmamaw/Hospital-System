import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    userId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    status: { type: String, enum: ["active", "inactive"],  default: "inactive", },
    image : { type: String },
    specialization: { type: String, required: true },
    education: { type: String, required: true },
    description: { type: String, required: true },
    phone: { type: String, required: true },
    category: { type: String, enum: ["Primary", "Bone, Joint & Muscle","Heart & Circulation","Brain & Mental Health","Digestive & Stomach","Digestive & Stomach"] },
},
{ timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;