import imgUrl from '../../assets/logo.png';
import { AiFillDatabase } from 'react-icons/ai';
import { BiSearchAlt } from 'react-icons/bi';
import { BsFileZipFill } from 'react-icons/bs';
import { FaCartArrowDown } from 'react-icons/fa';
import { FaMobileAlt } from 'react-icons/fa';
import './about.css';

export default function About() {
	return (
		<section className='about__container'>
			<div className='about__wrapper'>
				<h1 className='about__title'><span>About </span> ShopLineArt</h1>
				<div className='about__card'>
					<p className='about__item-text small'><span>Author</span> Dominique Bello, also known as <strong>Catevika</strong></p>
				</div>
				<div className='about__card'>
					<p className='about__item-text small'><span>Development</span> Nov. - Dec. <strong>2022</strong></p>
				</div>
				<div className='about__card'>
					<p><span>Source</span></p>
					<p className='about__item-text small'><span>PEXELS</span> is among the best <strong>free stock photos, royalty free images & videos</strong> shared by creators</p>
				</div>
				<div className='about__card'>
					<p><span>Project</span></p>
					<p className='about__item-text small'> ShopLineArt is a <strong>custom version</strong> of the services it offers at a <strong>photography</strong> level for <strong>learning purpose</strong></p>
				</div>
				<div className='about__card'>
					<p><span>Techniques</span></p>
					<ul>
						<li className='about__item'>
							<FaMobileAlt className='about__icon' />
							<p className='about__item-text'>Fully <strong>responsive</strong> format starting from <strong>280px</strong> wide</p>
						</li>
						<li className='about__item'>
							<AiFillDatabase className='about__icon' />
							<p className='about__item-text'><strong>Tests database</strong> Fake credentials allowed</p>
						</li>
						<li className='about__item'>
							<BiSearchAlt className='about__icon' />
							<p className='about__item-text'><strong>Search bar</strong> to find amaizing photos</p>
						</li>
						<li className='about__item'>
							<FaCartArrowDown className='about__icon' />
							<p className='about__item-text'><strong>Cart</strong> to retreive the selected photos</p>
						</li>
						<li className='about__item'>
							<BsFileZipFill className='about__icon' />
							<p className='about__item-text'>Photos<strong> download</strong> via ZIP file</p></li>
					</ul>
				</div>
				<img src={imgUrl} alt="" className='about__container-image' />
			</div>
		</section >
	);
}
