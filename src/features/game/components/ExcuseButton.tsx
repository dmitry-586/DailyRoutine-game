import type { ExcuseType, NpcType } from '../types'
import { ExcuseTooltip } from './ExcuseTooltip'

interface ExcuseButtonProps {
	excuse: { type: ExcuseType; text: string }
	onClick: (type: ExcuseType) => void
	onHover: (type: ExcuseType | null) => void
	isHovered: boolean
	npcType: NpcType | null
}

export function ExcuseButton({
	excuse,
	onClick,
	onHover,
	isHovered,
	npcType,
}: ExcuseButtonProps) {
	return (
		<div
			className='excuse-button-wrapper'
			onMouseEnter={() => onHover(excuse.type)}
			onMouseLeave={() => onHover(null)}
		>
			<button
				type='button'
				className='excuse-button'
				onClick={() => onClick(excuse.type)}
			>
				<div className='excuse-label'>{excuse.text}</div>
				<div className='excuse-type'>{excuse.type}</div>
			</button>
			{isHovered && (
				<ExcuseTooltip excuseType={excuse.type} npcType={npcType} />
			)}
		</div>
	)
}
