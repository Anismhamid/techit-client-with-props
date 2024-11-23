import axios from "axios";
import {getProductById} from "./ProductsServices";
import {errorMSG, successMSG} from "../components/Toastify";

const api: string = `${process.env.REACT_APP_API}/carts`;

export function createUserCart(userId: string) {
	return axios.post(api, {userId, products: [], active: true});
}

export async function getProductFromCarts() {
	try {
		// 1. get products array from user's cart
		let userId: string = JSON.parse(localStorage.getItem("userId") as string);
		let userCart: any = await axios.get(`${api}?userId=${userId}&&active=true`);

		// 2. create get request to get products full details
		let promises = [];
		for (let id of userCart.data[0].products) {
			promises.push(getProductById(id));
		}
		let res = await Promise.all(promises);
		let products = res.map((item: any) => item.data);
		return products;
	} catch (error) {
		console.log(error);
	}
}

export async function addProductToCart(productId: string) {
	try {
		let userId: string = JSON.parse(localStorage.getItem("userId") as string);
		let userCarts: any = await axios.get(`${api}?userId=${userId}&&active=true`);

		if (userCarts.data.length > 0) {
			let userCart = userCarts.data[0];
			userCart.products.push(productId);

			return axios.patch(`${api}/${userCart.id}`, {
				products: userCart.products,
			});
		} else {
			console.log("No active cart found for user.");
		}
	} catch (error) {
		console.log(error);
	}
}

export async function deleteteProductFromCart(productId: string) {
	const userId: string = JSON.parse(localStorage.getItem("userId") as string);

	try {
		const userCarts: any = await axios.get(`${api}?userId=${userId}&&active=true`);

		if (userCarts.data && userCarts.data.length > 0) {
			const cart = userCarts.data[0];
			const cartId = cart.id;
			const productIndex = cart.products.indexOf(productId);

			if (productIndex > -1) {
				cart.products.splice(productIndex, 1);

				await axios.put(`${api}/${cartId}`, {products: cart.products});

				successMSG(`Product removed successfully from your cart`);
			} else {
				errorMSG("Product not found in your cart");
			}
		} else {
			errorMSG("No active cart found for you");
		}
	} catch (error) {
		console.error("Error deleting product from cart:", error);
		errorMSG("Failed to remove product from cart");
	}
}
