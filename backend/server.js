import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import doctorRouter from './src/route/doctorRouter.js';
import patientRouter from './src/route/patientRouter.js';
import reportRouter from './src/route/reportRouter.js';
import authRouter from './src/route/authRouter.js';
import bookRouter from './src/route/bookRouter.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: (origin, callback) => callback(null, true), 
  credentials: true,
}));
app.use(express.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
app.use('/api/doctors', doctorRouter);
app.use('/api/patients', patientRouter);
app.use('/api/reports', reportRouter);
app.use('/api/auth', authRouter);
app.use('/api/books', bookRouter);


app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
