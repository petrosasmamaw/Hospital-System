import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
 patientId: { type: String, required: true },
 doctorId: { type: String, required: true },
 report: { type: String, required: true }
}, { timestamps: true}
);

const Report = mongoose.model("Report", reportSchema);
export default Report;
   