import logo from "./assets/logo.svg";
import darkBtn from "./assets/dark-theme-icon.svg";
import pfp from "./assets/pfp.png";

import "./Header.css";
export default function Header() {
  return (
    <>
      <nav className="header">
        <div className="logo">
          <img src={logo} alt="App logo" />
        </div>

        <div className="header-right">
          <div className="theme-btn">
            <img src={darkBtn} alt="theme-toggle" />
          </div>
          <div className="pfp-container">
            <div className="profile-image">
              <img src={pfp} alt="theme-toggle" />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
