import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Registery from "./components/Registery";
import PageNotFound from "./components/PageNotFound";
import Cart from "./components/Cart";
import Products from "./components/Products";
import { ToastContainer } from "react-toastify"; 

function App() {
	return (
		<div className='App'>
			<ToastContainer />
			<Router future={{v7_startTransition: true, v7_relativeSplatPath: true}}>
				<Routes>
					<Route path='/' element={<Login />} />
					<Route path='/home' element={<Home />} />
					<Route path='/registery' element={<Registery />} />
					<Route path='/products' element={<Products />} />
					<Route path='/profile' element={<Profile />} />
					<Route path='/cart' element={<Cart />} />
					<Route path='*' element={<PageNotFound />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
