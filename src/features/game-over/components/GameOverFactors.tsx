import { useFactors } from '../../game/hooks'
import { FACTOR_CONFIGS } from '../../game/utils'
import { GameOverItem } from './GameOverItem'

export function GameOverFactors() {
	const factors = useFactors()

	return (
		<div className='game-over-factors grid grid-cols-2 gap-3 gap-x-6 text-base p-5 bg-black/60 border border-white/15 rounded-xl shadow-elevated max-md:grid-cols-1 max-md:gap-2 max-md:p-4'>
			{FACTOR_CONFIGS.map(factor => (
				<GameOverItem
					key={factor.key}
					label={factor.label}
					value={factors[factor.key]}
				/>
			))}
		</div>
	)
}
