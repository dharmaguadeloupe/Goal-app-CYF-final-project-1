import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoginBtn from "./Components/LoginBtn";

import fetchData from "../utils/fetchData";
import "./Home.css";

//import "./styles.css";

export function Home({ setLogin }) {
	const [setMessage] = useState("Loading...");
	const [email, setEmail] = useState("");

	const [password, setPassword] = useState("");
	const [rememberUser, setRememberUser] = useState(false);
	const [missingValidEmail, setMissingValidEmail] = useState(false);
	const [missingValidPassword, setMissingValidPassword] = useState(false);
	const [errorDisplay, setErrorDisplay] = useState(false);

	useEffect(() => {
		if (localStorage.rememberUser && localStorage.email !== "") {
			setEmail(localStorage.email);
			setPassword(localStorage.password);
			setRememberUser(localStorage.rememberUser);
		}
		fetchData("")
			.then((res) => {
				if (!res.ok) {
					throw new Error(res.statusText);
				}
				return res.json();
			})
			.then((body) => {
				setMessage(body.message);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	const handleChange = (e) => {
		e.preventDefault();
		if (e.target.name === "email") {
			setEmail(e.target.value);
		} else {
			setPassword(e.target.value);
		}
	};
	const handleRemember = (e) => {
		setRememberUser(!rememberUser);
	};


	return (
		<div className="home-ctn ">
			<h1 className="text-center">Login to your GoalApp account</h1>
			<div className="slack-connect">
				<a
					href={
						"https://slack.com/openid/connect/authorize?scope=openid&response_type=code&redirect_uri=https://30a8-2-222-102-147.ngrok.io/api/&client_id=2977670222342.2984355485058"
					}
				>
					<img
						className="Slack"
						alt=""
						src={require("../images/Slack_logo.png").default}
					/>
					<h2>Login with Slack</h2>
				</a>
			</div>
			<div className="or-ctn">
				<hr />
				<span>OR</span>
				<hr />
			</div>
			<div className="form">
				<form action="" method="get" className="login-form">
					<div className="form-field">
						<div className="label-ctn">
							<label htmlFor="email">Email</label>
						</div>
						<input
							type="email"
							name="email"
							id="email"
							onChange={(e) => handleChange(e)}
							placeholder="Email address"
							aria-required
							value={email}
							aria-label="enter email"
						></input>
						<div className={`error-login ${missingValidEmail && "display"}`}>
							Please enter a valid email
						</div>
					</div>
					<div className="form-field">
						<div className="label-ctn">
							<label htmlFor="password">Password</label>
						</div>
						<input
							type="password"
							name="password"
							id="password"
							aria-required
							aria-label="enter password"
							onChange={(e) => handleChange(e)}
							placeholder="Password"
							value={password}
						></input>
						<div className={`error-login ${missingValidPassword && "display"}`}>
							Please enter a valid password
						</div>
					</div>
					<div className={`error-login ${errorDisplay && "display"}`}>
						Wrong email and/or password! Please try again.
					</div>
				</form>
			</div>
			<div className="bg-green-100 password-ctn">
				<div className="remember-me-ctn">
					<input
						type="checkbox"
						id="remember-user"
						name="remember"
						onChange={(e) => handleRemember(e)}
						checked={rememberUser}
						aria-label="check to remember user"
					></input>
					<label htmlFor="remember-user">Remember me</label>
				</div>
				<div>
					<Link to={"/forgot_password"}>Forgot password</Link>
				</div>
			</div>

			<LoginBtn
				className="text-center"
				email={email}
				chk={rememberUser}
				password={password}
				setLogin={setLogin}
				setErrorDisplay={setErrorDisplay}
				setMissingValidEmail={setMissingValidEmail}
				setMissingValidPassword={setMissingValidPassword}
			/>
			<div className="create-ctn">
				<p>Not Registered Yet?</p>
				<Link to={"/signup"}>Create an account</Link>
			</div>
		</div>
	);
}

export default Home;
