import { Link } from 'react-router-dom';
import { TrendingDown, TrendingUp } from '../icons/icons';
import { currencyFormat } from '../utils';

const Coin = ({ coin }) => {
	console.log(coin);
	return (
		<Link to={`/coin/${coin.id}`}>
			<div className='grid grid-cols-4 sm:grid-cols-4 font-light p-4 rounded border-gray-200 border-b hover:bg-cyan-900'>
				<div className='flex items-center gap-1 w-full'>
					<img className='w-6' src={coin.image} alt={coin.name} />
					<p>{coin.name}</p>
					<span className='text-xs'>({coin.symbol})</span>
				</div>
				<div className='hidden sm:block'>
					<p className='font-semibold'>Current price</p>
					<span>{currencyFormat(coin.current_price)}</span>
				</div>
				<div className='hidden sm:block'>
					<p className='font-semibold'>Change</p>
					<span
						className={`flex gap-1 ${
							coin.price_change_percentage_24h < 0
								? 'text-red-600 font-bold'
								: 'text-green-600 font-bold'
						}`}
					>
						{coin.price_change_percentage_24h < 0 ? (
							<TrendingDown />
						) : (
							<TrendingUp />
						)}
						{coin.price_change_percentage_24h} %
					</span>
				</div>
				<div className='hidden sm:block'>
					<p className='font-semibold'>Market Cap</p>
					<span>{currencyFormat(coin.market_cap)}</span>
				</div>
			</div>
		</Link>
	);
};

export default Coin;
