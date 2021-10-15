import { Route, Switch } from 'react-router-dom';
import { Home, About } from '../pages/index';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Contents from '../components/Contents';

function App() {
	return (
		<div className="App">
			<div className='main'>
				<Header />
				<Route exact path='/' component={Home} />
				<Switch>
					<Route path='/about/:name' component={About} />
					<Route path='/about' component={Contents} />
				</Switch>
				{/*<Contents />*/}
			</div>
			<Menu />
		</div>
	);
}


export default App;
