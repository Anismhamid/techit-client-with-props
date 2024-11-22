import {FunctionComponent, useEffect, useState} from "react";
import Navbar from "./Navbar";
import {Product} from "../intrerfaces/Product";
import {getProductFromCarts} from "../services/carteServices";
import Loading from "./Loading";
import { edit, trash } from "../fontAwesome/fontAwesome";

interface CartProps {}

const Cart: FunctionComponent<CartProps> = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchProducts = async () => {
			setLoading(true);
			try {
				const cartProducts = await getProductFromCarts();
				if (cartProducts) {
					setProducts(cartProducts);
				} else {
					setProducts([]);
				}
			} catch (error) {
				console.error("Error fetching products:", error);
				setProducts([])
			}
			setLoading(false);
		};

		fetchProducts();
	}, []);

	return (
		<>
			<header className='sticky-top w-100'>
				<Navbar />
			</header>
			<h1>Cart</h1>
			{loading ? (
				<Loading />
			) : products.length ? (
				products.map((product) => (
					<div className='container'>
						<table className='table table-triped table-dark'>
							<thead>
								<tr>
									<th colSpan={2}>img</th>
									<th colSpan={2}>name</th>
									<th colSpan={3}>price</th>
									<th colSpan={1}>edit</th>
									<th colSpan={1}>del</th>
								</tr>
							</thead>
							<tbody>
								<tr>
								<td colSpan={2}>
									<img
										style={{width: "300px"}}
										src={product.image}
										alt={product.name}
									/>
								</td>
								<td colSpan={2}>{product.name}</td>
								<td colSpan={3}>{product.price}</td>
								<td className=" text-warning" colSpan={1}>{edit}</td>
								<td onClick={()=>{}} className=" text-danger" colSpan={1}>{trash}</td></tr>
							</tbody>
						</table>
					</div>
				))
			) : (
				<p>Your cart is empty.</p>
			)}
		</>
	);
};

export default Cart;
