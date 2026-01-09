import React from "react";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="page footer-grid">
        <div className="footer-col">
          <h3>Hospital Admin System</h3>
          <p className="muted">Manage books, doctors, patients and reports efficiently with role-based access and clear audit trails.</p>
          <p className="muted" style={{ marginTop: 8 }}>Version 1.0 • Built for internal administration</p>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <p className="muted">Email: <a href="mailto:admin@hospital.com">admin@hospital.com</a></p>
          <p className="muted">Phone: <a href="tel:+251567890">+ (251) 567-890</a></p>
          <p className="muted">Address: 123 Health St,40 meter, Care City</p>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><a href="/">Dashboard</a></li>
            <li><a href="/doctors">Doctors</a></li>
            <li><a href="/patients">Patients</a></li>
            <li><a href="/reports">Reports</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="page">
          <small className="muted">© {new Date().getFullYear()} Hospital Admin. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
}
