import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyle from './assets/styles/GlobalStyle';
import InitialPage from './pages/InitialPage';
import TimelinePage from './pages/TimelinePage';
import SignUpPage from './pages/signUpPage';

function App() {
	return (
		<>
			<GlobalStyle />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<InitialPage />} />
					<Route path="/timeline" element={<TimelinePage />} />
					<Route path='/sign-up' element={ <SignUpPage/> }/>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;