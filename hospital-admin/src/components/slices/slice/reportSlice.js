import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const CLIENTAPI_URL = "http://localhost:5000/api/reports/";

export const fetchAllReports = createAsyncThunk(
    "reports/fetchAll",
    async () => {
        const response = await axios.get(CLIENTAPI_URL);
        return response.data;
    }
);
export const createReport = createAsyncThunk(
    "reports/create",
    async (reportData) => {
        const response = await axios.post(CLIENTAPI_URL, reportData);
        return response.data;
    }
);
export const fetchReportsByPatientId = createAsyncThunk(
    "reports/fetchByPatientId",
    async (patientId) => {  
        const response = await axios.get(`${CLIENTAPI_URL}patient/${patientId}`);
        return response.data;
    }
);
export const fetchReportsByDoctorId = createAsyncThunk(
    "reports/fetchByDoctorId",
    async (doctorId) => {  
        const response = await axios.get(`${CLIENTAPI_URL}doctor/${doctorId}`);
        return response.data;
    }
);
export const deleteReport = createAsyncThunk(
    "reports/delete",
    async (reportId) => {
        await axios.delete(`${CLIENTAPI_URL}${reportId}`);
        return reportId;
    }
);
export const fetchReportById = createAsyncThunk(
    "reports/fetchById",
    async (reportId) => {
        const response = await axios.get(`${CLIENTAPI_URL}${reportId}`);
        return response.data;
    }   
);
export const updateReport = createAsyncThunk(
    "reports/update",
    async ({ reportId, updatedData }) => {
        const response = await axios.put(`${CLIENTAPI_URL}${reportId}`, updatedData);
        return response.data;
    }   
);
 const reportSlice = createSlice({
    name: "reports",
    initialState: {