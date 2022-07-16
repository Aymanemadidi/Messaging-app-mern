import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import Pusher from "pusher";

const app = express();
const port = process.env.PORT | 9000;

const connectionUrl =
	"mongodb+srv://aymanelmadidi:CapgPiKhMDqq@cluster0.l7ch4.mongodb.net/messagingmessages?retryWrites=true&w=majority";

const pusher = new Pusher({
	appId: "1437194",
	key: "d4208acb701ee359db8c",
	secret: "3789ba656a30deeabc89",
	cluster: "eu",
	useTLS: true,
});

const db = mongoose.connection;
db.once("open", () => {
	console.log("DB Connected");
	const msgCollection = db.collection("messagingmessages");
	const changeStream = msgCollection.watch();
	changeStream.on("change", (change) => {
		console.log(change);
		if (change.operationType === "insert") {
			const messageDetails = change.fullDocument;
			pusher.trigger("messages", "inserted", {
				name: messageDetails.name,
				message: messageDetails.message,
				timestamp: messageDetails.timeStamp,
				received: messageDetails.received,
			});
		} else {
			console.log("Error trigerring Pusher");
		}
	});
});
mongoose.connect(connectionUrl, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
	res.status(200).send("Hello from the server");
});

app.post("/messages/new", (req, res) => {
	const dbMessage = req.body;
	Messages.create(dbMessage, (err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(201).send(data);
		}
	});
});

app.get("/messages/sync", (req, res) => {
	Messages.find((err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(201).send(data);
		}
	});
});

app.listen(port, () => {
	console.log("Server listening on port " + port);
});
