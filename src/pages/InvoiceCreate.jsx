import { useState } from "react";
import { GoBackBtn } from "../components/navigation/GoBackButton";
import { Button } from "../components/ui/Buttons";
import "./InvoiceEdit.css";
import { MdDelete } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PAYMENT_TERMS = ["Net 1 Day", "Net 7 Days", "Net 14 Days", "Net 30 Days"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function todayStr() {
  return new Date().toISOString().split("T")[0];
}

function Field({ label, fieldKey, type = "text", fields, errors, setField }) {
  return (
    <div className="detail-input-container">
      <div className="label-row">
        <label
          htmlFor={fieldKey}
          className={errors[fieldKey] ? "label-error" : ""}
        >
          {label}
        </label>
        {errors[fieldKey] && (
          <span className="field-error-msg">{errors[fieldKey]}</span>
        )}
      </div>
      <input
        id={fieldKey}
        type={type}
        value={fields[fieldKey]}
        onChange={(e) => setField(fieldKey, e.target.value)}
        className={errors[fieldKey] ? "input-error" : ""}
      />
    </div>
  );
}

export default function InvoiceCreate({
  invoicesData,
  setInvoicesData,
  onClose,
  isOverlay = false,
}) {
  const navigate = useNavigate();

  const [fields, setFields] = useState({
    billFromStreet: "",
    billFromCity: "",
    billFromPostCode: "",
    billFromCountry: "",
    clientName: "",
    clientEmail: "",
    clientStreet: "",
    clientCity: "",
    clientPostCode: "",
    clientCountry: "",
    projectDescription: "",
    invoiceDate: todayStr(),
    paymentTerms: "Net 30 Days",
  });

  const [items, setItems] = useState([
    { name: "", qty: 1, price: 0, total: 0 },
  ]);
  const [errors, setErrors] = useState({});
  const [termsOpen, setTermsOpen] = useState(false);

  const setField = (key, value) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const updateItem = (index, key, rawValue) => {
    setItems((prev) =>
      prev.map((item, i) => {
        if (i !== index) return item;
        const value = key === "name" ? rawValue : Number(rawValue) || 0;
        const next = { ...item, [key]: value };
        if (key === "qty" || key === "price")
          next.total = next.qty * next.price;
        return next;
      }),
    );
    if (errors[`item-${index}-${key}`])
      setErrors((prev) => ({ ...prev, [`item-${index}-${key}`]: undefined }));
  };

  const addItem = () =>
    setItems((prev) => [...prev, { name: "", qty: 1, price: 0, total: 0 }]);

  const removeItem = (index) =>
    setItems((prev) => prev.filter((_, i) => i !== index));

  const validate = () => {
    const newErrors = {};

    const requiredText = [
      "billFromStreet",
      "billFromCity",
      "billFromPostCode",
      "billFromCountry",
      "clientName",
      "clientStreet",
      "clientCity",
      "clientPostCode",
      "clientCountry",
      "projectDescription",
    ];
    requiredText.forEach((key) => {
      if (!fields[key].trim()) newErrors[key] = "can't be empty";
    });

    // Email — separate so we can show a specific message
    if (!fields.clientEmail.trim()) {
      newErrors.clientEmail = "can't be empty";
    } else if (!EMAIL_RE.test(fields.clientEmail.trim())) {
      newErrors.clientEmail = "must be a valid email";
    }

    if (items.length === 0) newErrors.noItems = true;
    items.forEach((item, i) => {
      if (!item.name.trim()) newErrors[`item-${i}-name`] = "can't be empty";
      if (!item.qty || item.qty < 1) newErrors[`item-${i}-qty`] = "min 1";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateId = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return (
      letters[Math.floor(Math.random() * 26)] +
      letters[Math.floor(Math.random() * 26)] +
      String(Math.floor(1000 + Math.random() * 9000))
    );
  };

  const handleSave = (status = "pending") => {
    if (status !== "draft" && !validate()) return;
    const grandTotal = items.reduce((sum, item) => sum + item.total, 0);
    const newInvoice = {
      id: generateId(),
      invoiceDate: fields.invoiceDate,
      dueDate: fields.invoiceDate,
      paymentTerms: fields.paymentTerms,
      projectDescription: fields.projectDescription,
      status,
      clientName: fields.clientName,
      clientEmail: fields.clientEmail,
      streetAddress: fields.clientStreet,
      city: fields.clientCity,
      postCode: fields.clientPostCode,
      country: fields.clientCountry,
      billFrom: {
        streetAddress: fields.billFromStreet,
        city: fields.billFromCity,
        postCode: fields.billFromPostCode,
        country: fields.billFromCountry,
      },
      items,
      total: grandTotal,
    };
    setInvoicesData((prev) => [...prev, newInvoice]);
    if (onClose) onClose();
    else navigate("/");
  };

  const handleDiscard = () => {
    if (onClose) onClose();
    else navigate("/");
  };

  const fieldErrors = Object.keys(errors).filter((k) => k !== "noItems");
  const showGenericError = fieldErrors.some((k) => errors[k]);
  const showNoItemsError = errors.noItems;

  const fp = { fields, errors, setField };

  return (
    <div className={`form-container${isOverlay ? " in-overlay" : ""}`}>
      <section className={`main-wrapper${isOverlay ? " is-overlay" : ""}`}>
        <GoBackBtn />
        <p className="header-main">New Invoice</p>

        <article className="owner-details">
          <p className="edit-header">Bill From</p>
          <div className="business-input-fields">
            <Field label="Street Address" fieldKey="billFromStreet" {...fp} />
            <div className="flexible-row">
              <div className="city-and-post-code">
                <Field label="City" fieldKey="billFromCity" {...fp} />
                <Field label="Post Code" fieldKey="billFromPostCode" {...fp} />
              </div>
              <Field label="Country" fieldKey="billFromCountry" {...fp} />
            </div>
          </div>
        </article>

        <article className="client-details">
          <p className="edit-header">Bill To</p>
          <div className="business-input-fields">
            <Field label="Client's Name" fieldKey="clientName" {...fp} />
            <Field
              label="Client's Email"
              fieldKey="clientEmail"
              type="email"
              {...fp}
            />
            <Field label="Street Address" fieldKey="clientStreet" {...fp} />
            <div className="flexible-row">
              <div className="city-and-post-code">
                <Field label="City" fieldKey="clientCity" {...fp} />
                <Field label="Post Code" fieldKey="clientPostCode" {...fp} />
              </div>
              <Field label="Country" fieldKey="clientCountry" {...fp} />
            </div>
          </div>
        </article>

        <article className="invoice-payment-info">
          <div className="flexible-row invoice-issuance-pay-flex">
            <div className="detail-input-container">
              <label htmlFor="invoice-date">Invoice Date</label>
              <input
                id="invoice-date"
                type="date"
                value={fields.invoiceDate}
                onChange={(e) => setField("invoiceDate", e.target.value)}
              />
            </div>

            <div className="detail-input-container">
              <label>Payment Terms</label>
              <div
                className={`custom-select${termsOpen ? " open" : ""}`}
                onClick={() => setTermsOpen((o) => !o)}
              >
                <div className="custom-select-value">
                  <span>{fields.paymentTerms}</span>
                  <FaChevronDown
                    className={`select-chevron${termsOpen ? " rotated" : ""}`}
                  />
                </div>
                {termsOpen && (
                  <ul className="custom-select-dropdown">
                    {PAYMENT_TERMS.map((term) => (
                      <li
                        key={term}
                        className={`custom-select-option${fields.paymentTerms === term ? " selected" : ""}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setField("paymentTerms", term);
                          setTermsOpen(false);
                        }}
                      >
                        {term}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <Field
            label="Project Description"
            fieldKey="projectDescription"
            {...fp}
          />
        </article>

        <article className="edit-item-list-container">
          <p className="item-list-header">Item List</p>
          <div className="item-cards-container">
            {items.map((item, index) => (
              <article key={index} className="invoice-item-card">
                <div className="item-card-input-fields">
                  <div className="detail-input-container">
                    <div className="label-row">
                      <label
                        className={
                          errors[`item-${index}-name`] ? "label-error" : ""
                        }
                      >
                        Item Name
                      </label>
                      {errors[`item-${index}-name`] && (
                        <span className="field-error-msg">
                          {errors[`item-${index}-name`]}
                        </span>
                      )}
                    </div>
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) =>
                        updateItem(index, "name", e.target.value)
                      }
                      className={
                        errors[`item-${index}-name`] ? "input-error" : ""
                      }
                    />
                  </div>

                  <div className="item-flex">
                    <div className="item-set-container">
                      <div className="detail-input-container">
                        <label
                          className={
                            errors[`item-${index}-qty`] ? "label-error" : ""
                          }
                        >
                          Qty.
                        </label>
                        <input
                          type="number"
                          min="1"
                          step="1"
                          inputMode="numeric"
                          value={item.qty}
                          onChange={(e) =>
                            updateItem(index, "qty", e.target.value)
                          }
                          className={
                            errors[`item-${index}-qty`] ? "input-error" : ""
                          }
                        />
                      </div>
                      <div className="detail-input-container">
                        <label>Price</label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          inputMode="decimal"
                          value={item.price}
                          onChange={(e) =>
                            updateItem(index, "price", e.target.value)
                          }
                        />
                      </div>
                      <div className="detail-input-container">
                        <label>Total</label>
                        <input
                          type="number"
                          value={item.total}
                          readOnly
                          className="input-readonly"
                        />
                      </div>
                    </div>
                    <MdDelete
                      className="delete-item-icon"
                      onClick={() => removeItem(index)}
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>

          <Button id="add-new-item-btn" variant="secondary" onClick={addItem}>
            <span className="add-btn-icon">＋</span>
            <span>Add New Item</span>
          </Button>
        </article>

        {(showGenericError || showNoItemsError) && (
          <div className="form-error-summary">
            {showGenericError && (
              <p>- All fields must be filled in correctly</p>
            )}
            {showNoItemsError && <p>- An item must be added</p>}
          </div>
        )}
      </section>

      <div className="edit-footer footer">
        <div className="edit-action-buttons">
          <Button variant="secondary" onClick={handleDiscard}>
            Discard
          </Button>
          <Button variant="draft" onClick={() => handleSave("draft")}>
            Save as Draft
          </Button>
          <Button variant="primary" onClick={() => handleSave("pending")}>
            Save &amp; Send
          </Button>
        </div>
      </div>
    </div>
  );
}
