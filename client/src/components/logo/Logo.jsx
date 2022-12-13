import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext/authContext';
import logoUrl from '../../assets/logo.png';
import './logo.css';
import { CartContext } from '../../context/cartContext/cartContext';

export default function Logo() {
	const user = useContext(AuthContext);
	const cart = useContext(CartContext);
	const navigate = useNavigate();
	const resetCart = () => cart.dispatch({ type: 'RESET_CART' });

	const logout = () => {
		user.dispatch({ type: 'LOGOUT' });
		localStorage.removeItem('term');
		resetCart();
		navigate('/home');
	};

	// 

	return (
		<div className='logo__container'>

			<figure className='logo'>
				<img src={logoUrl} alt='logo' className='logo-img' />
				<figcaption className='logo-caption'>ShopLineArt</figcaption>
			</figure>
			{user?.user ? <button type='button' onClick={logout} className='logo__btn-logout'>Logout</button> : null}
		</div>
	);
}
