export default function ShlokaBlock({ shloka }) {
  if (!shloka?.devanagari) return null;
  return (
    <div className="shloka-block">
      <div className="shloka-source">📜 Classical Reference — {shloka.source}</div>
      <div className="shloka-devanagari">{shloka.devanagari}</div>
      {shloka.transliteration && (
        <div className="shloka-transliteration">{shloka.transliteration}</div>
      )}
      {shloka.translation && (
        <div className="shloka-translation">
          <strong>Translation:</strong> {shloka.translation}
        </div>
      )}
    </div>
  );
}
