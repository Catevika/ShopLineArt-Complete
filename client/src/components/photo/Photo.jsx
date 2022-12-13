import { useContext } from 'react';
import { CartContext } from '../../context/cartContext/cartContext';
import { FaCartArrowDown } from 'react-icons/fa';
import './photo.css';

export default function Photo({ photo, size }) {
	const { cart, dispatch } = useContext(CartContext);

	const overlayColor = photo.avg_color ? photo.avg_color : '#242424b3';

	const addToCart = () => {
		dispatch({
			type: 'ADD_TO_CART',
			item: {
				id: photo.id,
				author: photo.photographer,
				authorUrl: photo.photographer_url,
				description: photo.alt,
				avgColor: photo.avg_color,
				image: photo.src.original,
				width: photo.width,
				height: photo.height
			}
		});
	};

	return (
		<div className='photo__img-container'>
			<div className='photo__img-wrapper'>
				<img
					src={size === 'medium'
						? photo.src.medium
						: size === 'large'
							? photo.src.large
							: size === 'large2x'
								? photo.src.large2x
								: photo.src.medium}
					alt={photo.alt}
					loading='auto'
					className='photo__img'
				/>
				<div className='photo__overlay' style={{ 'background': overlayColor }}>
					<div className='photo__text'>
						<div className='photo__text-wrapper'>
							<a href={photo.photographer_url} className='photo__link'>
								<p>
									<strong>Author:</strong> <span>{photo.photographer}</span>
								</p>
							</a>
							<p>
								<strong>Width:</strong> <span>{photo.width}px</span>
							</p>
							<p>
								<strong>Height:</strong> <span>{photo.height}px</span>
							</p>
						</div>
					</div>
				</div>
			</div>
			<FaCartArrowDown
				title='Cart'
				className={cart.find(item => item.id === photo.id) ? 'cart__icon-disabled' : 'cart__icon'}
				onClick={addToCart}
			/>
		</div>
	);
};
