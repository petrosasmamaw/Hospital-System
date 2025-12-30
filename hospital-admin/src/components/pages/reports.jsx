import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "motion/react";
import reportImg from "../../assets/report.jpg";
import { fetchAllReports, deleteReport } from "../slices/slice/reportSlice";

export default function Reports() {
	const dispatch = useDispatch();
	const { reports, loading, error } = useSelector((s) => s.reports || {});

	useEffect(() => {
		dispatch(fetchAllReports());
	}, [dispatch]);

	const handleDelete = async (id) => {
		try {
			await dispatch(deleteReport(id)).unwrap();
			dispatch(fetchAllReports());
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<div className="admin-collection page">
			<header className="collection-header">
				<img src={reportImg} alt="reports" />
				<div>
					<h1>Reports</h1>
					<p className="collection-sub">All medical reports created in the system.</p>
				</div>
			</header>

			<section className="collection-grid">
				{loading && <div className="muted">Loading…</div>}
				{error && <div className="muted">Error: {error}</div>}
				{reports && reports.map((r) => (
					<motion.article key={r._id} className="admin-card" whileHover={{ scale: 1.02 }}>
						<div className="card-media"><img src={reportImg} alt="report"/></div>
						<div className="card-body">
							<h3>{r.title || `Report ${new Date(r.createdAt).toLocaleDateString()}`}</h3>
							<p className="muted">Patient: {r.patientId} • Doctor: {r.doctorId}</p>
							<p className="card-desc">{r.report || 'No report content.'}</p>
						</div>
						<div className="card-actions">
							<button className="btn-ghost btn-delete" onClick={() => handleDelete(r._id)}>Delete</button>
						</div>
					</motion.article>
				))}
			</section>
		</div>
	);
}
