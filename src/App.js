import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import MainRouter from "./MainRouter";
import "./Components/Styles/custom.css";
import AuthState from "./Context/Auth/AuthState";
import QuizState from "./Context/Quiz/QuizState";
import Header from "./Components/Layouts/Header";
import Footer from "./Components/Layouts/Footer";

const App = () => {
	return (
		<AuthState>
			<Router>
				<Header />
				<MainRouter />
				<Footer />
			</Router>
		</AuthState>
	);
};

export default App;
