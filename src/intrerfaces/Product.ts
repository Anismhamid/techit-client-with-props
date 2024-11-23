export interface Product {
	id?: string;
	name: string;
	price: number;
	category: string;
	description: string;
	image: string;
	quantity?: string;
	available?: boolean;
	likeCount?: number;
}
