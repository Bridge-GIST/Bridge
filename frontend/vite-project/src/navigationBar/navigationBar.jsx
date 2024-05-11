import React from "react";
import { Link } from "react-router-dom";
import "./navigationBar.css";

function NavigationBar() {
  return (
    <nav>
      <div className="Bar">
        <Link to="/" className="nav-logo">
          <span className="B">B</span>
          <span className="ridge">ridge</span>
        </Link>

        <Link to="/mainScreen" className="diary">
          <span className="DiaryBtn">Diary</span>
        </Link>
        <Link to="/login" className="logInBtn">
          <span>Log In</span>
        </Link>
      </div>
    </nav>
  );
}

export default NavigationBar;
