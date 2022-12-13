import { Link } from 'react-router-dom';
import Logo from '../../components/logo/Logo';
import noMatchUrl from '../../assets/404.jpg';
import './noMatch.css';

export default function NoMatch() {
	return (
		<div className='nomatch__container'>
			<Logo className='nomatch__logo' />
			<img src={noMatchUrl} alt="404 - Page not found" className='nomatch__img' />
			<div className='nomatch__text'>
				<p>Ooops! A little glitch in your navigation?</p>
				<p> 404 <span>Error</span></p>
				<Link to='/home'>
					<button type='button' title='Home' className='nomatch__btn'>
						Go back home
					</button>
				</Link>
			</div>
		</div>
	);
}
