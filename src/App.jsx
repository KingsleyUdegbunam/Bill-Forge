import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import Invoices from "./pages/Invoices";
import "./App.css";
import { InvoiceDetails } from "./pages/InvoiceDetails";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Invoices />} />
        <Route path="/invoice/:id" element={<InvoiceDetails />} />
      </Routes>
    </>
  );
}

export default App;
