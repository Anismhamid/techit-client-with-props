import {FormikValues, useFormik} from "formik";
import {FunctionComponent} from "react";
import * as yup from "yup";
import {chechUser} from "../services/userService";
import {Link, NavigateFunction, useNavigate} from "react-router-dom";
import {User} from "../intrerfaces/User";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
	const navigate: NavigateFunction = useNavigate();
	const formik: FormikValues = useFormik<User>({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: yup.object({
			email: yup.string().required().email(),
			password: yup.string().required().min(6),
		}),
		onSubmit: (values) => {
			chechUser(values)
				.then((res) => {
					if (res.data.length) {
						navigate("/home");
						localStorage.setItem("userId", JSON.stringify(res.data[0].id));
					} else {
						alert("Somthing was wrong while login to the TechIt");
					}
				})
				.catch((err) => console.log(err));
		},
	});
	return (
		<div className=' container-sm p-3 border' style={{maxWidth: "30rem"}}>
			<h5 className=' display-6 my5'>LOgin</h5>
			<form className=' w-50 m-auto' onSubmit={formik.handleSubmit}>
				<div className='form-floating mb-3'>
					<input
						name='email'
						type='email'
						className='form-control'
						id='floatingInput'
						placeholder='name@example.com'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.email}
					/>
					<label htmlFor='floatingInput'>Email address</label>
					{formik.touched.email && formik.errors.email && (
						<p className='text-danger'>{formik.errors.email}</p>
					)}
				</div>
				<div className='form-floating'>
					<input
						name='password'
						type='password'
						className='form-control'
						id='floatingPassword'
						placeholder='Password'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.password}
					/>
					<label htmlFor='floatingPassword'>Password</label>
					{formik.touched.password && formik.errors.password && (
						<p className='text-danger'>{formik.errors.password}</p>
					)}
				</div>
				<button
					className='btn btn-success mt-3 w-100'
					type='submit'
					disabled={!formik.dirty || !formik.isValid}
				>
					Login
				</button>
			</form>
			<p className=' mt-3'>
				New user?<Link to={"/registery"}>Registery now</Link>
			</p>
		</div>
	);
};

export default Login;
