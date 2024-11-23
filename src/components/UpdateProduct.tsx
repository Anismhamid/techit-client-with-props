import {FormikValues, useFormik} from "formik";
import {FunctionComponent, useEffect, useState} from "react";
import {Product} from "../intrerfaces/Product";
import * as yup from "yup";
import {getProductById, updateProduct} from "../services/ProductsServices";

interface UpdateProductProps {
	onHide: Function;
	refresh: Function;
	productId: string;
}

const UpdateProduct: FunctionComponent<UpdateProductProps> = ({
	productId,
	refresh,
	onHide,
}) => {
	const [product, setProduct] = useState<Product>({
		name: "",
		category: "",
		description: "",
		image: "",
		price: 0,
	});

	useEffect(() => {
		try {
			getProductById(productId)
				.then((res) => {
					setProduct(res.data);
				})
				.catch((err) => console.log(err));
		} catch (error) {
			console.log(error);
		}
	}, [productId]);

	const formik: FormikValues = useFormik<Product>({
		initialValues: {
			name: product.name,
			category: product.category,
			description: product.description,
			image: product.image,
			price: product.price,
		},
		enableReinitialize: true,
		validationSchema: yup.object({
			name: yup.string().required().min(2),
			category: yup.string().required().min(2),
			description: yup.string().required().min(2),
			image: yup.string().required().url(),
			price: yup.number().required().moreThan(0),
		}),
		onSubmit: (values) => {
			updateProduct({...values, id: productId}).then(() => {
				alert("success");
				onHide();
				refresh();
			});
		},
	});
	return (
		<>
			<div className=' container'>
				<form onSubmit={formik.handleSubmit} className=' w-50 m-auto'>
					<div className='form-floating mb-3'>
						<input
							name='name'
							type='name'
							className='form-control'
							id='name'
							placeholder='anis'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.name}
						/>
						<label htmlFor='name'>name</label>
						{formik.touched.name && formik.errors.name && (
							<p className='text-danger'>{formik.errors.name}</p>
						)}
					</div>
					<div className='form-floating mb-3'>
						<input
							name='price'
							type='number'
							className='form-control'
							id='price'
							placeholder='price'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.price}
						/>
						<label htmlFor='price'>price address</label>
						{formik.touched.price && formik.errors.price && (
							<p className='text-danger'>{formik.errors.price}</p>
						)}
					</div>
					<div className='form-floating'>
						<input
							name='category'
							type='text'
							className='form-control'
							id='category'
							placeholder='category'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.category}
						/>
						<label htmlFor='category'>category</label>
						{formik.touched.category && formik.errors.category && (
							<p className='text-danger'>{formik.errors.category}</p>
						)}
					</div>
					<div className='form-floating'>
						<input
							name='description'
							type='text'
							className='form-control'
							id='description'
							placeholder='descript iond escriptiond e scriptiondescr iptio ndes cription'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.description}
						/>
						<label htmlFor='description'>description</label>
						{formik.touched.description && formik.errors.description && (
							<p className='text-danger'>{formik.errors.description}</p>
						)}
					</div>
					<div className='form-floating'>
						<input
							name='image'
							type='text'
							className='form-control'
							id='image'
							placeholder='image'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.image}
						/>
						<label htmlFor='image'>image</label>
						{formik.touched.image && formik.errors.image && (
							<p className='text-danger'>{formik.errors.image}</p>
						)}
					</div>
					<button
						className='btn btn-success mt-3 w-100'
						type='submit'
						disabled={!formik.dirty || !formik.isValid}
					>
						Update
					</button>
				</form>
			</div>
		</>
	);
};

export default UpdateProduct;
