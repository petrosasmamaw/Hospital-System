import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "motion/react";
import patientImg from "../../assets/patient1.jpg";
import { fetchPatients, deletePatient } from "../slices/slice/patientSlice";

export default function Patients() {
	const dispatch = useDispatch();
	const { patients, loading, error } = useSelector((s) => s.patients || {});

	useEffect(() => {
		dispatch(fetchPatients());
	}, [dispatch]);

	const handleDelete = async (id) => {
		try {
			await dispatch(deletePatient(id)).unwrap();
			dispatch(fetchPatients());
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<div className="admin-collection page">
			<header className="collection-header">
				<img src={patientImg} alt="patients" />
				<div>
					<h1>Patients</h1>
					<p className="collection-sub">Registered patients and their basic profile information.</p>
				</div>
			</header>

			<section className="collection-grid">
				{loading && <div className="muted">Loading…</div>}
				{error && <div className="muted">Error: {error}</div>}
				{patients && patients.map((p) => (
					<motion.article key={p._id} className="admin-card" whileHover={{ y: -6 }}>
						<div className="card-media"><img src={p.image || patientImg} alt={p.name || 'patient'}/></div>
						<div className="card-body">
							<h3>{p.name || 'Patient'}</h3>
							<p className="muted">Age: {p.age || '—'} • {p.gender || '—'}</p>
							<p className="card-desc">{p.medicalHistory || 'No medical history.'}</p>
						</div>
						<div className="card-actions">
							<button className="btn-ghost btn-delete" onClick={() => handleDelete(p._id)}>Delete</button>
						</div>
					</motion.article>
				))}
			</section>
		</div>
	);
}
