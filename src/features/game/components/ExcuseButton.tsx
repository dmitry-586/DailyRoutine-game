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
			className='flex-1 relative min-w-0'
			onMouseEnter={() => onHover(excuse.type)}
			onMouseLeave={() => onHover(null)}
		>
			<button
				type='button'
				className='w-full flex flex-col items-center justify-center gap-2.5 bg-black/75 rounded-xl border border-white/20 p-4 px-5 shadow-elevated transition-all duration-200 ease-in-out cursor-pointer min-h-28 h-full text-center hover:bg-black/75 hover:border-white/30 hover:shadow-elevated max-md:p-3.5 max-md:px-4 max-md:min-h-24'
				onClick={() => onClick(excuse.type)}
			>
				<div className='font-medium text-white/95 text-sm leading-6 break-words overflow-wrap-anywhere hyphens-auto w-full text-center'>
					{excuse.text}
				</div>
				<div className='hidden'>{excuse.type}</div>
			</button>
			{isHovered && (
				<ExcuseTooltip excuseType={excuse.type} npcType={npcType} />
			)}
		</div>
	)
}
