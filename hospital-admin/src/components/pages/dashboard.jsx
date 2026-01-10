import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "motion/react";

// Images
import bone1 from "../../assets/Bone,joint&Muscle.jpg";
import book2 from "../../assets/book.jpg";
import brain from "../../assets/Brain&MentalHealth.jpg";
import digestive from "../../assets/Digestive&Stomach.jpg";
import doctors1 from "../../assets/doctors1.jpg";
import doctors2 from "../../assets/doctors2.jpg";
import hospital1 from "../../assets/hospital1.jpg";
import hospital2 from "../../assets/hospital2.jpg";
import hospital3 from "../../assets/hospital3.jpg";
import hospitalEmergency from "../../assets/hospitalEmergency.jpg";
import hospitalMain from "../../assets/hospitalMain.jpg";
import primaryDoctor from "../../assets/primaryDoctor.jpg";
import reportImg from "../../assets/report.jpg";
import patient1 from "../../assets/patient1.jpg";

// Slices thunks
import { fetchBooks } from "../slices/slice/bookSlice";
import { fetchDoctors } from "../slices/slice/doctorSlice";
import { fetchPatients } from "../slices/slice/patientSlice";
import { fetchAllReports } from "../slices/slice/reportSlice";

export default function Dashboard() {
	const dispatch = useDispatch();
	const { books } = useSelector((s) => s.books);
	const { doctors } = useSelector((s) => s.doctors);
	const { patients } = useSelector((s) => s.patients);
	const { reports } = useSelector((s) => s.reports);

	useEffect(() => {
		dispatch(fetchBooks());
		dispatch(fetchDoctors());
		dispatch(fetchPatients());
		dispatch(fetchAllReports());
	}, [dispatch]);

	const stats = useMemo(() => [
		{ key: "books", title: "Bookings", count: books?.length || 0, img: book2, desc: "Recent appointments & room bookings" },
		{ key: "doctors", title: "Doctors", count: doctors?.length || 0, img: primaryDoctor, desc: "Active medical staff across departments" },
		{ key: "patients", title: "Patients", count: patients?.length || 0, img: patient1, desc: "Registered patients in the system" },
		{ key: "reports", title: "Reports", count: reports?.length || 0, img: reportImg, desc: "Medical reports created by doctors" },
	], [books, doctors, patients, reports]);

	return (
		<div className="admin-dashboard page">
			<div className="dashboard-hero">
				<motion.div className="hero-content" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
					<h1>Dengel Hospital Admin Dashboard</h1>
					<p className="hero-sub">Fast insights across bookings, clinicians, patients and reports — beautifully visualized.</p>
				</motion.div>
				<motion.img src={hospitalMain} alt="hospital" className="hero-image" initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} />
			</div>

			<div className="stats-grid">
				{stats.map((s) => (
					<motion.div key={s.key} className="stat-card" whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 200 }}>
						<div className="stat-media">
							<img src={s.img} alt={s.title} />
						</div>
						<div className="stat-body">
							<div className="stat-top">
								<h3>{s.title}</h3>
								<div className="stat-count">{s.count}</div>
							</div>
							<p className="stat-desc">{s.desc}</p>
						</div>
					</motion.div>
				))}
			</div>

			<div className="dashboard-gallery">
				<h2>Highlights</h2>
				<div className="gallery-grid">
					{[doctors1, doctors2, hospital1, hospital2, hospital3, bone1, brain, digestive, hospitalEmergency].map((img, i) => (
						<motion.img key={i} src={img} alt={`img-${i}`} whileHover={{ scale: 1.03 }} />
					))}
				</div>
			</div>
		</div>
	);
}
