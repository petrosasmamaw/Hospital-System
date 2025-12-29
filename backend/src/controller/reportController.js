import Report from "../model/Report.js";

export const getAllReports = async (req, res) => {
    try {
        const reports = await Report.find();
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: "Error fetching reports", error });
    }
};

export const createReport = async (req, res) => {
    try {
        const newReport = new Report(req.body);
        const savedReport = await newReport.save();
        res.status(201).json(savedReport);
    } catch (error) {
        res.status(500).json({ message: "Error creating report", error });
    }
};

export const getReportsByPatientId = async (req, res) => {
    const { patientId } = req.params;
    try {
        const reports = await Report.find({ patientId });
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: "Error fetching reports", error });
    }
};

export const getReportsByDoctorId = async (req, res) => {
    const { doctorId } = req.params;
    try {
        const reports = await Report.find({ doctorId });
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: "Error fetching reports", error });
    }
};

export const getReportsByPatientAndDoctor = async (req, res) => {
    const { patientId, doctorId } = req.params;
    try {
        const reports = await Report.find({ patientId, doctorId });
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: "Error fetching reports", error });
    }
};
export const getReportById = async (req, res) => {
    const { id } = req.params;
    try {
        const report = await Report.findById(id);
        if (!report) {
            return res.status(404).json({ message: "Report not found" });
        }
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: "Error fetching report", error });
    }
};

export const deleteReport = async (req, res) => {   
    const { id } = req.params;
    try {
        const deletedReport = await Report.findByIdAndDelete(id);
        if (!deletedReport) {
            return res.status(404).json({ message: "Report not found" });
        }
        res.status(200).json({ message: "Report deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting report", error });
    }
};

export const updateReport = async (req, res) => {
    const { id } = req.params;
    try {
        const report = await Report.findByIdAndUpdate(id, req.body, { new: true });
        if (!report) {
            return res.status(404).json({ message: "Report not found" });
        }
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: "Error updating report", error });
    }
};