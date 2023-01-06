import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyle from './assets/styles/GlobalStyle';
import HashtagPage from './pages/HashtagPage';
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
					<Route path='/timeline' element={<TimelinePage/>} /> 
					<Route path='/hashtag/:hashtag' element={<HashtagPage/>} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
