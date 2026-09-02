export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, confirmText="Confirm", danger=false }) {
  if (!isOpen) return null;
  return (
    <div className="sc-modal-overlay" onClick={onCancel}>
      <div className="sc-modal" onClick={e=>e.stopPropagation()}>
        <div className="sc-modal-title">{title}</div>
        <div className="sc-modal-body">{message}</div>
        <div className="sc-modal-footer">
          <button className="sc-btn sc-btn-outline" onClick={onCancel}>Cancel</button>
          <button className={`sc-btn ${danger?"sc-btn-danger":"sc-btn-primary"}`} onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>
  );
}
