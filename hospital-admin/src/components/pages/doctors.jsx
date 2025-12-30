import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "motion/react";
import doc1 from "../../assets/doctors1.jpg";
import { fetchDoctors, deleteDoctor, updateDoctorStatus } from "../slices/slice/doctorSlice";

export default function Doctors() {
	const dispatch = useDispatch();
	const { doctors, loading, error } = useSelector((s) => s.doctors || {});

	useEffect(() => {
		dispatch(fetchDoctors());
	}, [dispatch]);

	const handleDelete = async (id) => {
		try {
			await dispatch(deleteDoctor(id)).unwrap();
			dispatch(fetchDoctors());
		} catch (e) {
			console.error(e);
		}
	};

	const handleToggle = async (id, currentStatus) => {
		try {
			const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
			await dispatch(updateDoctorStatus({ id, status: newStatus })).unwrap();
			dispatch(fetchDoctors());
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<div className="admin-collection page doctors-collection">
			<header className="collection-header">
				<img src={doc1} alt="doctors" />
				<div>
					<h1>Doctors</h1>
					<p className="collection-sub">Clinicians and specialists registered in the system.</p>
				</div>
			</header>

			<section className="collection-grid">
				{loading && <div className="muted">Loading…</div>}
				{error && <div className="muted">Error: {error}</div>}
				{doctors && doctors.map((d) => (
					<motion.article key={d._id} className="admin-card" whileHover={{ scale: 1.02 }}>
						<div className="card-media"><img src={d.image || doc1} alt={d.name || 'doctor'}/></div>
						<div className="card-body">
							<h3>{d.name || 'Doctor'}</h3>
							<p className="muted">{d.title || d.category || ''}</p>
							<p className="card-desc">{d.description || 'No bio provided.'}</p>
						</div>
						<div className="card-actions">
							<button className="btn-ghost btn-delete" onClick={() => handleDelete(d._id)}>Delete</button>
							<button className="btn-toggle" onClick={() => handleToggle(d._id, d.status)}>{d.status === 'active' ? 'Set Inactive' : 'Set Active'}</button>
						</div>
					</motion.article>
				))}
			</section>
		</div>
	);
}
