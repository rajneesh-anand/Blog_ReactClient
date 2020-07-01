import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import MainRouter from "./MainRouter";
import AuthState from "./context/Auth/AuthState";
// import QuizState from "./context/Quiz/QuizState";
import Header from "./components/Layouts/Header";
// import Footer from "./components/Layouts/Footer";
import "./components/Styles/custom.css";

const App = () => {
  return (
    <AuthState>
      <Router>
        <Header />
        <MainRouter />
        {/* <Footer /> */}
      </Router>
    </AuthState>
  );
};

export default App;
