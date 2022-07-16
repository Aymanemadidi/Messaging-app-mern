import mongoose from "mongoose";

const messagingSchema = mongoose.Schema({
	message: String,
	name: String,
	timeStamp: String,
	received: Boolean,
});

export default mongoose.model("messagingmessages", messagingSchema);
