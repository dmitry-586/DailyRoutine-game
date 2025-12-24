import { useState } from 'react'
import { useExcuses, useGameActions, useNpc } from '../hooks'
import type { ExcuseType } from '../types'
import { ExcuseButton } from './ExcuseButton'

function ExcuseChoices() {
	const excuses = useExcuses()
	const { chooseExcuse } = useGameActions()
	const npc = useNpc()
	const [hoveredExcuse, setHoveredExcuse] = useState<ExcuseType | null>(null)

	if (excuses.length === 0) {
		return (
			<div className='excuse-choices excuse-choices-empty'>
				<p>Здесь появятся варианты отмазок.</p>
			</div>
		)
	}

	return (
		<div className='excuse-choices'>
			{excuses.map(excuse => (
				<ExcuseButton
					key={excuse.type}
					excuse={excuse}
					onClick={chooseExcuse}
					onHover={setHoveredExcuse}
					isHovered={hoveredExcuse === excuse.type}
					npcType={npc?.type ?? null}
				/>
			))}
		</div>
	)
}

export default ExcuseChoices
