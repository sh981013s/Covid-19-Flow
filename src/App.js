import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import Header from './components/Header'
import Contents from './components/Contents'

function App() {
	return (
		<div className="App">
			<Header />
			{/*<Contents />*/}
		</div>
	);
}

export default App;
