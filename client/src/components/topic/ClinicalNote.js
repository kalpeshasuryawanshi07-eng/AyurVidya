export default function ClinicalNote({ title = "Clinical Note", children }) {
  return (
    <div className="clinical-note">
      <div className="clinical-note-title">🏥 {title}</div>
      <div>{children}</div>
    </div>
  );
}
