import { useContext, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AuthContext } from './context/authContext/authContext';
import { ThemeContext } from './context/themeContext/themeContext';
import BasicLayout from './components/basicLayout/BasicLayout';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Cart from './pages/cart/Cart';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Contact from './pages/contact/Contact';
import ErrorPage from './pages/error/Error';
import NoMatch from './pages/noMatch/NoMatch';
import './app.css';


function App() {
	const { user } = useContext(AuthContext);
	const location = useLocation();

	const [theme, setTheme] = useState(null);

	const toggleTheme = () => {
		setTheme(!theme);
	};

	useEffect(() => {
		if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
			return;
		}
		toggleTheme();
	}, []);


	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			<div className='app' id={theme ? 'day' : 'night'}>
				{/* {location.pathname === '/home' ? */} <button type='button' id='app__theme-toggle' onClick={toggleTheme} title={theme === true ? 'Switch to dark theme' : 'Switch to light theme'}>
					<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 472.39 472.39">
						<g className='toggle-sun'>
							<path d="M403.21,167V69.18H305.38L236.2,0,167,69.18H69.18V167L0,236.2l69.18,69.18v97.83H167l69.18,69.18,69.18-69.18h97.83V305.38l69.18-69.18Zm-167,198.17a129,129,0,1,1,129-129A129,129,0,0,1,236.2,365.19Z" />
						</g>
						<g className='toggle-circle'>
							<circle className="cls-1" cx="236.2" cy="236.2" r="103.78" />
						</g>
					</svg>
				</button> {/* : null} */}
				<Routes>
					<Route path='/' element={<BasicLayout />} end>
						<Route
							path='register'
							element={user ? <Navigate to='/home' replace={true} /> : <Register />}
						/>
						<Route
							path='login'
							element={user ? <Navigate to='/home' replace={true} /> : <Login />}
						/>
						<Route path='home' element={<Home />} />
						<Route path='about' element={<About />} />
						<Route path='cart' element={user ? <Cart /> : <Login />} />
						<Route path='contact' element={<Contact />} />
						<Route path='error' element={<ErrorPage />} />
					</Route>
					<Route path='*' element={<NoMatch />} />
				</Routes>
			</div>
		</ThemeContext.Provider>
	);
}

export default App;
