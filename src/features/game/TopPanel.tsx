export function TopPanel() {
	return (
		<section className='flex justify-between items-center'>
			<div className='flex flex-col gap-1 items-center'>
				<p className='text-sm text-light-gray'>Раунд</p>
				<div className='text-xl font-bold'>1 / 3</div>
			</div>
			<div className='flex flex-col gap-1 items-center'>
				<p className='text-sm text-light-gray'>Счет</p>
				<div className='text-xl font-bold'>0 : 0</div>
			</div>

			<div className='px-4 py-2 bg-green-500 rounded text-white'>Ваш ход</div>
		</section>
	)
}
