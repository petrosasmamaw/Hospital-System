import express from 'express';
import { getAllBooks, createBook,
    getBookByDoctorId,getBookByPatientId,
    deleteBook,updateBook } from '../controller/bookController.js';

const router = express.Router();

router.get('/', getAllBooks);
router.post('/', createBook);
router.get('/patient/:patientId', getBookByPatientId);
router.get('/doctor/:DoctorId', getBookByDoctorId);
router.delete('/:id', deleteBook);
router.put('/:id', updateBook);

export default router;