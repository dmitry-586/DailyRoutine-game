import { useFactors } from '../hooks'
import { FACTOR_CONFIGS } from '../utils'
import { FactorRow } from './FactorRow'

function FactorsPanel() {
	const factors = useFactors()

	return (
		<div className='factors-panel'>
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

export default FactorsPanel
