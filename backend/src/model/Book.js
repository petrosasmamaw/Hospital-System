import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    patientId: { type: String, required: true },
    DoctorId: { type: String, required: true },
     status: { type: String, enum: ["checkedIn", "waiting","inProgress"],  default: "waiting", },
},
{ timestamps: true }
);
const Book = mongoose.model("Book", bookSchema);

export default Book;