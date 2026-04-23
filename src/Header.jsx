import "./Header.css";
import logo from "./assets/logo.svg";
import { IoMoon } from "react-icons/io5";

import avatarImage from "./assets/pfp.png";
import { Link } from "react-router-dom";

export default function Header({ theme, onToggleTheme }) {
  return (
    <header className="header">
      {/* Logo */}
      <Link to="/" className="logo">
        <img src={logo} alt="Invoice app logo" />
      </Link>

      <div className="header-right">
        {/* Theme toggle */}
        <button
          className="theme-btn"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          <div className="theme-toggle-inner">
            {theme === "light" ? (
              <IoMoon className="moon-icon" />
            ) : (
              <span className="theme-dot" aria-hidden="true" />
            )}
            {/* Filled dot appears only in dark mode via CSS */}
          </div>
        </button>

        {/* Avatar */}
        <div className="pfp-container">
          <div className="profile-image">
            <img src={avatarImage} alt="User avatar" />
          </div>
        </div>
      </div>
    </header>
  );
}
