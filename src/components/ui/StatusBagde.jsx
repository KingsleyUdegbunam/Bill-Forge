import "./StatusBadge.css";
export function StatusBadge({ status }) {
  return <span className={`status status--${status}`}>{status}</span>;
}
