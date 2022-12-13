import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthContextProvider } from './context/authContext/authContext';
import { CartContextProvider } from './context/cartContext/cartContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthContextProvider>
				<CartContextProvider>
					<App />
				</CartContextProvider>
			</AuthContextProvider>
		</BrowserRouter>
	</React.StrictMode>
);
