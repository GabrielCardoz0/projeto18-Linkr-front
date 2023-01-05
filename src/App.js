import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyle from './assets/styles/GlobalStyle';
import SignInPage from './pages/signInPage';
import SignUpPage from './pages/signUpPage';
import TimelinePage from './pages/TimelinePage';


function App() {
	return (
		<>
			<GlobalStyle />
			<BrowserRouter>
				<Routes>
					<Route path='/timeline' element={<TimelinePage />} />
					<Route path='/sign-up' element={ <SignUpPage/> }/>
					<Route path='/' element={<SignInPage/>} /> 
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
