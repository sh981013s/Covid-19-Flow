import { Route, Switch } from 'react-router-dom';
import { Home, About } from '../pages/index';
import Header from '../components/Header';
import Contents from '../components/Contents';

function App() {
	return (
		<div className="App">
			<Header />
			<Route exact path='/' component={Home} />
			<Switch>
				<Route path='/about/:name' component={About} />
				<Route path='/about' component={About} />
			</Switch>
			{/*<Contents />*/}
		</div>
	);
}


export default App;
