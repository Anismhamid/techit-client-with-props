import axios from "axios";
import {User} from "../intrerfaces/User";

const api: string = `${process.env.REACT_APP_API}/users`;

export function chechUser(user: User) {
	return axios.get(`${api}?email=${user.email}&&password=${user.password}`);
}
export function postUser(user: User) {
	return axios.post(`${api}`, user);
}

export function getUserById() {
	const id = JSON.parse(localStorage.getItem("userId") as string);
	return axios.get(`${api}/${id}`);
}
