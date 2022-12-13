import { createContext, useEffect, useReducer } from 'react';
import CartReducer from './cartReducer';

const INITIAL_STATE = {
	cart: JSON.parse(localStorage.getItem('cart')) || [],
	isFetching: false,
	error: false
};

export const CartContext = createContext(INITIAL_STATE);

export const CartContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(CartReducer, INITIAL_STATE);

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(state.cart));
	}, [state.cart]);

	return (
		<CartContext.Provider
			value={{
				cart: [...state.cart],
				isFetching: state.isFetching,
				error: state.error,
				dispatch
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
