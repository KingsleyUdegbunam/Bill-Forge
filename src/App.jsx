import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Header from "./Header";
import Invoices from "./pages/Invoices";
import { invoices } from "./data/data";
import "./App.css";
import { InvoiceDetails } from "./pages/InvoiceDetails";
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
      </Routes>
    </>
  );
}

export default App;
