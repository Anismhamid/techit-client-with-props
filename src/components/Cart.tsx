import {FunctionComponent, useEffect, useState} from "react";
import Navbar from "./Navbar";
import {Product} from "../intrerfaces/Product";
import {getProductFromCarts} from "../services/carteServices";
import Loading from "./Loading";
import {edit, trash} from "../fontAwesome/fontAwesome";
import DeleteFromCartModal from "./DeleteFromCartModal";
import {errorMSG} from "./Toastify";
import {useNavigate} from "react-router-dom";

interface CartProps {}

const Cart: FunctionComponent<CartProps> = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [productId, setProductId] = useState<string>("");
	const [openDeleteFromCartModal, setOpenDeleteFromCartModal] =
		useState<boolean>(false);
	const [productsChanged, setProductsChanged] = useState<boolean>(false);
	const navigate = useNavigate();
	useEffect(() => {
		const fetchProducts = async () => {
			setLoading(true);
			try {
				const cartProducts = await getProductFromCarts();
				setProducts(cartProducts || []);
			} catch (error) {
				errorMSG(`${error}`);
				setProducts([]);
			}
			setLoading(false);
		};

		fetchProducts();
	}, [productsChanged]); // This still works fine for tracking changes to the cart

	let refresh = () => {
		setProductsChanged(!productsChanged);
	};

	return (
		<>
			<header className='sticky-top w-100'>
				<Navbar />
			</header>
			<div className='container'>
				<h1>Cart</h1>
				{loading ? (
					<Loading />
				) : products.length ? (
					products.map((product, index: number) => (
						<div className='table-responsive'>
							<table className='table table-striped table-hover'>
								<thead>
									<tr>
										<th>id</th>
										<th colSpan={2}>img</th>
										<th colSpan={2}>name</th>
										<th colSpan={2}>quantity</th>
										<th colSpan={2}>price</th>
										<th colSpan={2}>edit</th>
										<th colSpan={2}>del</th>
									</tr>
								</thead>
								<tbody>
									<tr key={index}>
										<th scope="row">{product.id}</th>
										<td colSpan={2}>
											<img
												style={{width: "120px"}}
												src={product.image}
												alt={product.name}
											/>
										</td>
										<td colSpan={2}>{product.name}</td>
										<td colSpan={2}>{product.quantity}</td>
										<td colSpan={2}>{product.price}</td>
										<td className=' text-warning' colSpan={1}>
											{edit}
										</td>
										<td className=' text-danger' colSpan={2}>
											<button
												onClick={() => {
													setOpenDeleteFromCartModal(true);
													setProductId(product.id as string);
												}}
												className='btn btn-danger'
											>
												{trash}
											</button>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					))
				) : (
					<div>
						<p className=' display-3 text-bg-dark px-5 rounded-5'>
							Your cart is empty.
						</p>
						<h1>SHOP NOW</h1>
						<button
							onClick={() => {
								navigate("/products");
							}}
							className='learn-more'
						>
							<span className='circle' aria-hidden='true'>
								<span className='icon arrow'></span>
							</span>
						</button>
					</div>
				)}
				<DeleteFromCartModal
					refresh={refresh}
					show={openDeleteFromCartModal}
					onHide={() => setOpenDeleteFromCartModal(false)}
					productId={productId}
				/>
			</div>
		</>
	);
};

export default Cart;
