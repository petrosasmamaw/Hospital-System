import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctorByUserId } from "../slices/slice/doctorSlice";
import { fetchBooksByDoctorId, deleteBook } from "../slices/slice/bookSlice";
import { getPatientsById } from "../slices/slice/patientSlice";
import { getPatientsById } from "../slices/slice/patientSlice";

export default function BooksList({ user }) {
	const dispatch = useDispatch();
	const doctorsState = useSelector((s) => s.doctors || { doctors: [], loading: false });
	const booksState = useSelector((s) => s.books || { books: [], loading: false });
	const patientsState = useSelector((s) => s.patients || { patients: [], loading: false });

	const userId = user && (user.id || user._id);

	useEffect(() => {
		if (!userId) return;
		dispatch(fetchDoctorByUserId(userId));
	}, [dispatch, userId]);

	const doctor = doctorsState.doctors.find((d) => d.userId === userId) || null;

	useEffect(() => {
		if (doctor && doctor._id) dispatch(fetchBooksByDoctorId(doctor._id));
	}, [dispatch, doctor]);

	useEffect(() => {
		if (!booksState.books || booksState.books.length === 0) return;
		const ids = [...new Set(booksState.books.map((b) => b.patientId).filter(Boolean))];
		ids.forEach((id) => {
			const exists = patientsState.patients.find((p) => p._id === id);
			if (!exists) dispatch(getPatientsById(id));
		});
	}, [booksState.books, patientsState.patients, dispatch]);

	// Ensure patient data for displayed bookings
	useEffect(() => {
		if (!booksState.books || booksState.books.length === 0) return;
		const ids = [...new Set(booksState.books.map((b) => b.patientId).filter(Boolean))];
		ids.forEach((id) => {
			const exists = patientsState.patients.find((p) => p._id === id);
			if (!exists) dispatch(getPatientsById(id));
		});
	}, [booksState.books, patientsState.patients, dispatch]);

	const handleDelete = async (id) => {
		if (!window.confirm('Delete this booking?')) return;
		try {
			await dispatch(deleteBook(id)).unwrap();
			window.alert('Deleted');
		} catch (err) {
			window.alert('Delete failed: ' + (err?.message || err));
		}
	};

	return (
		<div className="books-list-root">
			<header className="books-header">
				<h1>My Appointments</h1>
				<p className="books-sub">Appointments booked with patients — fetched for profile.</p>
			</header>

			<main className="books-list">
				{booksState.loading && <div className="books-loading">Loading…</div>}
				{booksState.books.length === 0 && <div className="books-empty">No appointments found.</div>}

				<div className="books-grid">
					{booksState.books.map((b) => {
						const patient = patientsState.patients.find((p) => p._id === b.patientId) || null;
						return (
							<div key={b._id} className="book-item">
								<div className="book-main">
									<div className="book-date">{b.date ? new Date(b.date).toLocaleString() : '-'}</div>
									<div className="book-patient-name">{patientsState.patients.find((p) => p._id === b.patientId)?.name || 'Unknown Patient'}</div>
									<div className="book-patient-meta">{patientsState.patients.find((p) => p._id === b.patientId) ? `${patientsState.patients.find((p) => p._id === b.patientId).age || ''} • ${patientsState.patients.find((p) => p._id === b.patientId).gender || ''} • ${patientsState.patients.find((p) => p._id === b.patientId).phone || ''}` : b.patientId}</div>
									<div className="book-notes">{b.notes || '—'}</div>
								</div>
								<div className="book-actions">
									<button className="btn-ghost" onClick={() => handleDelete(b._id)}>Delete</button>
								</div>
							</div>
						);
					})}
				</div>
			</main>
		</div>
	);
}
