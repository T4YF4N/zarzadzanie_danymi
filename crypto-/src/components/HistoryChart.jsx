import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { coinColors } from './colors';
import axios from 'axios';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import Skeleton from './Skeleton';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend
);

const HistoryChart = () => {
	const { id } = useParams();
	const [timeRange, setTimeRange] = useState('30'); // Default time range (30 days)
	const [response, setResponse] = useState(null);
	const [coinImage, setCoinImage] = useState(null);

	const fetchData = async () => {
		try {
			const result = await axios.get(
				`coins/${id}/market_chart?vs_currency=usd&days=${timeRange}`
			);
			setResponse(result.data);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	const fetchCoinImage = async () => {
		try {
			const result = await axios.get(
				`coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&sparkline=false`
			);
			setCoinImage(result.data.image.large);
		} catch (error) {
			console.error('Error fetching coin image:', error);
		}
	};

	const handleTimeRangeChange = (range) => {
		setTimeRange(range);
	};

	useEffect(() => {
		fetchData();
		fetchCoinImage();
	}, [timeRange, id]);

	if (!response || !coinImage) {
		return (
			<div className='wrapper-container mt-8'>
				<Skeleton className='h-72 w-full mb-10' />
			</div>
		);
	}

	const coinChartData = response.prices.map((value) => ({
		x: value[0],
		y: value[1].toFixed(2),
	}));

	const options = {
		responsive: true,
		scales: {
			y: {
				grid: {
					color: 'white', // Kolor linii siatki w osi Y
				},
			},
		},
		plugins: {
			legend: {
				labels: {
					color: 'white', // Kolor etykiet legendy
				},
			},
		},
	};

	const getBorderColor = (coinId) => {
		// Color mapping for different cryptocurrencies
		return coinColors[coinId] || coinColors.default;
	};

	const data = {
		labels: coinChartData.map((value) => moment(value.x).format('MMM DD')),
		datasets: [
			{
				fill: true,
				label: id,
				data: coinChartData.map((val) => val.y),
				borderColor: getBorderColor(id),
				backgroundColor: 'transparent',
			},
		],
	};

	const chartContainerStyle = {
		position: 'relative',
		width: '100%',
		height: '100%',
	};

	const chartBackgroundStyle = {
		position: 'relative',
		width: '100%',
		height: '100%',
	};

	const chartBackgroundOverlayStyle = {
		content: '""',
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		backgroundImage: `url(${coinImage})`,
		opacity: 0.3, // Przezroczystość tła obrazu
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
	};
	return (
		<div>
			<div className='button-group'>
				<button
					className={`button ${timeRange === '30' ? 'active' : ''}`}
					onClick={() => handleTimeRangeChange('30')}
				>
					Month
				</button>
				<button
					className={`button ${timeRange === '180' ? 'active' : ''}`}
					onClick={() => handleTimeRangeChange('180')}
				>
					6 Months
				</button>
				<button
					className={`button ${timeRange === '365' ? 'active' : ''}`}
					onClick={() => handleTimeRangeChange('365')}
				>
					Year
				</button>
			</div>
			<div style={chartContainerStyle}>
				<div style={chartBackgroundStyle}>
					<div style={chartBackgroundOverlayStyle}></div>{' '}
					{/* Dodany div dla tła */}
					<Line options={options} data={data} />
				</div>
			</div>
		</div>
	);
};

export default HistoryChart;
