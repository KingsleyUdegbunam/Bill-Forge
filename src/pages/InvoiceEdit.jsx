import { GoBackBtn } from "../components/navigation/GoBackButton";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { GrFormAdd } from "react-icons/gr";
import { Button } from "../components/ui/Buttons";
import { FormField } from "../components/ui/FormField";
import { useInvoiceForm, seedFromInvoice } from "../hooks/useInvoiceForm";
import { MdDelete } from "react-icons/md";
import "./InvoiceEdit.css";

export default function InvoiceEdit({
  invoicesData,
  setInvoicesData,
  onClose,
  isOverlay = false,
  invoiceId, // passed explicitly when used as overlay
}) {
  // When rendered as an overlay, invoiceId comes from the parent.
  // When rendered as a standalone route (/invoice/:id/edit), get it from params.
  const params = useParams();
  const id = invoiceId ?? params.id;
  const navigate = useNavigate();

  const invoice = invoicesData.find((inv) => inv.id === id);

  const PAYMENT_TERMS = [
    "Net 1 Day",
    "Net 7 Days",
    "Net 14 Days",
    "Net 30 Days",
  ];

  const [termsOpen, setTermsOpen] = useState(false);

  const {
    form,
    setField,
    touchField,
    addItem,
    removeItem,
    validateForm,
    fieldError,
  } = useInvoiceForm(seedFromInvoice(invoice));

  if (!invoice) return <p style={{ padding: "2rem" }}>Invoice not found.</p>;

  const handleCancel = () => {
    if (onClose) {
      onClose(); // overlay — close the panel
    } else {
      navigate(`/invoice/${id}`); // standalone route — go back to details
    }
  };

  const handleSave = () => {
    if (!validateForm()) return;

    setInvoicesData((prev) =>
      prev.map((inv) =>
        inv.id === id
          ? {
              ...inv,
              clientName: form.clientName,
              clientEmail: form.clientEmail,
              billFrom: { ...form.billFrom },
              streetAddress: form.billTo.streetAddress,
              city: form.billTo.city,
              postCode: form.billTo.postCode,
              country: form.billTo.country,
              invoiceDate: form.invoiceDate,
              paymentTerms: form.paymentTerms,
              projectDescription: form.projectDescription,
              items: form.items.map((i) => ({
                ...i,
                qty: Number(i.qty),
                price: Number(i.price),
                total: Number(i.total),
              })),
              total: form.items.reduce((sum, i) => sum + Number(i.total), 0),
            }
          : inv,
      ),
    );

    if (onClose) {
      onClose();
    } else {
      navigate(`/invoice/${id}`);
    }
  };

  return (
    <div className="form-container">
      <section
        className={`main-wrapper edit-page ${isOverlay ? "is-overlay" : ""}`}
      >
        <GoBackBtn />
        <p className="header-main">
          Edit <span className="hash-sign">#</span>
          {invoice.id}
        </p>

        {/* ── Bill From ──────────────────────────────────────── */}
        <article className="owner-details">
          <p className="edit-header">Bill From</p>
          <div className="business-input-fields">
            <FormField
              label="Street Address"
              id="bf-street"
              path="billFrom.streetAddress"
              value={form.billFrom.streetAddress}
              onChange={setField}
              onBlur={touchField}
              error={fieldError("billFrom.streetAddress")}
            />
            <div className="flexible-row">
              <div className="city-and-post-code">
                <FormField
                  label="City"
                  id="bf-city"
                  path="billFrom.city"
                  value={form.billFrom.city}
                  onChange={setField}
                  onBlur={touchField}
                  error={fieldError("billFrom.city")}
                />
                <FormField
                  label="Post Code"
                  id="bf-postcode"
                  path="billFrom.postCode"
                  value={form.billFrom.postCode}
                  onChange={setField}
                  onBlur={touchField}
                  error={fieldError("billFrom.postCode")}
                />
              </div>
              <FormField
                label="Country"
                id="bf-country"
                path="billFrom.country"
                value={form.billFrom.country}
                onChange={setField}
                onBlur={touchField}
                error={fieldError("billFrom.country")}
              />
            </div>
          </div>
        </article>

        {/* ── Bill To ────────────────────────────────────────── */}
        <article className="client-details">
          <p className="edit-header">Bill To</p>
          <div className="business-input-fields">
            <FormField
              label="Client's Name"
              id="client-name"
              path="clientName"
              value={form.clientName}
              onChange={setField}
              onBlur={touchField}
              error={fieldError("clientName")}
            />
            <FormField
              label="Client's Email"
              id="client-email"
              path="clientEmail"
              type="email"
              value={form.clientEmail}
              onChange={setField}
              onBlur={touchField}
              error={fieldError("clientEmail")}
            />
            <FormField
              label="Street Address"
              id="bt-street"
              path="billTo.streetAddress"
              value={form.billTo.streetAddress}
              onChange={setField}
              onBlur={touchField}
              error={fieldError("billTo.streetAddress")}
            />
            <div className="flexible-row">
              <div className="city-and-post-code">
                <FormField
                  label="City"
                  id="bt-city"
                  path="billTo.city"
                  value={form.billTo.city}
                  onChange={setField}
                  onBlur={touchField}
                  error={fieldError("billTo.city")}
                />
                <FormField
                  label="Post Code"
                  id="bt-postcode"
                  path="billTo.postCode"
                  value={form.billTo.postCode}
                  onChange={setField}
                  onBlur={touchField}
                  error={fieldError("billTo.postCode")}
                />
              </div>
              <FormField
                label="Country"
                id="bt-country"
                path="billTo.country"
                value={form.billTo.country}
                onChange={setField}
                onBlur={touchField}
                error={fieldError("billTo.country")}
              />
            </div>
          </div>
        </article>

        {/* ── Invoice Info ───────────────────────────────────── */}
        <article className="invoice-payment-info">
          <div className="flexible-row invoice-issuance-pay-flex">
            <FormField
              invoiceDate={invoice.invoiceDate}
              label="Invoice Date"
              id="invoice-date"
              path="invoiceDate"
              type="date"
              value={form.invoiceDate}
              onChange={setField}
              onBlur={touchField}
              error={fieldError("invoiceDate")}
              readOnly
            />
            <FormField
              label="Payment Terms"
              id="payment-terms"
              path="paymentTerms"
              value={form.paymentTerms}
              onChange={setField}
              onBlur={touchField}
              error={fieldError("paymentTerms")}

              // PAYMENT TERM
            />
            <div className="detail-input-container">
              <label>Payment Terms</label>
              <div
                className={`custom-select${termsOpen ? " open" : ""}`}
                onClick={() => setTermsOpen((o) => !o)}
              >
                <div className="custom-select-value">
                  <span>{invoice.paymentTerms}</span>
                  <FaChevronDown
                    className={`select-chevron${termsOpen ? " rotated" : ""}`}
                  />
                </div>
                {termsOpen && (
                  <ul className="custom-select-dropdown">
                    {PAYMENT_TERMS.map((term) => (
                      <li
                        key={term}
                        className={`custom-select-option${(invoice.paymentTerms === term) === term ? " selected" : ""}`}
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
          <FormField
            label="Project Description"
            id="project-description"
            path="projectDescription"
            value={form.projectDescription}
            onChange={setField}
            onBlur={touchField}
            error={fieldError("projectDescription")}
          />
        </article>

        {/* ── Item List ──────────────────────────────────────── */}
        <article className="edit-item-list-container">
          <p className="item-list-header">Item List</p>
          <div className="item-cards-container">
            {form.items.map((item, index) => (
              <article key={index} className="invoice-item-card">
                <div className="item-card-input-fields">
                  <FormField
                    label="Item Name"
                    id={`item-name-${index}`}
                    path={`items.${index}.name`}
                    value={item.name}
                    onChange={setField}
                    onBlur={touchField}
                    error={fieldError(`items[${index}].name`)}
                  />
                  <div className="item-flex">
                    <div className="item-set-container">
                      <FormField
                        label="Qty."
                        id={`item-qty-${index}`}
                        path={`items.${index}.qty`}
                        type="number"
                        inputMode="numeric"
                        min="1"
                        step="1"
                        value={item.qty}
                        onChange={setField}
                        onBlur={touchField}
                        error={fieldError(`items[${index}].qty`)}
                      />
                      <FormField
                        label="Price"
                        id={`item-price-${index}`}
                        path={`items.${index}.price`}
                        type="number"
                        inputMode="numeric"
                        min="0"
                        step="0.01"
                        value={item.price}
                        onChange={setField}
                        onBlur={touchField}
                        error={fieldError(`items[${index}].price`)}
                      />
                      <FormField
                        style={{ border: "transparent" }}
                        label="Total"
                        id={`item-total-${index}`}
                        path={`items.${index}.total`}
                        type="number"
                        value={item.total}
                        readOnly
                      />
                    </div>
                    <MdDelete
                      className="delete-icon"
                      onClick={() => removeItem(index)}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>

          <Button id="add-new-item-btn" variant="secondary" onClick={addItem}>
            <GrFormAdd className="add-btn-icon" />
            <p>Add New Item</p>
          </Button>
        </article>
      </section>

      <div className="edit-footer footer">
        <div className="edit-action-buttons">
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}
