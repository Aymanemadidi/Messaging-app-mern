import axios from "axios";

const instance = axios.create({
	baseURL: "https://messaging-app-backend2022.herokuapp.com/",
});

export default instance;
