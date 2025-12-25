import { useState } from 'react'
import { useExcuses, useGameActions, useNpc } from '../hooks'
import type { ExcuseType } from '../types'
import { ExcuseButton } from './ExcuseButton'

export function ExcuseChoices() {
	const excuses = useExcuses()
	const { chooseExcuse } = useGameActions()
	const npc = useNpc()
	const [hoveredExcuse, setHoveredExcuse] = useState<ExcuseType | null>(null)

	if (excuses.length === 0) {
		return (
			<div className='flex gap-3.5 relative flex-nowrap w-full max-md:gap-2'>
				<p>Здесь появятся варианты отмазок.</p>
			</div>
		)
	}

	return (
		<div className='flex gap-3.5 relative flex-nowrap w-full max-md:gap-2'>
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
