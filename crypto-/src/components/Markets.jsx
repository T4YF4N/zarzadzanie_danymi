import { useState, useEffect } from 'react';
import axios from 'axios';
import Coin from './Coin';
import Skeleton from './Skeleton';

const Markets = () => {
	const [coin, setCoin] = useState(100);
	const [response, setResponse] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchData = async () => {
		try {
			const result = await axios.get(
				`coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${coin}&page=1&sparkline=false`
			);
			setResponse(result.data);
			setLoading(false);
		} catch (error) {
			console.error(error);
		}
	};

	const handleChangeCoin = (newCoin) => {
		setCoin(newCoin);
	};

	useEffect(() => {
		fetchData();
	}, [coin]);

	if (loading) {
		return (
			<div className='wrapper-container mt-10'>
				<Skeleton className='h-8 w-32' />
				<Skeleton className='h-8 w-full mt-2' />
				<Skeleton className='h-8 w-full mt-2' />
				<Skeleton className='h-8 w-full mt-2' />
				<Skeleton className='h-8 w-full mt-2' />
				<Skeleton className='h-8 w-full mt-2' />
				<Skeleton className='h-8 w-full mt-2' />
				<Skeleton className='h-8 w-full mt-2' />
			</div>
		);
	}

	return (
		<section className='mt-10'>
			<h1 className='text-2xl mb-2'>Markets</h1>
			<div className='button-group'>
				<button className='button' onClick={() => handleChangeCoin(10)}>
					10
				</button>
				<button className='button' onClick={() => handleChangeCoin(20)}>
					20
				</button>
				<button className='button' onClick={() => handleChangeCoin(100)}>
					100
				</button>
			</div>
			{response.map((coin) => (
				<Coin key={coin.id} coin={coin} />
			))}
		</section>
	);
};

export default Markets;
