import { useNpc, useNpcQuestion, useStats } from '../hooks'
import { NPC_IMAGES, NPC_LABELS } from '../utils'

function NpcPanel() {
	const npc = useNpc()
	const stats = useStats()
	const question = useNpcQuestion()

	if (!npc) {
		return (
			<div className='npc-panel npc-panel-empty'>
				<p>Нажмите «Начать игру», чтобы встретить первого NPC.</p>
			</div>
		)
	}

	const label = NPC_LABELS[npc.type]
	const image = NPC_IMAGES[npc.type]

	return (
		<div className='npc-panel npc-panel-framed'>
			<div className='npc-frame'>
				<img src={image} alt={label} className='npc-avatar-image' />
			</div>
			<div className='npc-content'>
				<div className='npc-info'>
					<div className='npc-name'>{label}</div>
					<div className='npc-meta'>Встреча #{stats.meetingsCount + 1}</div>
				</div>
				<div className='npc-text'>
					<p>
						{question ??
							`К вам обращается ${label}. Подберите удачную отмазку.`}
					</p>
				</div>
			</div>
		</div>
	)
}

export default NpcPanel
