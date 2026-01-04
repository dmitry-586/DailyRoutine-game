import { GameHUD } from '@/features/game'
import PhaserGame from '../services/phaser/phaser-game'

export function GameScreen() {
	return (
		<section className='w-screen h-screen max-w-3xl mx-auto flex justify-between relative'>
			<PhaserGame />
			<GameHUD />
		</section>
	)
}
