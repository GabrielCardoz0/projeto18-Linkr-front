import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyle from './assets/styles/GlobalStyle';
import InitialPage from './pages/InitialPage';

function App() {
	return (
		<>
			<GlobalStyle />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<InitialPage />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;