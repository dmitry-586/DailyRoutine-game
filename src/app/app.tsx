import '../App.css'
import { GameOverScreen } from '../features/game-over'
import { useGamePhase } from '../features/game/hooks'
import { MainMenu } from '../features/menu'
import { GameScreen } from './GameScreen'

function App() {
	const phase = useGamePhase()

	return (
		<div className='app-root'>
			<main className='app-main'>
				{phase === 'menu' && <MainMenu />}
				{phase === 'gameOver' && <GameOverScreen />}
				{phase === 'playing' && <GameScreen />}
			</main>
		</div>
	)
}

export default App
