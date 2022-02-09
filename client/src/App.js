import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import NavBar from "./pages/Components/NavBar";
import About from "./pages/About";
import ResetPassword from "./pages/Components/ResetPassword";
import Home from "./pages/Home";
import Password from "./pages/Components/Password";
import Dashboard from "./pages/Components/Dashboard";

function App() {

	const givenEmail = localStorage.getItem("email");
	const givenPassword = localStorage.getItem("password");
	const [login, setLogin] = useState(Boolean(localStorage.getItem("t")));

	return (
		<div className="App">
			<NavBar login={login} setLogin={setLogin} />
			<Routes>
				<Route
					path="/"
					element={
						<Home
							givenEmail={givenEmail}
							givenPassword={givenPassword}
							setLogin={setLogin}
						/>
					}
				/>
				{/* <Route path="/" element={<Home givenEmail={givenEmail} givenPassword={ givenPassword} setLogin={setLogin} />} /> */}
				<Route path="/signup" element={<SignUp />} />
				<Route path="/about" element={<About />} />
				{<Route path="/forgot_password" element={<Password />} />}
				{<Route exact path="/reset_password/:id" element={<ResetPassword />} />}
				<Route path="/:username" element={<Dashboard period={"daily"} />} />
				<Route
					path="/:username/weekly"
					element={<Dashboard period={"weekly"} />}
				/>
				<Route
					path="/:username/monthly"
					element={<Dashboard period={"monthly"} />}
				/>
				<Route
					path="/:username/quarterly"
					element={<Dashboard period={"quarterly"} />}
				/>
			</Routes>
		</div>
	);
}
export default App;
