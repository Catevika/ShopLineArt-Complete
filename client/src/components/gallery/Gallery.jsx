import { useState, useEffect } from 'react';
import { searchPhotos } from '../../photo-client/Client';
import Photo from '../../components/photo/Photo';
import { GrCaretPrevious, GrCaretNext } from 'react-icons/gr';
import './gallery.css';

export default function Gallery({ term }) {
	const [searching, setSearching] = useState(false);
	const [error, setError] = useState(false);
	const [nbPages, setNbPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);
	const [gallery, setGallery] = useState([]);

	useEffect(() => {
		const getPhotos = async () => {
			try {
				setSearching(true);
				setError(false);
				const data = await searchPhotos({
					query: term,
					page: pageNumber,
					per_page: 15
				});
				setNbPages(Math.ceil(data.total_results / data.per_page));
				setGallery(data?.photos);
				setSearching(false);
			} catch (err) {
				setError(true);
				console.log(error);
			}
		};
		if (term) getPhotos();
	}, [term, pageNumber]);

	const sizes = [
		{
			id: 1,
			label: 'Medium',
			value: 'medium'
		}, {
			id: 2,
			label: 'Large',
			value: 'large'
		}, {
			id: 3,
			label: 'Large2x',
			value: 'large2x'
		}];

	const [size, setSize] = useState('large');

	const handleChange = (e) => {
		setSize(e.target.value);
	};

	return (
		<article className='gallery__container'>
			<div className='gallery__size-selector'>
				<label htmlFor="photo-size" className='photo-size-label'>Size: </label>
				<select title='Select size of photos to display' value={size} onChange={handleChange} className='photo-size-select'>
					{sizes.map((size) => (
						<option key={size.id} value={size.value} className='photo-size-option'>{size.label}</option>
					))}
				</select>
			</div>
			{!searching && !error && gallery?.length > 0 && (
				<div className='gallery__page'>
					<div className='gallery__buttons'>
						<button
							type='button'
							title='Previous page'
							className='gallery__button'
							onClick={() => setPageNumber((pageNumber) => pageNumber - 1)}
							disabled={pageNumber === 1}
						>
							<GrCaretPrevious className='gallery__icon' />
						</button>
						<button
							type='button'
							title='Next page'
							className='gallery__button'
							onClick={() => setPageNumber((pageNumber) => pageNumber + 1)}
							disabled={pageNumber === nbPages}
						>
							<GrCaretNext className='gallery__icon' />{' '}
						</button>
					</div>
					<p tile='Current page / Total page' className='gallery__page-text'>
						{' '}
						page: <span>{pageNumber}</span> / {nbPages}
					</p>
				</div>
			)}
			{term !== '' && nbPages === 0 ? <div className='error'>No matching result found. Try another term with a more detailed scope or a larger one.</div> : null}

			{
				!searching && !error && gallery?.length > 0 && (
					<ul className='gallery-wrapper'>
						{gallery?.map((photo) => {
							return (
								<li key={photo.id} className='gallery__photo'>
									<Photo photo={photo} size={size} />
								</li>
							);
						})}
					</ul>
				)}
		</article >
	);
}
