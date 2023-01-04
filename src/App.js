import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyle from './assets/styles/GlobalStyle';
import InitialPage from './pages/InitialPage';
<<<<<<< HEAD
import TimelinePage from './pages/TimelinePage';
=======
import SignUpPage from './pages/signUpPage';
>>>>>>> a7bdad7b6f7429d8d9f8b3684159ada3e3b95552

function App() {
	return (
		<>
			<GlobalStyle />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<InitialPage />} />
<<<<<<< HEAD
					<Route path="/timeline" element={<TimelinePage />} />
=======
					<Route path='/sign-up' element={ <SignUpPage/> }/>
>>>>>>> a7bdad7b6f7429d8d9f8b3684159ada3e3b95552
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;