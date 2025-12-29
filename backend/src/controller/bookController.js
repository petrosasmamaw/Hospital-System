import Book from "../model/Book.js";

export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

export const createBook = async (req, res) => {
    try {
        const { patientId, DoctorId } = req.body;
        const newBook = new Book({ patientId, DoctorId });
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};
export const getBookByPatientId = async (req, res) => {
    try {
        const { patientId } = req.params;
        const books = await Book.find({ patientId });
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

export const getBookByDoctorId = async (req, res) => {
    try {
        const { DoctorId } = req.params;
        const books = await Book.find({ DoctorId });
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

export const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        await Book.findByIdAndDelete(id);
        res.status(200).json({ message: "Booking deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

export const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Book.findByIdAndUpdate(id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: "Booking not found" });
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};