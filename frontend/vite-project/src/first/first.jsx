import React from "react";
//import "./first.css";
import First from "../first/first.png";
import { NavigationBar } from "../navigationBar";

function FirstPage() {
  return (
    <div className="img-box">
      <NavigationBar />
      <img className="pic" src={First} />
    </div>
  );
}

export default FirstPage;
