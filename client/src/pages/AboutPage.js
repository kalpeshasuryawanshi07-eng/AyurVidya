import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function AboutPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <div style={{ background: "linear-gradient(135deg, #1B4332, #2D6A4F)", padding: "4rem 0", color: "#fff", textAlign: "center" }}>
          <div className="container">
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🌿</div>
            <h1 style={{ color: "#fff", marginBottom: "0.75rem" }}>About AyurLearn</h1>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
              Ancient Wisdom. Modern Learning.
            </p>
          </div>
        </div>
        <div className="container" style={{ padding: "3rem 1.5rem", maxWidth: "800px" }}>
          <h2 style={{ color: "var(--color-primary)", marginBottom: "1rem" }}>Our Mission</h2>
          <p>AyurVidya is built to be the world's most complete, accessible, and student-friendly digital encyclopedia of Ayurveda. Modeled after W3Schools' proven learning interface but elevated with modern design, interactivity, and Ayurvedic identity.</p>
          <p>A student who goes through this platform should never need to open another textbook.</p>

          <h2 style={{ color: "var(--color-primary)", margin: "2rem 0 1rem" }}>What We Offer</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1rem" }}>
            {[
              { icon: "📚", title: "10 Subjects", desc: "Complete BAMS curriculum" },
              { icon: "📖", title: "250+ Topics", desc: "Detailed topic pages" },
              { icon: "🌿", title: "75+ Herbs", desc: "Complete herb encyclopedia" },
              { icon: "🧠", title: "Quizzes", desc: "MCQs after every topic" },
              { icon: "🃏", title: "Flashcards", desc: "Spaced repetition learning" },
              { icon: "🗣️", title: "Bilingual", desc: "English + Marathi" },
            ].map(f => (
              <div key={f.title} className="card" style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{f.icon}</div>
                <div style={{ fontWeight: 700, color: "var(--color-primary)" }}>{f.title}</div>
                <div style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>{f.desc}</div>
              </div>
            ))}
          </div>

          <h2 style={{ color: "var(--color-primary)", margin: "2rem 0 1rem" }}>Technology Stack</h2>
          <p>Built with the MERN stack: MongoDB, Express.js, React.js, and Node.js. Pure CSS with no UI frameworks. JWT authentication. Razorpay payment integration.</p>

          <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <Link to="/subjects" className="btn btn-primary btn-lg">Start Learning 🙏</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
