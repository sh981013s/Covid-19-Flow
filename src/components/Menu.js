import { Link } from 'react-router-dom';

const Menu = () => {
	return (
		<div className="menu">
			<ul>
				<li><Link to='/'>Home</Link></li>
				<li><Link to='/about'>국내 지표</Link></li>
				<li><a href="#">해외 지표</a></li>
			</ul>
		</div>
	)
}

export default Menu;