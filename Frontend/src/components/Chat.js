import { useEffect, useState } from "react";
import { Avatar, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MicIcon from "@mui/icons-material/Mic";
import InsertEmoticon from "@mui/icons-material/InsertEmoticon";
import "./Chat.css";
import axios from "./axios.js";
import { useStateValue } from "../StateProvider";

const Chat = ({ messages }) => {
	const [seed, setSeed] = useState("");
	const [toBeSent, setToBeSent] = useState("");
	const [{ user }] = useStateValue();

	async function sendMessage(e) {
		e.preventDefault();
		await axios.post("/messages/new", {
			message: toBeSent,
			name: user.displayName,
			timeStamp: new Date().toUTCString(),
			received: true,
		});
		setToBeSent("");
	}

	useEffect(() => {
		setSeed(Math.floor(Math.random() * 5000));
	}, []);
	return (
		<div className="chat">
			<div className="chat-header">
				<Avatar src={`https://avatars.dicebear.com/api/human/b${seed}.svg`} />
				<div className="chat-headerInfo">
					<h3>Dev Help</h3>
					<p>Last seen at {messages[messages.length - 1]?.timeStamp}</p>
				</div>
				<div className="chat-headerRight">
					<IconButton>
						<SearchOutlinedIcon />
					</IconButton>
					<IconButton>
						<AttachFileIcon />
					</IconButton>
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				</div>
			</div>
			<div className="chat-body">
				{messages.map((message) => {
					return (
						<p
							className={`chat-message ${
								message.name === user.displayName && "chat-receiver"
							}`}
						>
							{/* <p
							key={Date.now() + Math.random()}
							className={`chat-message ${message.received && "chat-receiver"}`}
						> */}
							<span className="chat-name">{message.name}</span>
							{message.message}
							<span className="chat-timestamp">{message.timeStamp}</span>
						</p>
					);
				})}
			</div>
			<div className="chat-footer">
				<InsertEmoticon />
				<form>
					<input
						onChange={(e) => setToBeSent(e.target.value)}
						placeholder="Type a message"
						type="text"
						value={toBeSent}
					/>
					<button type="submit" onClick={sendMessage}>
						Send a message
					</button>
				</form>
				<MicIcon />
			</div>
		</div>
	);
};
export default Chat;
