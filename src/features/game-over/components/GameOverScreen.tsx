import { useGameActions, useLastDefeat } from '../../game/hooks'
import { GameOverFactors } from './GameOverFactors'
import { GameOverStats } from './GameOverStats'

function GameOverScreen() {
	const { startNewGame } = useGameActions()
	const lastDefeat = useLastDefeat()

	return (
		<div className='screen screen-game-over'>
			<div className='game-over-content'>
				<div className='game-over-header'>
					<h2>Поражение</h2>
					<div className='title-decoration'></div>
				</div>

				<p className='game-over-reason'>
					{lastDefeat?.message ?? 'Один из факторов упал до нуля.'}
				</p>

				<div className='game-over-data'>
					<GameOverFactors />
					<GameOverStats />
				</div>

				<button
					type='button'
					className='primary-button game-over-button'
					onClick={startNewGame}
				>
					<span className='button-text'>Сыграть ещё</span>
					<span className='button-arrow'>↻</span>
				</button>
			</div>
		</div>
	)
}

export default GameOverScreen
