import { useEffect, useState } from 'react';
import { Bar, Doughnut, Line, defaults } from 'react-chartjs-2'
import axios from 'axios';
import moment from 'moment';
import useInterval from 'use-interval';


defaults.color = 'white';
defaults.backgroundColor = 'rgb(255,255,255)';

const Contents = () => {


	const [confirmedData, setConfirmedData] = useState({})
	const [quarantinedData, setQuarantinedData] =useState({})
	const [comparedData, setComparedData] = useState({})


	useEffect(() => {
		const fetchEvents = async () => {
			const res = await axios.get('https://api.covid19api.com/total/dayone/country/kr');
			const todayConfirmed = await (res.data[res.data.length -1].Confirmed) - (res.data[res.data.length -2].Confirmed);
			console.log(res.data);
			makeData(res.data)

			const today = res.data[res.data.length -1];
			console.log(today.Date, today.Confirmed);


		}
		const makeData = (items) => {
			const arr = items.reduce((acc, cur) => {
				const currentDate = new Date(cur.Date);
				const year = currentDate.getFullYear();
				const month = currentDate.getMonth();
				const date = currentDate.getDate();
				const confirmed = cur.Confirmed;
				const active = cur.Active;
				const death = cur.Deaths;
				const recovered = cur.Recovered;

				const findItem = acc.find(a => a.year === year && a.month === month)

				if(!findItem) {
					acc.push({ year, month, date, confirmed, active, death, recovered });
				}
				if(findItem && findItem.date < date) {
					findItem.active = active;
					findItem.death = death;
					findItem.date = date;
					findItem.year = year;
					findItem.month = month;
					findItem.recovered = recovered;
					findItem.confirmed = confirmed;

				}

				// console.log(cur);
				return acc;
			}, [])

			const labels = arr.map(a=> `${a.month+1}월`)
			setConfirmedData({
				labels: labels,
				datasets: [
					{
						label: '국내 누적	확진자',
						fontColor: 'black',
						backgroundColor: 'salmon',
						fill: true,
						data: arr.map(a => a.confirmed)

					}
				]
			});
			setQuarantinedData({
				labels: labels,
				datasets: [
					{
						label: '월별 격리자 현황',
						borderColor: 'salmon',
						fill: false,
						data: arr.map(a => a.active)

					}
				]
			});
			const last = arr[arr.length - 1];
			setComparedData({
				labels: ["확진자", '격리해제', '사망'],
				datasets: [
					{
						label: '누적 확진, 해제, 사망 비율',
						backgroundColor: ['#ff3d67', '#059bff', '#ffc233'],
						borderColor: ['#ff3d67', '#059bff', '#ffc233'],
						fill: false,
						data: [last.confirmed, last.recovered, last.death]

					}
				]
			});

		}
		fetchEvents();
	}, [])

	const localTime = moment().format('YYYY-MM-DD HH-mm-ss'); // store localTime
	const proposedDate = localTime + "T00:00:00.000Z";


	const [realTime, setRealTime] = useState(Date.now());

	// useInterval
	useInterval(() => {
		setRealTime(Date.now());
	}, 1000);


	// let lolol = realTime.seconds();
	// console.log(lolol);

	return (
		<section>
			<h2>국내 코로나 현황</h2>
			<div className='contents'>
				<div>
					<Bar
						data={ confirmedData }
						options={
						{ title: { display: true, text: '누적 확진자 추이', fontSize: 16 } },
						{ legend: { display: true, position: 'bottom' } }
						}
					/>
				</div>
				<div>
					<Line data={ quarantinedData } options={
						{ title: { display: true, text: '월별 격리자 현황', fontSize: 16 } },
					{ legend: { display: true, position: 'bottom' } }
					} />
				</div>
				<div>
					<Doughnut data={ comparedData } options={
						{ title: { display: true, text: `누적, 확진, 해제, 사망 ${new Date().getMonth()}`, fontSize: 16 } },
					{ legend: { display: true, position: 'bottom' } }
					} />
				</div>
			</div>
			<div>{localTime}</div>
		</section>
	)
}

export default Contents