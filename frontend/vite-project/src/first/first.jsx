import React from "react";
//import "./first.css";
import First from "../first/first.png";
import "./first.css";
import { NavigationBar } from "../navigationBar";

function FirstPage() {
  return (
    <div className="img-box">
      <NavigationBar />
      <img className="pic" src={First} />
      <div className="overlay-text">나의 불안으로부터, <br/>새로운 <span className="color">긍정</span>을</div> 
    </div>
  );
}

export default FirstPage;
