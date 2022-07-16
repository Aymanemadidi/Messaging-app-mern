import React from "react";
import "./Sidebar.css";
import SidebarChat from "./SidebarChat";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Avatar, IconButton } from "@mui/material";
import { useStateValue } from "../StateProvider";

function Sidebar({ messages }) {
	const [{ user }] = useStateValue();
	return (
		<div className="sidebar">
			<div className="sidebar-header">
				<Avatar src={user?.photoURL} />
				<div className="sidebar-headerRight">
					<IconButton>
						<DonutLargeIcon />
					</IconButton>
					<IconButton>
						<ChatIcon />
					</IconButton>
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				</div>
			</div>
			<div className="sidebar-search">
				<div className="sidebar-searchContainer">
					<SearchOutlinedIcon />
					<input placeholder="Search or start new chat" type="text" />
				</div>
			</div>
			<div className="sidebar-chats">
				<SidebarChat messages={messages} />
			</div>
		</div>
	);
}

export default Sidebar;
