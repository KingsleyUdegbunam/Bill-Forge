import dayjs from "dayjs";
import { IoIosCalendar } from "react-icons/io";

import "./FormField.css";

/**
 * FormField — a labelled input wrapper that shows validation errors.
 *
 * Props:
 *   label      — visible label text
 *   id         — input id / name
 *   path       — dot-path key used by useInvoiceForm  e.g. "billFrom.city"
 *   type       — input type (default "text")
 *   value      — controlled value
 *   onChange   — (path, value) => void
 *   onBlur     — (path) => void   — marks field as touched
 *   error      — error string (shown if truthy)
 *   readOnly   — disables the input
 *   inputMode  — forwarded to <input>
 *   min / step — forwarded to <input>
 */
export function FormField({
  label,
  id,
  path,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  readOnly = false,
  inputMode,
  min,
  step,
  placeholder,
  style,
  invoiceDate,
}) {
  return (
    <div
      className={`detail-input-container${error ? " detail-input-container--error" : ""}`}
    >
      <div className="field-label-row">
        <label htmlFor={id}>{label}</label>
        {error && <span className="field-error">{error}</span>}
      </div>

      {id === "invoice-date" ? (
        <div
          style={{
            padding: "16px 20px 16px 16px",
            fontWeight: "bold",
            opacity: ".4",
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
          }}
        >
          {dayjs(invoiceDate).format("D MMM YYYY")} <IoIosCalendar />
        </div>
      ) : (
        <input
          style={style}
          type={type}
          id={id}
          name={id}
          value={value ?? ""}
          readOnly={readOnly}
          inputMode={inputMode}
          min={min}
          step={step}
          placeholder={placeholder}
          onChange={(e) => onChange?.(path, e.target.value)}
          onBlur={() => onBlur?.(path)}
        />
      )}
    </div>
  );
}
