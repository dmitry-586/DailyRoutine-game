import { MainMenu } from '@/features/menu'
import '../App.css'
import { GameOverScreen } from '../features/game-over'
import { useGamePhase } from '../features/game/hooks'
import { GameScreen } from './GameScreen'

function App() {
	const phase = useGamePhase()

	return (
		<div className='flex flex-col min-h-screen w-full'>
			<main className='flex-1 flex justify-center items-stretch pb-6'>
				{phase === 'menu' && <MainMenu />}
				{phase === 'gameOver' && <GameOverScreen />}
				{phase === 'playing' && <GameScreen />}
			</main>
		</div>
	)
}

export default App
