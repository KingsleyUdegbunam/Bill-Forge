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
          <div className="status-display-left">
            <p className="status-text">Status</p>
            <StatusBadge status={invoice.status} />
          </div>
          <div className="invoice-details-action-elems">
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
        </article>

        <article className="invoice-details-display">
          {/* ID, DESC */}
          <div className="invoice-id-desc">
            <p className="invoice-id">
              <span className="hash-sign">#</span>
              {invoice.id}
            </p>
            <p className="project-desc">{invoice.projectDescription}</p>
          </div>

          {/* BILLER ADDRESS */}
          <div className="address-details bill-from">
            <p>{invoice.billFrom.streetAddress}</p>
            <p>{invoice.billFrom.city}</p>
            <p>{invoice.billFrom.postCode}</p>
            <p>{invoice.billFrom.country}</p>
          </div>

          {/* INVOICE DATE - SENT TO */}
          <div className="invoice-detail-body-container">
            <div className="invoice-date-address">
              {/* INVOICE DATE & PAYMENT DUE */}
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

              {/* BILL TO */}
              <div className="right-details bill-to">
                <div className="right-elem-container">
                  <p className="invoice-details-header">Bill To</p>
                  <p className="invoice-details-content">
                    {invoice.clientName}
                  </p>
                  <div className="address-details ">
                    <p>{invoice.streetAddress}</p>
                    <p>{invoice.city}</p>
                    <p>{invoice.postCode}</p>
                    <p>{invoice.country}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* SENT TO */}
            <div className="invoice-details-mail">
              <p className="invoice-details-header">Sent to</p>
              <p className="invoice-details-content">{invoice.clientEmail}</p>
            </div>
          </div>

          <div className="invoice-detail-price-container">
            <div className="invoice-details-grid-container">
              <div className="tablet price-summmary-tablet">
                <p>Item Name</p>
                <p>QTY.</p>
                <p>Price</p>
                <p>Total</p>
              </div>
              {invoice.items.map((item, index) => {
                return (
                  <article key={index} className="invoice-item-cost">
                    {/*ITEM NAME, QUANTITY, PRICE */}
                    <div className="item-left-elem">
                      {/* ITEM NAME */}
                      <p className="item-name">{item.name}</p>

                      {/* ITEM QUANTITY AND COST */}
                      <div className="item-quantity-price">
                        <span className="item-quantity">{item.qty}</span>
                        <span className="mobile"> x </span>
                        <span className="item-price">
                          {formatPenceToPounds(item.price)}
                        </span>
                      </div>
                    </div>
                    {/* ITEM TOTAL */}
                    <div className="item-right-elem">
                      {formatPenceToPounds(item.total)}
                    </div>
                  </article>
                );
              })}
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
        {/* FOOTER */}
        <div id="details-footer" className="footer">
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

        {/* DELETE MODULE */}
        <section className="delete-alert" style={{ display: "none" }}>
          <div className="delete-modal">
            <h2 className="confirm-delete-h2">Confirm Deletion</h2>
            <p className="warning-text">
              Are you sure you want to delete invoice #${invoice.id}? This
              action cannot be undone.
            </p>

            <div className="action-buttons">
              <Button children="Cancel" variant="secondary" />
              <Button children="Delete" variant="delete" />
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
