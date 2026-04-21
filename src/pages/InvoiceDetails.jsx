import { useParams, Link } from "react-router-dom";
import { StatusBadge } from "../components/ui/StatusBagde";
import { displayDate } from "../utils/date";
import "./InvoiceDetails.css";
import { formatPenceToPounds } from "../utils/money";
import { Button } from "../components/ui/Buttons";
import { GoBackBtn } from "../components/navigation/GoBackButton";

export function InvoiceDetails({ invoicesData, setInvoicesData }) {
  const { id } = useParams();
  const invoice = invoicesData.find((invoice) => invoice.id === id);

  console.log("Found", invoice);

  const markAsCompleted = () => {
    setInvoicesData((prev) =>
      prev.map((invoice) =>
        invoice.id === id ? { ...invoice, status: "paid" } : invoice,
      ),
    );
  };

  return (
    <>
      <section className="main-wrapper invoice-details-wrapper">
        <nav>{<GoBackBtn />}</nav>
        <article className="status-display-card">
          <p className="status-text">Status</p>
          {<StatusBadge status={invoice.status} />}
        </article>

        <article className="invoice-details-display">
          <div className="invoice-id-desc">
            <p className="invoice-id">
              <span className="hash-sign">#</span>
              {invoice.id}
            </p>
            <p className="project-desc">{invoice.projectDescription}</p>
          </div>

          <div className="address-details bill-from">
            <p>{invoice.billFrom.streetAddress}</p>
            <p>{invoice.billFrom.city}</p>
            <p>{invoice.billFrom.postCode}</p>
            <p>{invoice.billFrom.country}</p>
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
              <div className="right-details">
                <div className="right-elem-container">
                  <p className="invoice-details-header">Bill To</p>
                  <p className="invoice-details-content">
                    {invoice.clientName}
                  </p>
                  <div className="address-details">
                    <p>{invoice.streetAddress}</p>
                    <p>{invoice.city}</p>
                    <p>{invoice.postCode}</p>
                    <p>{invoice.country}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="invoice-details-mail">
              <p className="invoice-details-header">Sent to</p>
              <p className="invoice-details-content">{invoice.clientEmail}</p>
            </div>
          </div>
          <div className="invoice-detail-price-container">
            {invoice.items.map((item, index) => {
              return (
                <article key={index} className="invoice-item-cost">
                  <div className="item-left-elem">
                    <p className="item-name">{item.name}</p>
                    <p className="item-quantity-price">
                      <span>
                        {item.qty} x {formatPenceToPounds(item.price)}{" "}
                      </span>
                    </p>
                  </div>
                  <div className="item-right-elem">
                    {formatPenceToPounds(item.total)}
                  </div>
                </article>
              );
            })}
            <div className="invoice-grand-total">
              <p className="grand-total-txt">Grand Total</p>
              <p className="grand-total-figure">
                {formatPenceToPounds(invoice.total)}
              </p>
            </div>
          </div>
        </article>
        <div className="footer">
          <div className="action-btns">
            <Button
              as={Link}
              to={`/invoice/${id}/edit`}
              children={"Edit"}
              variant={"secondary"}
            />
            <Button children={"Delete"} variant={"delete"} />
            <Button
              onClick={markAsCompleted}
              children={"Mark as Paid"}
              variant={"primary"}
            />
          </div>
        </div>
      </section>
    </>
  );
}
