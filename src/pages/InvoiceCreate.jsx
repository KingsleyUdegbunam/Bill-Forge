import { GoBackBtn } from "../components/navigation/GoBackButton";
import { Button } from "../components/ui/Buttons";
import "./InvoiceCreate.css";
import { GrFormAdd } from "react-icons/gr";

export default function InvoiceCreate() {
  return (
    <div className="form-container">
      <section className="main-wrapper">
        <GoBackBtn />
        <p className="header-main">New Invoice</p>
        <article className="owner-details">
          <p className="edit-header">Bill From</p>

          <div className="business-input-fields">
            <div className="detail-input-container">
              <label htmlFor="business-street-address">Street Address</label>
              <input
                type="text"
                name="business-street-address"
                id="business-street-address"
              />
            </div>
            <div className="city-and-post-code">
              <div className="detail-input-container">
                <label htmlFor="business-city-address">City</label>
                <input
                  type="text"
                  name="business-city-address"
                  id="business-city-address"
                />
              </div>
              <div className="detail-input-container">
                <label htmlFor="business-post-code">Post Code</label>
                <input
                  type="text"
                  name="business-post-code"
                  id="business-post-code"
                />
              </div>
            </div>
            <div className="detail-input-container">
              <label htmlFor="business-country">Country</label>
              <input
                type="text"
                name="business-country"
                id="business-country"
              />
            </div>
          </div>
        </article>
        <article className="client-details">
          <p className="edit-header">Bill To</p>
          <div className="business-input-fields">
            <div className="detail-input-container">
              <label htmlFor="client-name">Client's Name</label>
              <input type="text" name="client-name" id="client-name" />
            </div>

            <div className="detail-input-container">
              <label htmlFor="client-email">Client's Email</label>
              <input type="text" name="client-email" id="client-email" />
            </div>
            <div className="detail-input-container">
              <label htmlFor="client-street-address">Street Address</label>
              <input
                type="text"
                name="client-street-address"
                id="client-street-address"
              />
            </div>
            <div className="city-and-post-code">
              <div className="detail-input-container">
                <label htmlFor="client-city-address">City</label>
                <input
                  type="text"
                  name="client-city-address"
                  id="client-city-address"
                />
              </div>
              <div className="detail-input-container">
                <label htmlFor="client-post-code">Post Code</label>
                <input
                  type="text"
                  name="client-post-code"
                  id="client-post-code"
                />
              </div>
            </div>
            <div className="detail-input-container">
              <label htmlFor="client-country">Country</label>
              <input type="text" name="client-country" id="client-country" />
            </div>
          </div>
        </article>
        <article className="invoice-payment-info">
          <div className="detail-input-container">
            <label htmlFor="invoice-issuance-date">Invoice Date</label>
            <input
              type="date"
              name="invoice-issuance-date"
              id="invoice-issuance-date"
            />
          </div>
          {/* USE SELECT LIBRARY HERE */}
          <div className="detail-input-container">
            <label htmlFor="invoice-issuance-date">Payment Terms</label>
            <input
              type="date"
              name="invoice-issuance-date"
              id="invoice-issuance-date"
            />
          </div>
          <div className="detail-input-container">
            <label htmlFor="project-description">Payment Description</label>
            <input
              type="text"
              name="project-description"
              id="project-description"
            />
          </div>
        </article>
        <article className="edit-item-list-container">
          <p className="item-list-header">Item List</p>
          <div className="item-cards-container">
            <article className="invoice-item-card">
              <div className="detail-input-container">
                <label htmlFor="item-name">Item Name</label>
                <input type="text" name="item-name" id="item-name" />
              </div>

              <div className="item-set-container">
                <div className="detail-input-container">
                  <label htmlFor="item-quantity">Qty.</label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    inputMode="numeric"
                    name="item-quantity"
                    id="item-quantity"
                  />
                </div>
                <div className="detail-input-container">
                  <label htmlFor="item-price">Price</label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    inputMode="numeric"
                    name="item-price"
                    id="item-price"
                  />
                </div>
                <div className="detail-input-container">
                  <label htmlFor="items-total">Total</label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    inputMode="numeric"
                    name="items-total"
                    id="items-total"
                  />
                </div>
                <div className="detail-input-container">
                  <label htmlFor="items-total">Total</label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    inputMode="numeric"
                    name="items-total"
                    id="items-total"
                  />
                </div>
              </div>
            </article>
            <article className="invoice-item-card">
              <div className="detail-input-container">
                <label htmlFor="item-name">Item Name</label>
                <input type="text" name="item-name" id="item-name" />
              </div>

              <div className="item-set-container">
                <div className="detail-input-container">
                  <label htmlFor="item-quantity">Qty.</label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    inputMode="numeric"
                    name="item-quantity"
                    id="item-quantity"
                  />
                </div>
                <div className="detail-input-container">
                  <label htmlFor="item-price">Price</label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    inputMode="numeric"
                    name="item-price"
                    id="item-price"
                  />
                </div>
                <div className="detail-input-container">
                  <label htmlFor="items-total">Total</label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    inputMode="numeric"
                    name="items-total"
                    id="items-total"
                  />
                </div>
                <div className="detail-input-container">
                  <label htmlFor="items-total">Total</label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    inputMode="numeric"
                    name="items-total"
                    id="items-total"
                  />
                </div>
              </div>
            </article>
          </div>
          <Button id="add-new-item-btn" variant="secondary">
            <GrFormAdd className="add-btn-icon" />
            <p> Add New Item</p>
          </Button>
        </article>
      </section>
    </div>
  );
}
