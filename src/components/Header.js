import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';


const Header = () => {

	const [toggle, setToggle] = useState(false);


	return (
		<header className='header'>
			<h1>COVID-19 Flow</h1>
			<div className={toggle ? 'toggle active' : 'toggle'} onClick={()=> {
				setToggle(!toggle);
				const main = document.querySelector('.main')
				if (main.classList.contains('active') === false) {
					main.classList.add('active');
				} else {
					main.classList.remove('active');
				}
			}} />
			{/*<select>*/}
			{/*	<option  ><Link to='/domestic' >asdasda</Link></option>*/}
			{/*	<option value=''>세계</option>*/}
			{/*</select>*/}

		</header>
	)
}

export default Header