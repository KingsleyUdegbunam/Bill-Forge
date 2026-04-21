import { BiSolidChevronLeft } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import "./GoBackButton.css";

export function GoBackBtn() {
  const navigate = useNavigate();

  return (
    <button className="go-back-btn" onClick={() => navigate(-1)}>
      <BiSolidChevronLeft className="go-back-svg" />
      <p>Go back</p>
    </button>
  );
}
