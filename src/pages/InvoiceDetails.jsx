import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { StatusBadge } from "../components/ui/StatusBagde";
import { displayDate } from "../utils/date";
import "./InvoiceDetails.css";
import { formatPenceToPounds } from "../utils/money";
import { Button } from "../components/ui/Buttons";
import { GoBackBtn } from "../components/navigation/GoBackButton";
import { EmptyState } from "../components/EmptyState";
import InvoiceEdit from "./InvoiceEdit";

/* ── Scroll lock ─────────────────────────────────────────── */
function useScrollLock(active) {
  useEffect(() => {
    if (active) {
      document.body.classList.add("scroll-locked");
    } else {
      document.body.classList.remove("scroll-locked");
    }
    return () => document.body.classList.remove("scroll-locked");
  }, [active]);
}

export function InvoiceDetails({ invoicesData, setInvoicesData }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const invoice = invoicesData.find((inv) => inv.id === id);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditOverlay, setShowEditOverlay] = useState(false);

  // Lock scroll when either overlay is open
  useScrollLock(showDeleteModal || showEditOverlay);

  // Close edit overlay on ESC
  useEffect(() => {
    if (!showEditOverlay) return;
    const onKey = (e) => {
      if (e.key === "Escape") setShowEditOverlay(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [showEditOverlay]);

  // Trap focus + ESC for delete modal
  const deleteModalRef = useRef(null);
  useEffect(() => {
    if (!showDeleteModal) return;
    const firstFocusable = deleteModalRef.current?.querySelector(
      "button, [href], input, [tabindex]:not([tabindex='-1'])",
    );
    firstFocusable?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") setShowDeleteModal(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [showDeleteModal]);

  if (!invoice) return <EmptyState />;

  const markAsCompleted = () => {
    setInvoicesData((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, status: "paid" } : inv)),
    );
  };

  const handleDelete = () => {
    setInvoicesData((prev) => prev.filter((inv) => inv.id !== id));
    navigate("/");
  };

  // On tablet/desktop: open overlay. On mobile: navigate to edit route.
  const handleEditClick = (e) => {
    if (window.innerWidth >= 768) {
      e.preventDefault();
      setShowEditOverlay(true);
    }
  };

  return (
    <>
      <section className="main-wrapper invoice-details-wrapper">
        <nav>
          <GoBackBtn />
        </nav>

        {/* ── Status bar ───────────────────────────────────── */}
        <article className="status-display-card">
          <div className="status-display-left">
            <p className="status-text">Status</p>
            <StatusBadge status={invoice.status} />
          </div>
          <div className="invoice-details-action-elems">
            <Button
              as={Link}
              to={`/invoice/${id}/edit`}
              onClick={handleEditClick}
              variant="secondary"
            >
              Edit
            </Button>
            <Button onClick={() => setShowDeleteModal(true)} variant="delete">
              Delete
            </Button>
            <Button onClick={markAsCompleted} variant="primary">
              Mark as Paid
            </Button>
          </div>
        </article>

        {/* ── Invoice body ─────────────────────────────────── */}
        <article className="invoice-details-display">
          <div className="invoice-id-desc">
            <p className="invoice-id">
              <span className="hash-sign">#</span>
              {invoice.id}
            </p>
            <p className="project-desc">{invoice.projectDescription}</p>
          </div>

          <div className="address-details bill-from">
            <p>{invoice.billFrom?.streetAddress}</p>
            <p>{invoice.billFrom?.city}</p>
            <p>{invoice.billFrom?.postCode}</p>
            <p>{invoice.billFrom?.country}</p>
          </div>

          <div className="invoice-detail-body-container">
            <div className="invoice-date-address">
              <div className="left-details">
                <div className="left-elem-container">
                  <p className="invoice-details-header">Invoice Date</p>
                  <p className="invoice-details-content">
                    {displayDate(invoice.invoiceDate)}
                  </p>
                </div>
                <div className="left-elem-container">
                  <p className="invoice-details-header">Payment Due</p>
                  <p className="invoice-details-content">
                    {displayDate(invoice.dueDate)}
                  </p>
                </div>
              </div>

              <div className="right-details bill-to">
                <p className="invoice-details-header">Bill To</p>
                <p className="invoice-details-content">{invoice.clientName}</p>
                <div className="address-details">
                  <p>{invoice.streetAddress}</p>
                  <p>{invoice.city}</p>
                  <p>{invoice.postCode}</p>
                  <p>{invoice.country}</p>
                </div>
              </div>
            </div>

            <div className="invoice-details-mail">
              <p className="invoice-details-header">Sent to</p>
              <p className="invoice-details-content">{invoice.clientEmail}</p>
            </div>
          </div>

          {/* ── Items table ──────────────────────────────── */}
          <div className="invoice-detail-price-container">
            <div className="invoice-details-grid-container">
              <div className="tablet price-summmary-tablet">
                <p>Item Name</p>
                <p>QTY.</p>
                <p>Price</p>
                <p>Total</p>
              </div>
              {invoice.items.map((item, index) => (
                <article key={index} className="invoice-item-cost">
                  <div className="item-left-elem">
                    <p className="item-name">{item.name}</p>
                    <div className="item-quantity-price">
                      <span className="item-quantity">{item.qty}</span>
                      <span className="mobile"> x </span>
                      <span className="item-price">
                        {formatPenceToPounds(item.price)}
                      </span>
                    </div>
                  </div>
                  <div className="item-right-elem">
                    {formatPenceToPounds(item.total)}
                  </div>
                </article>
              ))}
            </div>
            <div className="invoice-grand-total">
              <p className="grand-total-txt">
                <span className="mobile">Grand Total</span>
                <span className="tablet">Amount Due</span>
              </p>
              <p className="grand-total-figure">
                {formatPenceToPounds(invoice.total)}
              </p>
            </div>
          </div>
        </article>

        {/* ── Mobile footer ────────────────────────────────── */}
        <div id="details-footer" className="footer">
          <div className="action-btns">
            <Button as={Link} to={`/invoice/${id}/edit`} variant="secondary">
              Edit
            </Button>
            <Button onClick={() => setShowDeleteModal(true)} variant="delete">
              Delete
            </Button>
            <Button onClick={markAsCompleted} variant="primary">
              Mark as Paid
            </Button>
          </div>
        </div>
      </section>

      {/* ── Delete modal ─────────────────────────────────────── */}
      {showDeleteModal && (
        <div
          className="delete-alert"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-modal-title"
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            className="delete-modal"
            ref={deleteModalRef}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="confirm-delete-h2" id="delete-modal-title">
              Confirm Deletion
            </h2>
            <p className="warning-text">
              Are you sure you want to delete invoice #{invoice.id}? This action
              cannot be undone.
            </p>
            <div className="action-buttons">
              <Button
                onClick={() => setShowDeleteModal(false)}
                variant="secondary"
              >
                Cancel
              </Button>
              <Button onClick={handleDelete} variant="delete">
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ── Edit overlay (tablet/desktop only) ───────────────── */}
      {/*
        Only mounted when showEditOverlay is true — this means
        InvoiceEdit initialises its form fresh from the invoice data
        every time the overlay opens, not on page load.
      */}
      {showEditOverlay && (
        <div
          className="edit-overlay-backdrop is-open"
          onClick={() => setShowEditOverlay(false)}
        >
          <div
            className="edit-overlay-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <InvoiceEdit
              invoicesData={invoicesData}
              setInvoicesData={setInvoicesData}
              onClose={() => setShowEditOverlay(false)}
              isOverlay={true}
              invoiceId={id}
            />
          </div>
        </div>
      )}
    </>
  );
}
