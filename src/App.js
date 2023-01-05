import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyle from './assets/styles/GlobalStyle';
import InitialPage from './pages/InitialPage';
import SignInPage from './pages/signInPage';
import SignUpPage from './pages/signUpPage';

function App() {
	return (
		<>
			<GlobalStyle />
			<BrowserRouter>
				<Routes>
					<Route path='/timeline' element={<TimelinePage />} />
					<Route path="/initial-page" element={<InitialPage />} />
					<Route path='/sign-up' element={ <SignUpPage/> }/>
					<Route path='/' element={<SignInPage/>} /> 
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
