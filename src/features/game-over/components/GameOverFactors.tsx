import { useFactors } from '../../game/hooks'
import { FACTOR_LABELS } from '../../game/utils'

export function GameOverFactors() {
	const factors = useFactors()

	return (
		<div className='game-over-factors'>
			<div>
				{FACTOR_LABELS.reputation}: {factors.reputation}
			</div>
			<div>
				{FACTOR_LABELS.respect}: {factors.respect}
			</div>
			<div>
				{FACTOR_LABELS.health}: {factors.health}
			</div>
			<div>
				{FACTOR_LABELS.spirit}: {factors.spirit}
			</div>
		</div>
	)
}
