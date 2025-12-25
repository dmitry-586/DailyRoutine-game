import { useGameActions } from '@/features/game/hooks'
import { rules } from './config'

export function MainMenu() {
	const { startNewGame } = useGameActions()

	return (
		<main className='flex justify-center px-4 py-8 items-center'>
			<div className='mx-auto w-full max-w-5xl space-y-12'>
				<div className='text-center'>
					<h1 className='text-4xl font-bold max-md:text-3xl'>
						Ленивый <span className='text-primary'>Самурай</span>
					</h1>
					<p className='text-light-gray mt-2 text-lg max-md:text-base'>
						Вы — самурай, который просто хочет дойти домой. Но по дороге все
						хотят что-то от вас.
					</p>
				</div>

				<section>
					<div className='mb-8 text-center'>
						<h2 className='text-3xl font-bold max-md:text-2xl'>Правила игры</h2>
						<p className='text-light-gray mt-2 text-lg max-md:text-base'>
							Изучите основные принципы игры
						</p>
					</div>

					<div className='grid gap-6 grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1'>
						{rules.map(rule => (
							<div key={rule.title} className='bg-gray rounded-2xl px-6 py-4'>
								<div className='flex items-center gap-2'>
									<rule.emoji className='size-6 max-md:size-5' />
									<h3 className='text-lg font-medium max-md:text-base'>
										{rule.title}
									</h3>
								</div>
								<p className='text-light-gray text-sm mt-3'>
									{rule.description}
								</p>
							</div>
						))}
					</div>
				</section>

				<button
					onClick={startNewGame}
					className='flex items-center justify-center gap-3 rounded-lg bg-primary px-8 py-4 text-white text-2xl font-medium transition-colors duration-200 hover:bg-primary/80 disabled:opacity-50 cursor-pointer mx-auto max-sm:w-full max-sm:max-w-[300px]'
				>
					Начать игру
					<img
						src='/logo.svg'
						alt='logo'
						className='size-6 invert brightness-0'
					/>
				</button>
			</div>
		</main>
	)
}
