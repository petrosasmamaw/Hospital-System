import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
