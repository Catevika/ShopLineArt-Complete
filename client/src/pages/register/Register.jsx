import axios from 'axios';
import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './register.css';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export default function Register() {
	const username = useRef();
	const email = useRef();
	const password = useRef();
	const passwordConfirmation = useRef();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (passwordConfirmation.current.value !== password.current.value) {
			password.current.setCustomValidity('Passwords do not match!');
		} else {
			const user = {
				username: username.current.value,
				email: email.current.value,
				password: password.current.value
			};
			try {
				await axios.post('/register', user);
				navigate('/login');
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<div className='register__form-container'>
			<h2 className='register__form-title'>
				Register to download some of the best photos from <span>PEXELS</span> artists!
			</h2>
			<div className='register__form-wrapper'>
				<form className='register__form' onSubmit={handleSubmit}>
					<div className='register__form-group'>
						<label htmlFor='username' className='register__form-label'>
							Username:
						</label>
						<input
							name='username'
							type='text'
							autoComplete='username'
							autoFocus={true}
							placeholder='Username'
							className='register__form-input'
							ref={username}
							required
						/>
					</div>
					<div className='register__form-group'>
						<label htmlFor='email' className='register__form-label'>
							Email:
						</label>
						<input
							name='email'
							type='email'
							autoComplete='email'
							placeholder='Email'
							className='register__form-input'
							ref={email}
							required
						/>
					</div>
					<div className='register__form-group'>
						<label htmlFor='password' className='register__form-label'>
							Password:
						</label>
						<input
							name='password'
							type='password'
							autoComplete='new-password'
							placeholder='Password'
							className='register__form-input'
							ref={password}
							required
							minLength={6}
						/>
					</div>
					<div className='register__form-group'>
						<label
							htmlFor='password-confirmation'
							className='register__form-label'
						>
							Password confirmation:
						</label>
						<input
							name='password-confirmation'
							type='password'
							autoComplete='current-password'
							placeholder='Password confirmation'
							className='register__form-input'
							ref={passwordConfirmation}
							required
						/>
					</div>
					<div className='register__btn-group'>
						<button type='submit' className='register__btn'>
							Sign Up
						</button>
						<span>Already registered? </span>
						<span>
							<Link to='/login' className='register__login-link'>
								Log&nbsp;into&nbsp;account
							</Link>
						</span>
					</div>
				</form>
			</div>
		</div>
	);
}
