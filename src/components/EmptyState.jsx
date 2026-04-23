import "./EmptyState.css";
import emptyData from "../assets/no-invoice-mobile.svg";

export function EmptyState() {
  return (
    <section className="empty-data">
      <div className="image-container">
        <img src={emptyData} alt="" />
        <h2>There is nothing here</h2>
        <p>Create an invoice by clicking the</p>
        <p>
          <span className="emphasis">New</span> button and get started
        </p>
      </div>
    </section>
  );
}
