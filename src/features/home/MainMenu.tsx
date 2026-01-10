export interface MainMenuProps {
	onStart: () => void
}

export function MainMenu({ onStart }: MainMenuProps) {
	return (
		<div className='flex justify-center px-4 py-8'>
			<div className='w-full space-y-10'>
				<div className='text-center'>
					<h1 className='text-4xl font-bold'>
						Битва <span className='text-primary'>Кланов</span>
					</h1>
					<p className='text-light-gray mt-2 text-lg'>
						Карточная игра с NPC-самураями
					</p>
				</div>

				<div className='bg-gray rounded-2xl p-6 max-w-xl mx-auto'>
					<h2 className='text-2xl font-bold mb-4'>Правила игры</h2>
					<ul className='space-y-2 text-light-gray'>
						<li> - Выиграйте 3 раунда, чтобы победить в игре</li>
						<li> - Каждый раунд: выложите 2 карты на любую позицию</li>
						<li> - Побеждает тот, кто выиграл 2+ позиции в раунде</li>
						<li> - Синергии: 2+ карты одной категории дают бонус</li>
					</ul>
				</div>

				<button
					onClick={onStart}
					className='flex items-center justify-center gap-3 rounded-lg bg-primary px-8 py-4 text-2xl font-medium transition-colors duration-200 hover:bg-primary/80 cursor-pointer mx-auto'
				>
					Начать игру
					<img
						src='/logo.svg'
						alt='logo'
						className='size-6 invert brightness-0'
					/>
				</button>
			</div>
		</div>
	)
}
