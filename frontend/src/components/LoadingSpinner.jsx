export default function LoadingSpinner({ size=32, text }) {
  return (
    <div className="sc-loading-center">
      <div className="sc-spinner" style={{ width:size, height:size }} />
      {text && <p style={{ color:"var(--text-muted)", fontSize:14 }}>{text}</p>}
    </div>
  );
}
