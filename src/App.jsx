import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

import Header from "./Header";
import Invoices from "./pages/Invoices";
import { invoices } from "./data/data";
import { InvoiceDetails } from "./pages/InvoiceDetails";
import InvoiceEdit from "./pages/InvoiceEdit";
import InvoiceCreate from "./pages/InvoiceCreate";

import "./App.css";

function App() {
  const [invoicesData, setInvoicesData] = useState(invoices);
  const [showCreateOverlay, setShowCreateOverlay] = useState(false);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("invoice-theme") || "light",
  );

  // Apply data-theme attribute to <html> whenever theme changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("invoice-theme", theme);
  }, [theme]);

  const handleToggleTheme = () =>
    setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <section className="app-container">
      <Header theme={theme} onToggleTheme={handleToggleTheme} />

      {/* main-content wrapper fixes desktop layout — sidebar stays, content fills remaining space */}
      <div className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <Invoices
                invoicesData={invoicesData}
                onNewInvoice={() => setShowCreateOverlay(true)}
              />
            }
          />
          <Route
            path="/invoice/:id"
            element={
              <InvoiceDetails
                invoicesData={invoicesData}
                setInvoicesData={setInvoicesData}
              />
            }
          />
          <Route
            path="/invoice/:id/edit"
            element={
              <InvoiceEdit
                invoicesData={invoicesData}
                setInvoicesData={setInvoicesData}
              />
            }
          />
          <Route
            path="/invoice/create"
            element={
              <InvoiceCreate
                invoicesData={invoicesData}
                setInvoicesData={setInvoicesData}
              />
            }
          />
        </Routes>
      </div>

      {/* Create overlay (tablet/desktop) */}
      {showCreateOverlay && (
        <div
          className="edit-overlay-backdrop"
          onClick={() => setShowCreateOverlay(false)}
        >
          <div
            className="edit-overlay-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <InvoiceCreate
              invoicesData={invoicesData}
              setInvoicesData={setInvoicesData}
              onClose={() => setShowCreateOverlay(false)}
              isOverlay={true}
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default App;
