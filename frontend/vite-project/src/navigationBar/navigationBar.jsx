import React from "react";
import { Link } from "react-router-dom";
import "./navigationBar.css";

function NavigationBar() {
  const user = localStorage.getItem('user');
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
          {!user ?
            <Link to="/signup" className="logInBtn"><span>회원가입</span></Link> : 
            <Link to="/login" className="logInBtn"><span>로그인</span></Link>
          }
        
      </div>
    </nav>
  );
}

export default NavigationBar;
