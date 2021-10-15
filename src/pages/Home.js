import mainImg from '../resources/images/mainImg.png';

const Home = () => {
	return (
		<div className='homeBox'>
			<div className='homBoxCard'>
				<div className='homeBoxImg'>
					<img src={ mainImg } alt='' />
				</div>
				<p>Covid-19 Flow</p>
				<p className='smDesc'>by SeungHwan (Jason) Lee</p>
			</div>


		</div>
	)
}

export default Home;