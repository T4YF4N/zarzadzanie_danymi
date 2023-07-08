const Skeleton = ({ className }) => {
	return (
		<div className='animate-pulse'>
			<div className={`bg-gray-600 rounded-md ${className}`}></div>
		</div>
	);
};

export default Skeleton;
