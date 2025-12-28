import Doctor from "../model/Doctor.js";

export const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find({});
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ message: "Error fetching doctors", error });
    }
};

export const getDoctorById = async (req, res) => {
    const { id } = req.params;
    try {
        const doctor = await Doctor.findById(id);
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({ message: "Error fetching doctor", error });
    }
};
export const getDoctorsBycategory = async (req, res) => {
    const { category } = req.params;
    try {
        const doctors = await Doctor.find({ category });
        if (doctors.length === 0) {
            return res.status(404).json({ message: "No doctors found in this category" });
        }
        res.status(200).json(doctors);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching doctors by category", error });
    }
};
export const getDoctorByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const doctor = await Doctor.findOne({ userId });
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({ message: "Error fetching doctor", error });
    }
};

export const updateDoctor = async (req, res) => {
    const { id } = req.params;
    try {
        if (req.file && req.file.path) req.body.image = req.file.path;

        const doctor = await Doctor.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({ message: "Error updating doctor", error });
    }
};

export const updateDoctorStatus = async (req, res) => { 
    const { id } = req.params;
    const { status } = req.body;
    try {
        const doctor = await Doctor.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({ message: "Error updating doctor status", error });
    }
};
export const createDoctor = async (req, res) => {
    try {
        const { userId } = req.body;

        // Prevent duplicate doctor profiles for same user
        if (userId) {
            const exists = await Doctor.findOne({ userId });
            if (exists) return res.status(400).json({ message: 'Doctor profile already exists for this user' });
        }

        // If multer uploaded a file via CloudinaryStorage, attach its path
        if (req.file && req.file.path) {
            req.body.image = req.file.path;
        }

        const newDoctor = new Doctor(req.body);
        const savedDoctor = await newDoctor.save();
        res.status(201).json(savedDoctor);
    } catch (error) {
        console.error('createDoctor error:', error);
        res.status(500).json({ message: "Error creating doctor", error: error.message || error });
    }
};

export const deleteDoctor = async (req, res) => {   
    const { id } = req.params;
    try {
        const deletedDoctor = await Doctor.findByIdAndDelete(id);
        if (!deletedDoctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        res.status(200).json({ message: "Doctor deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting doctor", error });
    }
};