import { StatusBadge } from "../components/ui/StatusBagde";
import "./Invoices.css";
import { IoMdAddCircle } from "react-icons/io";
import { FaChevronRight } from "react-icons/fa";
import { formatPenceToPounds } from "../utils/money";
import { displayDate } from "../utils/date";
import { invoices } from "../data/data";
import { Link } from "react-router-dom";

export default function Invoices({ invoicesData }) {
  return (
    <>
      <section className="main-wrapper">
        <div className="invoices-header">
          <div className="left">
            <h2 className="invoices-h2">Invoices</h2>
            <p className="invoices-subtext">{invoicesData.length} invoices</p>
          </div>
          <div className="invoice-header-right">
            <div className="invoices-filter">
              <p className="fiter">Filter</p>
            </div>
            <Link to={"/invoice/create"} className="invoices-add-btn">
              <div className="button-icon">
                <IoMdAddCircle className="add-icon" />
              </div>
              <p className="new">New</p>
            </Link>
          </div>
        </div>

        <section className="invoice-cards-container">
          {invoices.map((invoice) => {
            return (
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
                        <span className="invoice-due-txt">Due</span>{" "}
                        {displayDate(invoice.dueDate)}
                      </p>
                      <p className="invoice-total">
                        {formatPenceToPounds(invoice.total)}
                      </p>
                    </div>
                    <div className="invoice-status">
                      {<StatusBadge status={invoice.status} />}
                    </div>
                  </div>
                  <FaChevronRight className="invoice-card-chevron" />
                </article>
              </Link>
            );
          })}
        </section>
      </section>
    </>
  );
}
