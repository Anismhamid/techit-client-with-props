import {FunctionComponent, useEffect, useState} from "react";
import Navbar from "./Navbar";
import {getUserById} from "../services/userService";
import {User} from "../intrerfaces/User";

interface ProfileProps {}

const Profile: FunctionComponent<ProfileProps> = () => {
	const [user, setUser] = useState<User>({
		name: "",
		email: "",
		password: "",
		isAdmin: false,
	});
	useEffect(() => {
		getUserById()
			.then((res) => setUser(res.data))
			.catch((err) => console.log(err));
	}, []);
	return (
		<>
			<header className='sticky-top w-100'>
				<Navbar />
			</header>
			<h1>Profile</h1>
			<div className='container'>
				<table className='table table-striped'>
					<thead>
						<tr>
							<th colSpan={4}>name</th>
							<th colSpan={4}>email</th>
							<th colSpan={4}>administration</th>
						</tr>
					</thead>

					<tbody>
						<tr>
							<td colSpan={4}>{user.name}</td>
							<td colSpan={4}>{user.email}</td>
							<td colSpan={4}>{user.isAdmin ? "admin" : "Client"}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</>
	);
};

export default Profile;
