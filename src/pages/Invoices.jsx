import "./Invoices.css";
import { IoMdAddCircle } from "react-icons/io";
import { formatPenceToPounds } from "../utils/money";
import { invoices } from "../data/data";
import dayjs from "dayjs";

export default function Invoices() {
  return (
    <>
      <section className="invoices-main">
        <div className="invoices-header">
          <div className="left">
            <h2 className="invoices-h2">Invoices</h2>
            <p className="invoices-subtext">{invoices.length} invoices</p>
          </div>
          <div className="invoices-filter">
            <p className="fiter">Filter</p>
          </div>
          <button className="invoices-add-btn">
            <div className="button-icon">
              <IoMdAddCircle className="add-icon" />
            </div>
            <p className="new">New</p>
          </button>
        </div>

        <section className="invoice-cards-container">
          {invoices.map((invoice) => {
            return (
              <article className="invoice-card" key={invoice.id}>
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
                      {dayjs(invoice.dueDate).format("DD MMM YYYY")}
                    </p>
                    <p className="invoice-total">
                      {formatPenceToPounds(invoice.total)}
                    </p>
                  </div>
                  <div className="invoice-status">
                    <p className="status-text">{invoice.status}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </section>
    </>
  );
}
