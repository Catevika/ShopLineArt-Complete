import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const loginCall = async (userCredentials, dispatch) => {
	dispatch({ type: 'LOGIN_START' });
	try {
		const { data } = await axios.post('/login', userCredentials);
		dispatch({ type: 'LOGIN_SUCCESS', payload: data });
	} catch (error) {
		dispatch({ type: 'LOGIN_FAIL', payload: error });
	}
};
