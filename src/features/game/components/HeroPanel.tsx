export function HeroPanel() {
	return (
		<div className='flex items-center gap-4 p-4 px-5 bg-black/75 border border-white/15 rounded-xl shadow-elevated w-full max-md:p-3 max-md:gap-3'>
			<div className='shrink-0 w-30 h-30 rounded-xl overflow-hidden bg-black/60 max-md:w-20 max-md:h-20'>
				<img
					src='/assets/samurai/samurai.png'
					alt='Ленивый самурай'
					className='block w-full h-full object-cover'
				/>
			</div>
			<div className='flex flex-col gap-1 flex-1 min-w-0'>
				<div className='font-semibold text-white/95 text-sm leading-tight'>
					Ленивый самурай
				</div>
				<div className='text-xs opacity-75 text-white/75'>Главный герой</div>
			</div>
		</div>
	)
}
