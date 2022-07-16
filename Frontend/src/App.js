import { useState, useEffect } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import Login from "./components/Login";
import Pusher from "pusher-js";
import axios from "./components/axios.js";
import { useStateValue } from "./StateProvider";

function App() {
	const [messages, setMessages] = useState([]);
	const [{ user }] = useStateValue();
	// const [user, setUser] = useState(null);

	useEffect(() => {
		async function getData() {
			const data = await axios.get("/messages/sync");
			setMessages(data.data);
		}
		getData();
	}, []);

	useEffect(() => {
		axios.get("/messages/sync").then((res) => {
			setMessages(res.data);
		});
	}, []);

	useEffect(() => {
		// Pusher.logToConsole = true;

		const pusher = new Pusher("d4208acb701ee359db8c", {
			cluster: "eu",
		});
		const channel = pusher.subscribe("messages");
		channel.bind("inserted", (data) => {
			setMessages([...messages, data]);
		});
		return () => {
			channel.unbind_all();
			channel.unsubscribe();
		};
	}, [messages]);

	return (
		<div className="App">
			{!user ? (
				<Login />
			) : (
				<div className="app-body">
					<Sidebar messages={messages} />
					<Chat messages={messages} />
				</div>
			)}
		</div>
	);
}

export default App;
