import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { TestForm } from "./test";
import { LoginForm, SignupForm } from "./account";
import { UserProvider } from "./UserContext";
import { MainScreenForm } from "./mainScreen";
import { FirstPage } from "./first";
import { DiaryWrite } from "./write";
import { CrossDiary } from "./crossScreen";

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/mainscreen" element={<MainScreenForm />} />
            <Route path="/" element={<FirstPage />} />
            <Route path="/write" element={<DiaryWrite />} />
            <Route path="/cross/:pk" element={<CrossDiary />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
