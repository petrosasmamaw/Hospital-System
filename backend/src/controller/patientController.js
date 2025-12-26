import Patient from "../model/Patient.js";

export const getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find({});
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ message: "Error fetching patients", error });
    }
};

export const getPatientById = async (req, res) => {
    const { id } = req.params;
    try {
        const patient = await Patient.findById(id);
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ message: "Error fetching patient", error });
    }
};
export const getPatientByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const patient = await Patient.findOne({ userId });
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ message: "Error fetching patient", error });
    }
};

export const updatePatient = async (req, res) => {
    const { id } = req.params;
    try {
        const patient = await Patient.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ message: "Error updating patient", error });
    }
};

export const createPatient = async (req, res) => {
    try {
        const newPatient = new Patient(req.body); 
        const savedPatient = await newPatient.save();
        res.status(201).json(savedPatient);
    } catch (error) {
        res.status(500).json({ message: "Error creating patient", error });
    }   
};

export const deletePatient = async (req, res) => {   
    const { id } = req.params;
    try {
        const deletedPatient = await Patient.findByIdAndDelete(id);
        if (!deletedPatient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        res.status(200).json({ message: "Patient deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting patient", error });
    }
};