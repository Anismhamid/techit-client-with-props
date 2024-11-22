import {FunctionComponent} from "react";
import Navbar from "./Navbar";

interface PageNotFoundProps {}

const PageNotFound: FunctionComponent<PageNotFoundProps> = () => {
	return (
		<>
			<header className=' sticky-top w-100'>
				<Navbar />
			</header>
			<h1 className=' display-1 text-danger'>404 PageNotFound</h1>
		</>
	);
};

export default PageNotFound;
