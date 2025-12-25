interface GameOverItemProps {
	label: string
	value: string | number
}

export function GameOverItem({ label, value }: GameOverItemProps) {
	return (
		<div className='p-2 text-white/90 flex items-center gap-2'>
			{label}: {value}
		</div>
	)
}
