import { useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import Gallery from '../../components/gallery/Gallery';
import './home.css';

export default function Home() {
	const [text, setText] = useState('');
	const [term, setTerm] = useState(JSON.parse((localStorage.getItem('term', text))) || text);

	const handleSubmit = (e) => {
		e.preventDefault();
		setTerm(text);
		localStorage.setItem('term', JSON.stringify(text));
	};

	return (
		<section className='home__container'>
			<header className='header__container'>
				<p title='Find text'>
					Find the perfect photo from{' '}
					<a
						href='https://www.pexels.com'
						title='Pexels link'
						className='header__text-link'
					>
						PEXELS{' '}
					</a>
					amazing&nbsp;artists!
				</p>
				{/* Search bar */}
				<form onSubmit={handleSubmit} className='header__form-container'>
					<input
						type='search'
						title='Search input'
						name='search'
						placeholder='Search... '
						autoFocus
						value={text}
						onChange={(e) => setText(e.target.value)}
						className='search__input'
					/>
					<button title='Search button' type='submit' className='search__btn'>
						<BiSearchAlt className='search__icon' title='Search icon' />
					</button>
				</form>
			</header>

			<Gallery term={term} />
		</section>
	);
}
