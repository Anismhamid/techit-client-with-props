import {FunctionComponent, useEffect, useState} from "react";
import Navbar from "./Navbar";
import {Product} from "../intrerfaces/Product";
import {getAllProducs} from "../services/ProductsServices";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {getUserById} from "../services/userService";
import AddProductModal from "./AddProductModal";
import UpdateProductModal from "./UpdateProductModal";
import DeleteProductModal from "./DeleteProductModal";
import {addProductToCart} from "../services/carteServices";
import Loading from "./Loading";
import {shopping} from "../fontAwesome/fontAwesome";

interface ProductsProps {}

const Products: FunctionComponent<ProductsProps> = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [isAdmin, setisAdmin] = useState<boolean>(false);
	const [productsChanged, setProductsChanged] = useState<boolean>(false);
	const [openAddModal, setOpenAddModal] = useState<boolean>(false);
	const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
	const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
	const [productId, setProductId] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(true);

	const trash = <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>;
	useEffect(() => {
		if (localStorage.getItem("userId") !== null) {
			getUserById()
				.then((res) => {
					setisAdmin(res.data.isAdmin);
					setLoading(false);
				})
				.catch((err) => console.log(err));
		}
	}, [productsChanged]);

	useEffect(() => {
		getAllProducs()
			.then((res) => setProducts(res.data))
			.catch((err) => console.log(err));
	}, [productsChanged]);

	let handleAddProduct = () => {
		// open the product modal
		setOpenAddModal(true);
	};

	let refresh = () => {
		setProductsChanged(!productsChanged);
	};

	if (loading) {
		return <Loading />;
	}

	return (
		<>
			<header className='sticky-top w-100'>
				<Navbar />
			</header>
			<div className='container py-5'>
				<div className='row'>
					<button
						className='btn btn-success my-2 w-25 text-center m-auto'
						onClick={() => {
							handleAddProduct();
						}}
					>
						<span className="fs-3 fw-bold">ADD NEW PRODUCT</span>
					</button>
					{products.length ? (
						products.map(
							(product: Product) =>
								product.available && (
									<div
										className='card col-sm-12 col-md-4 my-3 mx-auto'
										key={product.id}
										style={{width: "18rem"}}
									>
										<div className='card-header'>
											{product.category}
										</div>
										<img
											src={product.image}
											className='card-img-top'
											alt={product.name}
										/>
										<div className='card-body'>
											<h5 className='card-title'>{product.name}</h5>
											<p className='card-text'>
												{product.description}
											</p>
											<p className='card-text text-success'>
												{product.price}
											</p>
											<button
												onClick={() =>
													addProductToCart(product.id as string)
												}
												className='btn btn-primary'
											>
												{shopping} Buy
											</button>
											{isAdmin && (
												<div key={product.id}>
													<button
														onClick={() => {
															setOpenUpdateModal(true);
															setProductId(
																product.id as string,
															);
														}}
														className='btn btn-warning'
													>
														Edit
													</button>
													<button
														onClick={() => {
															setOpenDeleteModal(true);
															setProductId(
																product.id as string,
															);
														}}
														className='btn btn-danger'
													>
														{trash}
													</button>
												</div>
											)}
										</div>
									</div>
								),
						)
					) : (
						<p>No data</p>
					)}
				</div>
			</div>
			<AddProductModal
				refresh={refresh}
				show={openAddModal}
				onHide={() => setOpenAddModal(false)} // Corrected
			/>
			<UpdateProductModal
				refresh={refresh}
				show={openUpdateModal}
				onHide={() => setOpenUpdateModal(false)} // Corrected
				productId={productId}
			/>
			<DeleteProductModal
				refresh={refresh}
				show={openDeleteModal}
				onHide={() => setOpenDeleteModal(false)} // Corrected
				productId={productId}
			/>
		</>
	);
};

export default Products;
