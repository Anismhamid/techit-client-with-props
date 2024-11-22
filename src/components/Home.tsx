import {FunctionComponent} from "react";
import Navbar from "./Navbar";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
	return (
		<>
			<header className=' sticky-top w-100'>
				<Navbar />
			</header>
			<h1 className=' text-center'>Home</h1>
		</>
	);
};

export default Home;
