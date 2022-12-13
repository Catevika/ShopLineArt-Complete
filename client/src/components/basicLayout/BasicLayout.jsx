import { Link, Outlet, useLocation } from 'react-router-dom';
import SideBar from '../sideBar/SideBar';
import Footer from '../footer/Footer';
import './basicLayout.css';

export default function BasicLayout() {
	const location = useLocation();

	return (
		<>
			<SideBar />
			<main>
				<Outlet />
				{location?.pathname === '/' ? <div className='welcome__container'>
					<p title='Welcome'>
						Welcome to
					</p>
					<h1 title='ShopLineArt' className='welcome__title'><span>ShopLineArt</span></h1>
					<p title='Artists text'>Find the perfect photo from{' '}

						<a
							href='https://www.pexels.com'
							title='Pexels link'
							className='welcome__link'
						>PEXELS</a>{' '}
						amazing&nbsp;artists</p>
					<Link to='/home'>
						<button title='Home' className='welcome__btn'>
							Go to home
						</button>
					</Link>
				</div> : null}
			</main>
			<Footer />
		</>
	);
}
