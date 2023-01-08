import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyle from './assets/styles/GlobalStyle';
import SignInPage from './pages/signInPage';
import SignUpPage from './pages/signUpPage';
import TimelinePage from './pages/TimelinePage';
import TrandingPage from './pages/TrandingPage';
import UserPage from './pages/UserPage';

function App() {
	return (
		<>
			<GlobalStyle />
			<BrowserRouter>
				<Routes>
					<Route path='/user/:id' element={<UserPage />} />
				    <Route path='/hashtag/:hashtag' element={<TrandingPage/>} /> 
					<Route path='/timeline' element={<TimelinePage />} />
					<Route path='/sign-up' element={ <SignUpPage/> }/>
					<Route path='/' element={<SignInPage/>} /> 
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
