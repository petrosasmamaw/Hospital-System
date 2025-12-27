import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    patientId: { type: String, required: true },
    DoctorId: { type: String, required: true },
},
{ timestamps: true }
);
const Book = mongoose.model("Book", bookSchema);

export default Book;