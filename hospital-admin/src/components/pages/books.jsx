import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "motion/react";
import bookImg from "../../assets/book.jpg";
import { fetchBooks, deleteBook } from "../slices/slice/bookSlice";

export default function Books() {
	const dispatch = useDispatch();
	const { books, loading, error } = useSelector((s) => s.books || {});

	useEffect(() => {
		dispatch(fetchBooks());
	}, [dispatch]);

	const handleDelete = async (id) => {
		try {
			await dispatch(deleteBook(id)).unwrap();
			dispatch(fetchBooks());
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<div className="admin-collection page">
			<header className="collection-header">
				<img src={bookImg} alt="books" />
				<div>
					<h1>Bookings</h1>
					<p className="collection-sub">All bookings across the hospital. Manage and delete records as needed.</p>
				</div>
			</header>

			<section className="collection-grid">
				{loading && <div className="muted">Loading…</div>}
				{error && <div className="muted">Error: {error}</div>}
				{books && books.map((b) => (
					<motion.article key={b._id} className="admin-card" whileHover={{ y: -6 }}>
						<div className="card-media"><img src={bookImg} alt="book"/></div>
						<div className="card-body">
							<h3>Booking</h3>
							<p className="muted">Booking ID: {b._id}</p>
							<p className="card-desc">Patient: {b.patientId} • Doctor: {b.DoctorId}</p>
						</div>
						<div className="card-actions">
							<button className="btn-ghost btn-delete" onClick={() => handleDelete(b._id)}>Delete</button>
						</div>
					</motion.article>
				))}
			</section>
		</div>
	);
}
