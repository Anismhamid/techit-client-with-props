import axios from "axios";
import {Product} from "../intrerfaces/Product";

const api: string = `${process.env.REACT_APP_API}/products`;

export function getAllProducs() {
	return axios.get(api);
}

export function getProductById(id: string) {
	return axios.get(`${api}/${id}`);
}

export function addProduct(product: Product) {
	return axios.post(api, product);
}
export function updateProduct(product: Product) {
	return axios.put(`${api}/${product.id}`, product);
}

export function deleteteProduct(id: string) {
	return axios.patch(`${api}/${id}`, {available: false});
}

export function productLike(id: string, likeCount: number) {
	return axios.patch(`${api}/${id}`, {likeCount: likeCount + 1}); 
}

// export async function chechIsAdmin() {
// 	try {
// 		if (localStorage.getItem("id") !== null) {
// 			let result = await getUserById();
// 			console.log(result.data.isAdmin);

// 			return result.data.isAdmin;
// 		}
// 		return false
// 	} catch (error) {
// 		console.log(error);
// 	}
// }
// chechIsAdmin();
