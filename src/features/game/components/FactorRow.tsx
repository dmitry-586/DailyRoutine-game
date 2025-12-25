import { getBarClassName } from '../utils'

interface FactorRowProps {
	label: string
	value: number
}

export function FactorRow({ label, value }: FactorRowProps) {
	return (
		<div className='flex flex-col gap-1.5'>
			<div className='flex justify-between items-center text-xs text-white/90 gap-2'>
				<span>{label}</span>
				<span className='font-semibold text-white tabular-nums shrink-0 min-w-8 text-right text-sm max-md:min-w-7'>
					{value}
				</span>
			</div>
			<div className='w-full h-3 rounded-full bg-white/10 overflow-hidden shadow-inset max-md:h-2.5'>
				<div
					className={`h-full transition-[width,background-color] duration-200 ease-in-out ${getBarClassName(
						value
					)}`}
					style={{ width: `${value}%` }}
				/>
			</div>
		</div>
	)
}
