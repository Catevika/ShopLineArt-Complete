import { useContext } from 'react';
import JSZip from "jszip";
import saveAs from 'file-saver';
import { AuthContext } from '../../context/authContext/AuthContext';
import { CartContext } from '../../context/cartContext/cartContext';
import { HiMinusCircle } from 'react-icons/hi';
import './cart.css';

export default function Cart() {
	const { user } = useContext(AuthContext).user;
	const { cart, dispatch } = useContext(CartContext);

	const resetCart = () => dispatch({ type: 'RESET_CART' });


	const handleDownload = () => {
		const zip = new JSZip();

		zip.file("README.text", "Hello, I am Catevika, developper of the ShopLineArt site - project for learning purpose. Hope you enjoy it! You can visit PEXELS original site anytime: https://www.pexels.com. You will find  the photos you just downloaded in the 'pexels-photos' folder. They are free for personal or commercial use. See here for more information: https://www.pexels.com/license/. See also the 'attributions' folder.");

		cart.forEach(item => {
			const blobPromise = fetch(item.image).then((r) => {
				if (r.status === 200) return Promise.resolve(r.blob());
				return Promise.reject(new Error(r.statusText));
			});

			zip.file(`pexels-photos/${item.id}.jpg`, blobPromise);
			zip.file(`attributions/${item.id}_author.txt`, "If you use this photo in a blog, app, e-commerce site, etc., attribution to its author or donation are not mandatory but they are always appreciated. Copy this url: " + item.authorUrl + " to insert it in your project or visit it for more information.");
		});

		zip.generateAsync({ type: "blob" }).then(content => {
			saveAs(content, "ShopLineArt.zip");
		});
		resetCart();
		localStorage.removeItem('term');
	};

	return (
		<div className='cart__container'>
			<div className='cart__wrapper'>
				<div className='cart_welcome-text'>
					<p title='Welcome'>
						Hi&nbsp;<span>{user?.username}!</span>
						{cart.length
							? "Let's check your cart:"
							: "Let's put some photos in your cart!"}
					</p>
				</div>
				{cart.length > 0 ? <button type='button' onClick={handleDownload} className='cart__zip-btn' >Download ZIP</button> : null}
				{cart.length > 0 ? <div className='cart__items-list'>
					{cart?.map((item) => {
						return (
							<div key={item.id} className='cart__item'>
								<img
									src={item.image}
									alt={item.description}
									className='cart__item-img'
								/>
								<div className='cart__item-icon-container'>
									<HiMinusCircle title='Remove from cart' className='cart__item-icon' onClick={() => dispatch({
										type: 'REMOVE_FROM_CART',
										id: item.id
									})
									} />
								</div>
								<div className='cart__item-text'>
									<p title='Author'><strong>Author:</strong> {item.author}</p>
									<p title='Description' className='cart__item-text-description'><strong>Description:</strong> {item.description}</p>
									<p title='Width'><strong>Width:</strong> {item.width} px - <strong>Height:</strong> {item.height} px</p>
								</div>
							</div>
						);
					})}
				</div> : null}
			</div>
		</div>
	);
}
