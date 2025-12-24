import type { ExcuseDefinition, FactorKey, NpcType } from '../types'

export const INITIAL_FACTOR_VALUE = 50
export const MIN_FACTOR_VALUE = 0
export const MAX_FACTOR_VALUE = 100

export const CRITICAL_LOW_THRESHOLD = 20
export const DRAIN_THRESHOLD = 10
export const TARGET_ATTACK_THRESHOLD = 5

export const SUCCESS_STREAK_BONUS_THRESHOLD = 3
export const FAILURE_STREAK_PENALTY_THRESHOLD = 2

export const SUCCESS_STREAK_BONUS_VALUE = 10
export const FAILURE_STREAK_PENALTY_VALUE = -5

export const EXCUSE_DEFINITIONS: Record<
	ExcuseDefinition['id'],
	ExcuseDefinition
> = {
	polite: {
		id: 'polite',
		label: 'Вежливая',
		description: 'Идеальна для Сэнсэя',
		effects: [
			{ factor: 'respect', delta: 10 },
			{ factor: 'reputation', delta: 5 },
			{ factor: 'spirit', delta: -3 },
		],
	},
	respectful: {
		id: 'respectful',
		label: 'Уважительная',
		description: 'Хорошо заходит Сёгуну',
		effects: [
			{ factor: 'reputation', delta: 10 },
			{ factor: 'respect', delta: 5 },
			{ factor: 'health', delta: -3 },
		],
	},
	creative: {
		id: 'creative',
		label: 'Творческая',
		description: 'Понравится Гейше',
		effects: [
			{ factor: 'spirit', delta: 10 },
			{ factor: 'reputation', delta: 5 },
			{ factor: 'respect', delta: -3 },
		],
	},
	funny: {
		id: 'funny',
		label: 'Весёлая',
		description: 'Для Ронина-друга',
		effects: [
			{ factor: 'spirit', delta: 10 },
			{ factor: 'health', delta: 5 },
			{ factor: 'reputation', delta: -3 },
		],
	},
	impudent: {
		id: 'impudent',
		label: 'Наглая',
		description: 'Рискованная для всех',
		effects: [
			{ factor: 'spirit', delta: 15 },
			{ factor: 'respect', delta: -10 },
			{ factor: 'reputation', delta: -5 },
		],
	},
	mystic: {
		id: 'mystic',
		label: 'Мистическая',
		description: 'Странная, но рабочая',
		effects: [
			{ factor: 'respect', delta: 10 },
			{ factor: 'reputation', delta: -8 },
			{ factor: 'spirit', delta: 5 },
		],
	},
}

export const NPC_PREFERRED_EXCUSES: Record<
	NpcType,
	ReadonlySet<ExcuseDefinition['id']>
> = {
	sensei: new Set(['polite']),
	shogun: new Set(['respectful']),
	geisha: new Set(['creative']),
	ronin: new Set(['funny']),
}

export const DEFEAT_MESSAGES: Record<FactorKey, string> = {
	reputation: 'Вас изгнали из деревни',
	respect: 'Вас лишили звания самурая',
	health: 'Вы не можете двигаться от усталости',
	spirit: 'Вы впали в глубокую депрессию',
}
