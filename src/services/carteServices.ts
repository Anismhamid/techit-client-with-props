import axios from "axios";
import {getProductById} from "./ProductsServices";

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
		return products
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
			userCart.products.push(productId); // Add only the product ID

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
