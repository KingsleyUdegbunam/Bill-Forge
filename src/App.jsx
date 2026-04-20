import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import Invoices from "./pages/Invoices";
import "./App.css";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Invoices />}></Route>
      </Routes>
    </>
  );
}

export default App;
