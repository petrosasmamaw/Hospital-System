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

/* 🔴 REQUIRED FOR RENDER + COOKIES */
app.set('trust proxy', 1);

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'https://YOUR-FRONTEND.vercel.app',
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ROUTES */
app.use('/api/doctors', doctorRouter);
app.use('/api/patients', patientRouter);
app.use('/api/reports', reportRouter);
app.use('/api/auth', authRouter);
app.use('/api/books', bookRouter);

/* STATIC FILES */
app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));

/* DATABASE */
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

/* SERVER */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
