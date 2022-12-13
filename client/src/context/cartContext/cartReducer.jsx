export const initialState = {
	cart: [],
	user: null,
	isFetching: true,
	error: false
};

const CartReducer = (state, action) => {
	console.log(action);
	switch (action.type) {
		case 'ADD_TO_CART':
			return {
				...state,
				cart: [...state.cart, action.item],
				isFetching: false,
				error: false
			};

		case 'RESET_CART':
			return {
				...state,
				cart: [],
				isFetching: false,
				error: false
			};

		case 'REMOVE_FROM_CART':
			const index = state.cart.findIndex(
				(cartItem) => cartItem.id === action.id
			);
			let newCart = [...state.cart];

			if (index >= 0) {
				newCart.splice(index, 1);
			} else {
				console.warn(
					`Cant remove photo (id: ${action.id}) as its not in cart!`
				);
			}
			return {
				...state,
				cart: newCart,
				isFetching: false,
				error: false
			};

		default:
			return state;
	}
};

export default CartReducer;
