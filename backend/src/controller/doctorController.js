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
        const newDoctor = new Doctor(req.body); 
        const savedDoctor = await newDoctor.save();
        res.status(201).json(savedDoctor);
    } catch (error) {
        res.status(500).json({ message: "Error creating doctor", error });
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