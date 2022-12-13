import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import imgUrl from '../../assets/logo.png';
import './contact.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Contact() {
	const form = useRef();

	const sendEmail = (e) => {
		e.preventDefault();

		emailjs.sendForm(import.meta.env.VITE_EMAILJS_SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_ID, form.current, import.meta.env.VITE_EMAILJS_PUBLIC_KEY)
			.then((result) => {
				console.log(result.text);
				toast.success('Email sent successfully', {
					theme: "dark"
				}, {
					position: toast.POSITION.BOTTOM_CENTER
				});
			}, (error) => {
				console.log(error.text);
				toast.error('Email sending failed', {
					theme: "dark"
				}, {
					position: toast.POSITION.BOTTOM_CENTER
				});
			});

		form.current.reset();
	};

	return (
		<div className='form__container'>
			<form ref={form} className='form__wrapper' onSubmit={sendEmail}>
				<p title='Contact us' className='form__text'>Contact us:</p>
				<div className='form__group'>
					<label title='Full name' htmlFor='username'>
						Full name
					</label>
					<input
						type='text'
						name='username'
						title='Full name input'
						min={3}
						max={20}
						required
						placeholder='Full name'
						autoComplete='username'
						autoFocus={true}
						className='form__input'
					/>
				</div>
				<div className='form__group'>
					<label title='Email' htmlFor='email'>
						Email
					</label>
					<input
						type='email'
						name='email'
						title='Email input'
						max={20}
						required
						placeholder='Email'
						autoComplete='email'
						className='form__input'
					/>
				</div>
				<div className='form__group'>
					<label title='Full name' htmlFor='username'>
						Subject
					</label>
					<input
						type='text'
						name='subject'
						title='Subject input'
						min={3}
						max={50}
						required
						placeholder='Subject'
						className='form__input'
					/>
				</div>
				<div className='form__group'>
					<label title='message' htmlFor='message'>
						Message
					</label>
					<textarea
						name='message'
						title='Message'
						placeholder='Your message'
						className='form__input textarea'
					></textarea>
				</div>
				<button title='Send' type='submit' className='form__btn'>
					Send
				</button>
				<ToastContainer />
			</form>
			<img src={imgUrl} alt="" className='form__container-image' />
		</div>
	);
}
