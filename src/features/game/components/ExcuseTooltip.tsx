import type { ExcuseType, FactorKey, NpcType } from '../types'
import { FACTOR_LABELS } from '../utils'
import { calculateExcuseEffects } from '../utils/encounter'

interface ExcuseTooltipProps {
	excuseType: ExcuseType
	npcType: NpcType | null
}

export function ExcuseTooltip({ excuseType, npcType }: ExcuseTooltipProps) {
	if (!npcType) return null

	const npc = { type: npcType, lastExcuseType: null }
	const effects = calculateExcuseEffects(npc, excuseType)

	const effectEntries = (
		Object.entries(effects) as [FactorKey, number][]
	).filter(([, delta]) => delta !== 0)

	if (effectEntries.length === 0) return null

	return (
		<div className='excuse-tooltip'>
			<div className='excuse-tooltip-title'>Изменения факторов:</div>
			<div className='excuse-tooltip-effects'>
				{effectEntries.map(([factor, delta]) => {
					const isPositive = delta > 0
					return (
						<div
							key={factor}
							className={`excuse-tooltip-effect ${
								isPositive ? 'positive' : 'negative'
							}`}
						>
							<span className='excuse-tooltip-factor'>
								{FACTOR_LABELS[factor]}:
							</span>
							<span className='excuse-tooltip-delta'>
								{isPositive ? '+' : ''}
								{delta}
							</span>
						</div>
					)
				})}
			</div>
		</div>
	)
}
