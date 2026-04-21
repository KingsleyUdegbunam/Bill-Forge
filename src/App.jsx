import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Header from "./Header";
import Invoices from "./pages/Invoices";
import { invoices } from "./data/data";
import { InvoiceDetails } from "./pages/InvoiceDetails";
import InvoiceEdit from "./pages/InvoiceEdit";
import InvoiceCreate from "./pages/InvoiceCreate";

import "./App.css";
function App() {
  const [invoicesData, setInvoicesData] = useState(invoices);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Invoices invoicesData={invoicesData} />} />
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
          element={
            <InvoiceEdit
              invoicesData={invoicesData}
              setInvoicesData={setInvoicesData}
            />
          }
          path="/invoice/:id/edit"
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
    </>
  );
}

export default App;
