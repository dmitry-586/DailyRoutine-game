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
		<div className='excuse-tooltip absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-black/95 border border-white/20 rounded-lg p-3 min-w-50 shadow-elevated z-50 pointer-events-none'>
			<div className='text-xs font-semibold mb-2 text-white/90 uppercase tracking-wide'>
				Изменения факторов:
			</div>
			<div className='flex flex-col gap-1'>
				{effectEntries.map(([factor, delta]) => {
					const isPositive = delta > 0
					return (
						<div
							key={factor}
							className='flex justify-between items-center text-sm py-1'
						>
							<span className='text-white/80'>{FACTOR_LABELS[factor]}:</span>
							<span
								className={`font-semibold ${
									isPositive ? 'text-effect-positive' : 'text-effect-negative'
								}`}
							>
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
