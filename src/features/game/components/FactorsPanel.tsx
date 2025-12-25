import { useFactors } from '../hooks'
import { FACTOR_CONFIGS } from '../utils'
import { FactorRow } from './FactorRow'

export function FactorsPanel() {
	const factors = useFactors()

	return (
		<div className='flex flex-col gap-2.5 p-3.5 px-4 bg-black/75 border border-white/15 rounded-xl shadow-elevated w-full max-md:p-3 max-md:gap-2.5'>
			{FACTOR_CONFIGS.map(factor => (
				<FactorRow
					key={factor.key}
					label={factor.label}
					value={factors[factor.key]}
				/>
			))}
		</div>
	)
}
