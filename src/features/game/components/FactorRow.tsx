import { getBarClassName } from '../utils'

interface FactorRowProps {
	label: string
	value: number
}

export function FactorRow({ label, value }: FactorRowProps) {
	return (
		<div className='factor-row'>
			<div className='factor-label'>
				<span>{label}</span>
				<span className='factor-value'>{value}</span>
			</div>
			<div className='factor-bar-track'>
				<div
					className={getBarClassName(value)}
					style={{ width: `${value}%` }}
				/>
			</div>
		</div>
	)
}
