import {FormikValues, useFormik} from "formik";
import {FunctionComponent} from "react";
import * as yup from "yup";
import {Link, NavigateFunction, useNavigate} from "react-router-dom";
import {User} from "../intrerfaces/User";
import {postUser} from "../services/userService";
import {createUserCart} from "../services/carteServices";

interface RegistegyProps {}

const Registegy: FunctionComponent<RegistegyProps> = () => {
	const navigate: NavigateFunction = useNavigate();
	const formik: FormikValues = useFormik<User>({
		initialValues: {
			name: "",
			email: "",
			password: "",
		},
		validationSchema: yup.object({
			name: yup.string().required().min(2),
			email: yup.string().required().email(),
			password: yup.string().required().min(6),
		}),
		onSubmit: (values) => {
			if (values)
				postUser({...values, isAdmin: false}).then((res) => {
					navigate("/home");
					createUserCart(res.data.id).then((res) => {
						console.log(res.data.id,"cart is created");
					});
					localStorage.setItem("token", JSON.stringify(res.data.id));
				});
		},
	});

	return (
		<div className=' container-sm p-3 border' style={{maxWidth: "28rem"}}>
			<h5 className=' display-6 my5'>Registery</h5>
			<form className=' w-50 m-auto' onSubmit={formik.handleSubmit}>
				<div className='form-floating mb-3'>
					<input
						name='name'
						type='text'
						className='form-control'
						id='name'
						placeholder='Jhone Doe'
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
						name='email'
						type='email'
						className='form-control'
						id='email'
						placeholder='name@example.com'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.email}
					/>
					<label htmlFor='email'>Email address</label>
					{formik.touched.email && formik.errors.email && (
						<p className='text-danger'>{formik.errors.email}</p>
					)}
				</div>
				<div className='form-floating'>
					<input
						name='password'
						type='password'
						className='form-control'
						id='Password'
						placeholder='Password'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.password}
					/>
					<label htmlFor='Password'>Password</label>
					{formik.touched.password && formik.errors.password && (
						<p className='text-danger'>{formik.errors.password}</p>
					)}
				</div>
				<button
					className='btn btn-success mt-3 w-100'
					type='submit'
					disabled={!formik.dirty || !formik.isValid}
				>
					Registery
				</button>
			</form>
			<p className=' mt-3'>
				<Link to={"/"}>Already have an account? Login</Link>
			</p>
		</div>
	);
};

export default Registegy;
