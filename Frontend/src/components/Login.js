import React from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useStateValue } from "../StateProvider";
import { actionTypes } from "./Reducer";

import { Button } from "@mui/material";
import "./Login.css";

function Login() {
	// eslint-disable-next-line no-empty-pattern
	const [{}, dispatch] = useStateValue();
	function signIn() {
		signInWithPopup(auth, provider)
			.then((result) => {
				dispatch({
					type: actionTypes.SET_USER,
					user: result.user,
				});
			})
			.catch((error) => alert(error.message));
	}
	return (
		<div className="login">
			<div className="login-container">
				<img src="logo512.png" alt="whatsapp" />
				<div className="login-text">
					<h1>SignIn to Messaging App</h1>
				</div>
				<Button onClick={signIn}>Sign In with Google</Button>{" "}
			</div>
		</div>
	);
}

export default Login;
