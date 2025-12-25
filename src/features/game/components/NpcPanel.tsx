import { useNpc, useNpcQuestion, useStats } from '../hooks'
import { NPC_IMAGES, NPC_LABELS } from '../utils'

export function NpcPanel() {
	const npc = useNpc()
	const stats = useStats()
	const question = useNpcQuestion()

	if (!npc) {
		return (
			<div className='py-3 px-4 rounded-xl bg-black/30 border border-white/6 w-full'>
				<p>Нажмите «Начать игру», чтобы встретить первого NPC.</p>
			</div>
		)
	}

	const label = NPC_LABELS[npc.type]
	const image = NPC_IMAGES[npc.type]

	return (
		<div className='flex items-start gap-4 p-4 bg-black/75 border border-white/15 rounded-xl shadow-elevated w-full max-md:p-3 max-md:gap-3'>
			<div className='shrink-0 w-30 h-40 rounded-xl overflow-hidden bg-black/60 max-md:w-20 max-md:h-25'>
				<img
					src={image}
					alt={label}
					className='block w-full h-full object-contain object-center-bottom'
				/>
			</div>
			<div className='flex flex-col flex-1 gap-2.5 min-w-0'>
				<div className='flex flex-col'>
					<div className='font-semibold text-white/95 text-lg leading-tight max-md:text-sm'>
						{label}
					</div>
					<div className='text-xs opacity-70 text-white/70 mt-0.5'>
						Встреча #{stats.meetingsCount + 1}
					</div>
				</div>
				<div className='text-sm opacity-90 text-white/90 leading-6 mt-1'>
					<p className='m-0'>
						{question ??
							`К вам обращается ${label}. Подберите удачную отмазку.`}
					</p>
				</div>
			</div>
		</div>
	)
}
