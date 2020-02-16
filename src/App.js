import React from "react";
import { BrowserRouter } from "react-router-dom";
import MainRouter from "./MainRouter";
import "./Components/Styles/custom.css";

const App = () => (
	<BrowserRouter>
		<MainRouter />
	</BrowserRouter>
);

export default App;
