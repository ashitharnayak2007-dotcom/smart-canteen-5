export default function Badge({ status, variant, children }) {
  const LABELS = { PLACED:"● Placed", COOKING:"🔥 Cooking", READY:"✓ Ready", PICKED_UP:"✓ Picked Up" };
  const cls = status ? `sc-badge sc-badge-${status.toLowerCase()}` : `sc-badge sc-badge-${variant||"neutral"}`;
  return <span className={cls}>{status ? (LABELS[status]||status) : children}</span>;
}
