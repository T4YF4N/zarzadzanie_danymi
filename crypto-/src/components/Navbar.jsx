import { useNavigate } from 'react-router-dom';

const Navbar = () => {
	const navigate = useNavigate();

	return (
		<div className='navcrypto'>
			<div className='wrapper-container w-full'>
				<div
					className='flex items-center gap-1 cursor-pointer'
					onClick={() => navigate('/')}
				>
					<p className='font-semibold'>
						Cryptocurrency
						<span className='text-blue-500'>DATA</span>
						agregator
					</p>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
