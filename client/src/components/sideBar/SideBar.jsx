import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { CartContext } from '../../context/cartContext/cartContext';
import Logo from '../logo/Logo';
import { FaCartArrowDown } from 'react-icons/fa';
import { FcAbout } from 'react-icons/fc';
import { MdContacts } from 'react-icons/md';
import { RiHomeSmileFill } from 'react-icons/ri';
import './sidebar.css';

export default function SideBar() {
	const { cart } = useContext(CartContext);

	return (
		<aside
			className='sidebar__container'
		>
			<Logo />
			<nav className='nav__container'>
				<ul className='nav__items-list'>
					<li className='nav__item'>
						<NavLink
							to='/home'
							title='Home'
							className={({ isActive }) =>
								isActive ? 'nav__link active-link' : 'nav__link'
							}
						>
							<RiHomeSmileFill className='nav__icon' />
							<span>Home</span>
						</NavLink>
					</li>
					<li className='nav__item'>
						<NavLink
							to='/about'
							title='About'
							className={({ isActive }) =>
								isActive ? 'nav__link active-link' : 'nav__link'
							}
						>
							<FcAbout className='nav__icon nav__icon-white' />
							<span>About</span>
						</NavLink>
					</li>
					<li className='nav__item'>
						<div className='nav__icon-notification-container'>
							<NavLink
								to='/cart'
								title='Cart'
								className={({ isActive }) =>
									isActive ? 'nav__link active-link' : 'nav__link'
								}
							>
								<FaCartArrowDown className='nav__icon cart' />
								{cart.length > 0 ? <p title='Cart content' className='nav__icon-notification'><strong>{cart.length}</strong></p> : null}
								<span>Cart</span>
							</NavLink>
						</div>
					</li>
					<li className='nav__item'>
						<NavLink
							to='/contact'
							title='Contact'
							className={({ isActive }) =>
								isActive ? 'nav__link active-link' : 'nav__link'
							}
						>
							<MdContacts className='nav__icon' />
							<span>Contact</span>
						</NavLink>
					</li>
				</ul>
			</nav>
		</aside>
	);
}
