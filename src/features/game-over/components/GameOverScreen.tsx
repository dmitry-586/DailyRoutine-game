import { useGameActions, useLastDefeat } from '../../game/hooks'
import { GameOverFactors } from './GameOverFactors'
import { GameOverStats } from './GameOverStats'

export function GameOverScreen() {
	const { startNewGame } = useGameActions()
	const lastDefeat = useLastDefeat()

	return (
		<div className='screen-game-over max-w-3xl w-full p-8 flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-slate-900 to-black max-md:p-6 max-md:px-4'>
			<div className='w-full max-w-xl flex flex-col gap-6 max-md:gap-6'>
				<div className='text-center mb-2'>
					<h2 className='m-0 mb-2 text-4xl font-extrabold text-status-critical max-md:text-3xl'>
						Поражение
					</h2>
					<div className='title-decoration w-30 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4 rounded-sm'></div>
				</div>

				<p className='mb-6 text-lg text-white/85 text-center p-4 bg-black/50 border border-white/10 rounded-xl max-md:mb-6'>
					{lastDefeat?.message ?? 'Один из факторов упал до нуля.'}
				</p>

				<div className='flex flex-col gap-4'>
					<GameOverFactors />
					<GameOverStats />
				</div>

				<button
					type='button'
					className='primary-button rounded-full border-none py-4 px-10 text-lg font-semibold bg-gradient-to-br from-primary-light to-primary-lighter text-white cursor-pointer transition-all duration-200 ease-in-out shadow-elevated flex items-center justify-center gap-2 hover:from-primary hover:to-primary-light hover:shadow-elevated self-center min-w-50 mt-2'
					onClick={startNewGame}
				>
					<span className='relative z-10'>Сыграть ещё</span>
					<span className='relative z-10'>↻</span>
				</button>
			</div>
		</div>
	)
}
