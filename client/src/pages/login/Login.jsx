import { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { loginCall } from '../../api/apiCalls';
import { AuthContext } from '../../context/authContext/authContext';
import { CircularProgress } from '@mui/material';
import './login.css';

export default function Login() {
	const email = useRef();
	const password = useRef();
	const { isFetching, error, dispatch } = useContext(AuthContext);

	const handleSubmit = (e) => {
		e.preventDefault();
		loginCall(
			{ email: email.current.value, password: password.current.value },
			dispatch
		);
	};

	return (
		<div className='login__form-container'>
			<h2 className='login__form-title'>
				Login to download some of the best photos from <span>PEXELS</span> artists!
			</h2>
			<div className='login__form-wrapper'>
				<form className='login__form' onSubmit={handleSubmit}>
					<div className='login__form-group'>
						<label htmlFor='email' className='login__form-label'>
							Email:
						</label>
						<input
							ref={email}
							name='email'
							type='email'
							autoComplete='username'
							placeholder='Email'
							autoFocus={true}
							required
							className='login__form-input'
						/>
					</div>
					<div className='login__form-group'>
						<label htmlFor='password' className='login__form-label'>
							Password:
						</label>
						<input
							ref={password}
							name='password'
							type='password'
							autoComplete='current-password'
							placeholder='Password'
							required
							minLength='6'
							className='login__form-input'
						/>
					</div>
					<div className='login__btn-group'>
						{isFetching ? (
							<CircularProgress className='loading' color='inherit' />
						) : (
							<button type='submit' className='login__btn'>Log In</button>
						)}
						{isFetching ? null : (
							<>
								<span>Not registered yet? Create&nbsp;a&nbsp;</span>
								<span>
									<Link to='/register' className='login__register-link'>
										new account
									</Link>
								</span>
							</>
						)}
					</div>
					{error ? (
						<div className='error'>No account found. Please <Link to='/' className='login__register-link'><span>register</span></Link> or <span><Link to='/login' className='login__register-link'>retry</Link></span></div>
					) : null}
				</form>
			</div>
		</div>
	);
}
