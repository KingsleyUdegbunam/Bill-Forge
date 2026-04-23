import { useState, useRef, useEffect } from "react";
import { StatusBadge } from "../components/ui/StatusBagde";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { formatPenceToPounds } from "../utils/money";
import { EmptyState } from "../components/EmptyState";
import { displayDate } from "../utils/date";
import { Link } from "react-router-dom";
import "./Invoices.css";

const ALL_STATUSES = ["draft", "pending", "paid", "overdue"];

export default function Invoices({ invoicesData, onNewInvoice }) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  const filterRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const toggleFilter = (status) => {
    setActiveFilters((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status],
    );
  };

  const filtered =
    activeFilters.length === 0
      ? invoicesData
      : invoicesData.filter((inv) => activeFilters.includes(inv.status));

  // Subtext: "There are X pending invoices" or "X invoices"
  const pendingCount = invoicesData.filter(
    (i) => i.status === "pending",
  ).length;
  const subtextCount =
    activeFilters.length > 0 ? filtered.length : invoicesData.length;
  const subtextLabel =
    activeFilters.length === 1 && activeFilters[0] === "pending"
      ? `${pendingCount} pending invoices`
      : `${subtextCount} invoice${subtextCount !== 1 ? "s" : ""}`;

  const handleNewInvoice = (e) => {
    if (window.innerWidth >= 768) {
      e.preventDefault();
      onNewInvoice();
    }
  };

  return (
    <section className="main-wrapper">
      <div className="invoices-header">
        <div className="left">
          <h2 className="invoices-h2">Invoices</h2>
          <p className="invoices-subtext">
            <span className="tablet-span">There are </span>
            {subtextLabel}
          </p>
        </div>

        <div className="invoice-header-right">
          {/* ── Filter dropdown ──────────────────────────── */}
          <div className="invoices-filter" ref={filterRef}>
            <button
              className="filter-btn"
              onClick={() => setFilterOpen((o) => !o)}
              aria-expanded={filterOpen}
            >
              <span className="filter-label">
                <span className="tablet-span">Filter by status</span>
                <span className="mobile-span">Filter</span>
              </span>
              <FaChevronDown
                className={`filter-chevron${filterOpen ? " rotated" : ""}`}
              />
            </button>

            {filterOpen && (
              <ul className="filter-dropdown">
                {ALL_STATUSES.map((status) => (
                  <li
                    key={status}
                    className="filter-option"
                    onClick={() => toggleFilter(status)}
                  >
                    <span
                      className={`filter-checkbox${activeFilters.includes(status) ? " checked" : ""}`}
                      aria-hidden="true"
                    >
                      {activeFilters.includes(status) && (
                        <svg width="10" height="8" viewBox="0 0 10 8">
                          <path
                            d="M1 4l3 3 5-6"
                            stroke="white"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                    <span className="filter-status-label">
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* ── New Invoice button ───────────────────────── */}
          <Link
            to="/invoice/create"
            className="invoices-add-btn"
            onClick={handleNewInvoice}
          >
            <div className="add-icon-wrap">
              <IoMdAddCircle className="add-icon" />
            </div>
            <span className="new-label">
              <span className="tablet-span">New Invoice</span>
              <span className="mobile-span">New</span>
            </span>
          </Link>
        </div>
      </div>

      <section className="invoice-cards-container">
        {filtered.length === 0 ? (
          <EmptyState />
        ) : (
          filtered.map((invoice) => (
            <Link
              to={`/invoice/${invoice.id}`}
              key={invoice.id}
              className="invoice-card-link"
            >
              <article className="invoice-card">
                <div className="invoice-id-and-name">
                  <p className="invoice-id">
                    <span className="hash-sign">#</span>
                    {invoice.id}
                  </p>
                  <p className="invoice-name">{invoice.clientName}</p>
                </div>
                <div className="due-date-cost-status">
                  <div className="invoice-due-date-cost">
                    <p className="due-date">
                      Due {displayDate(invoice.dueDate)}
                    </p>
                    <p className="invoice-total">
                      {formatPenceToPounds(invoice.total)}
                    </p>
                  </div>
                  <div className="invoice-status">
                    <StatusBadge status={invoice.status} />
                  </div>
                </div>
                <FaChevronRight className="invoice-card-chevron" />
              </article>
            </Link>
          ))
        )}
      </section>
    </section>
  );
}
