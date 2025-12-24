import {
	ExcuseChoices,
	FactorsPanel,
	HeroPanel,
	NpcPanel,
} from '../features/game'
import { useGameStore } from '../features/game/model/store'
import PhaserGame from '../services/phaser/phaser-game'
import { getBackgroundUrl } from '../shared/lib'

export function GameScreen() {
	const currentBackground = useGameStore(state => state.currentBackground)

	const backgroundStyle = {
		'--bg-side': `url(${getBackgroundUrl(currentBackground)})`,
	} as React.CSSProperties

	return (
		<div className='game-screen' style={backgroundStyle}>
			<div className='game-screen-canvas'>
				<PhaserGame />
				<div className='overlay overlay-factors'>
					<FactorsPanel />
				</div>
				<div className='overlay overlay-hero'>
					<HeroPanel />
				</div>
				<div className='overlay overlay-npc'>
					<NpcPanel />
				</div>
				<div className='overlay overlay-choices'>
					<ExcuseChoices />
				</div>
			</div>
		</div>
	)
}
