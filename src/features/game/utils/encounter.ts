import {
	DEFEAT_MESSAGES,
	EXCUSE_DEFINITIONS,
	FAILURE_STREAK_PENALTY_THRESHOLD,
	FAILURE_STREAK_PENALTY_VALUE,
	INITIAL_FACTOR_VALUE,
	MAX_FACTOR_VALUE,
	MIN_FACTOR_VALUE,
	NPC_PREFERRED_EXCUSES,
	SUCCESS_STREAK_BONUS_THRESHOLD,
	SUCCESS_STREAK_BONUS_VALUE,
} from '../config/constants'
import { pickExcuseText } from '../config/dialogues'
import type {
	ComboState,
	DefeatInfo,
	EncounterResult,
	ExcuseOption,
	ExcuseType,
	FactorKey,
	FactorState,
	NpcState,
} from '../types'

export interface ResolveEncounterInput {
	currentFactors: FactorState
	npc: NpcState
	excuseType: ExcuseType
	combo: ComboState
}

export interface ResolveEncounterOutput extends EncounterResult {
	defeat: DefeatInfo | null
}

export const createInitialFactors = (): FactorState => ({
	reputation: INITIAL_FACTOR_VALUE,
	respect: INITIAL_FACTOR_VALUE,
	health: INITIAL_FACTOR_VALUE,
	spirit: INITIAL_FACTOR_VALUE,
})

export const clampFactor = (value: number): number =>
	Math.max(MIN_FACTOR_VALUE, Math.min(MAX_FACTOR_VALUE, value))

export function getAvailableExcuses(npc: NpcState): ExcuseOption[] {
	const allTypes: ExcuseType[] = [
		'polite',
		'respectful',
		'creative',
		'funny',
		'impudent',
		'mystic',
	]

	const filtered = npc.lastExcuseType
		? allTypes.filter(type => type !== npc.lastExcuseType)
		: allTypes

	const shuffled = [...filtered].sort(() => Math.random() - 0.5)
	const selected = shuffled.slice(0, 3)

	return selected.map(type => ({
		type,
		text: pickExcuseText(type),
	}))
}

const applyExcuseEffects = (
	factors: FactorState,
	excuseType: ExcuseType,
	multiplier: number
): FactorState => {
	const def = EXCUSE_DEFINITIONS[excuseType]
	let next = { ...factors }

	for (const effect of def.effects) {
		const delta = effect.delta * multiplier
		next = {
			...next,
			[effect.factor]: clampFactor(next[effect.factor] + delta),
		}
	}

	return next
}

const applyCombo = (factors: FactorState, combo: ComboState): FactorState => {
	let next = { ...factors }

	if (combo.successStreak >= SUCCESS_STREAK_BONUS_THRESHOLD) {
		next = {
			reputation: clampFactor(next.reputation + SUCCESS_STREAK_BONUS_VALUE),
			respect: clampFactor(next.respect + SUCCESS_STREAK_BONUS_VALUE),
			health: clampFactor(next.health + SUCCESS_STREAK_BONUS_VALUE),
			spirit: clampFactor(next.spirit + SUCCESS_STREAK_BONUS_VALUE),
		}
	}

	if (combo.failureStreak >= FAILURE_STREAK_PENALTY_THRESHOLD) {
		next = {
			reputation: clampFactor(next.reputation + FAILURE_STREAK_PENALTY_VALUE),
			respect: clampFactor(next.respect + FAILURE_STREAK_PENALTY_VALUE),
			health: clampFactor(next.health + FAILURE_STREAK_PENALTY_VALUE),
			spirit: clampFactor(next.spirit + FAILURE_STREAK_PENALTY_VALUE),
		}
	}

	return next
}

export const applyRecovery = (factors: FactorState): FactorState => {
	const baseRecovery = 1
	const spiritBonus = factors.spirit > 70 ? 2 : 0
	const total = baseRecovery + spiritBonus

	return {
		reputation: clampFactor(factors.reputation + total),
		respect: clampFactor(factors.respect + total),
		health: clampFactor(factors.health + total),
		spirit: clampFactor(factors.spirit + total),
	}
}

export const checkDefeat = (factors: FactorState): DefeatInfo | null => {
	if (factors.reputation <= 0) {
		return { factor: 'reputation', message: DEFEAT_MESSAGES.reputation }
	}
	if (factors.respect <= 0) {
		return { factor: 'respect', message: DEFEAT_MESSAGES.respect }
	}
	if (factors.health <= 0) {
		return { factor: 'health', message: DEFEAT_MESSAGES.health }
	}
	if (factors.spirit <= 0) {
		return { factor: 'spirit', message: DEFEAT_MESSAGES.spirit }
	}
	return null
}

export const calculateExcuseEffects = (
	npc: NpcState,
	excuseType: ExcuseType
): Record<FactorKey, number> => {
	const preferred = NPC_PREFERRED_EXCUSES[npc.type]
	const isSuccess = preferred.has(excuseType)
	const effectMultiplier = isSuccess ? 1 : -2

	const def = EXCUSE_DEFINITIONS[excuseType]
	const effects: Record<FactorKey, number> = {
		reputation: 0,
		respect: 0,
		health: 0,
		spirit: 0,
	}

	for (const effect of def.effects) {
		effects[effect.factor] = effect.delta * effectMultiplier
	}

	return effects
}

export const resolveEncounter = (
	input: ResolveEncounterInput
): ResolveEncounterOutput => {
	const { currentFactors, npc, excuseType, combo } = input

	const preferred = NPC_PREFERRED_EXCUSES[npc.type]
	const isSuccess = preferred.has(excuseType)

	const outcome = isSuccess ? 'success' : 'failure'
	const effectMultiplier = isSuccess ? 1 : -2

	let updatedFactors = applyExcuseEffects(
		currentFactors,
		excuseType,
		effectMultiplier
	)

	const updatedCombo: ComboState = isSuccess
		? { successStreak: combo.successStreak + 1, failureStreak: 0 }
		: { successStreak: 0, failureStreak: combo.failureStreak + 1 }

	updatedFactors = applyCombo(updatedFactors, updatedCombo)
	updatedFactors = applyRecovery(updatedFactors)

	const delta: EncounterResult['factorDelta'] = {
		reputation: updatedFactors.reputation - currentFactors.reputation,
		respect: updatedFactors.respect - currentFactors.respect,
		health: updatedFactors.health - currentFactors.health,
		spirit: updatedFactors.spirit - currentFactors.spirit,
	}

	const defeat = checkDefeat(updatedFactors)

	return {
		outcome,
		factorDelta: delta,
		updatedFactors,
		updatedCombo,
		defeat,
	}
}
