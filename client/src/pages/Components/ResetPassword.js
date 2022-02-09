import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { headers } from "../../utils/generalPostObjects";
import fetchData from "../../utils/fetchData";
const ResetPassword = () => {
	let { id } = useParams();

	const [password, setPassword] = useState("");
		const [confirmPassword, setConfirmPassword] = useState("");
	const handleChange = (e) => {
		if (e.target.name === 'password')
			
			setPassword(e.target.value);
			
		else setConfirmPassword(e.target.value)
	};
	const resetpassword = (e) => {
		e.preventDefault();
	
		if (confirmPassword===password) {
			const methodObj = {
				method: "POST",
				headers,
				body: JSON.stringify({
					
					password: password,
				}),
			};
			fetchData(`/reset_password/${id}`, methodObj)
				.then((res) => res.json())
				.then(() =>
					alert("Password has been changed")
				)
				.catch();
		}
		else alert("Password and confirm password don't match try again")
	};

	return (
		<div className="forgot-psw-ctn">
			<div className="form">
				<form action="" method="get">
					<div className="form-field">
						<p class='password-heading'><strong><h4>Enter new password </h4></strong></p>

						<div className="label-ctn">
							<label htmlFor="password">Enter New password</label>
						</div>
						<input
							type="password"
							name="password"
							id="password"
							aria-required
							onChange={(e) => handleChange(e)}
							placeholder="Password"
						></input>

						<div className="label-ctn">
							<label htmlFor="confirm new password">Confirm New password</label>
						</div>
						<input
							type="password"
							name="confirm-password"
							id="confirm-password"
							aria-required
							onChange={(e) => handleChange(e)}
							placeholder="Confirm new Password"
						></input>
						<button className="login-btn" onClick={(e) => resetpassword(e)}>
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ResetPassword;
