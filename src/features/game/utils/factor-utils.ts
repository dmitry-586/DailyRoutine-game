import type { FactorKey } from '../types'

export const FACTOR_LABELS: Record<FactorKey, string> = {
	reputation: 'Репутация',
	respect: 'Уважение',
	health: 'Здоровье',
	spirit: 'Дух',
}

export const FACTOR_CONFIGS: Array<{ key: FactorKey; label: string }> = [
	{ key: 'reputation', label: FACTOR_LABELS.reputation },
	{ key: 'respect', label: FACTOR_LABELS.respect },
	{ key: 'health', label: FACTOR_LABELS.health },
	{ key: 'spirit', label: FACTOR_LABELS.spirit },
]

export const getBarClassName = (value: number): string => {
	if (value <= 20) return 'factor-bar-critical'
	if (value <= 40) return 'factor-bar-low'
	if (value <= 70) return 'factor-bar-medium'
	if (value <= 90) return 'factor-bar-high'
	return 'factor-bar-max'
}
