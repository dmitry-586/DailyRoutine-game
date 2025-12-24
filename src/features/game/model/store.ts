import { create } from 'zustand'
import { pickNpcQuestion } from '../config/dialogues'
import type {
	ComboState,
	DefeatInfo,
	EncounterOutcomeType,
	ExcuseOption,
	ExcuseType,
	FactorState,
	GamePhase,
	GameStats,
	NpcState,
} from '../types'
import {
	createInitialFactors,
	getAvailableExcuses,
	resolveEncounter,
} from '../utils/encounter'
import { pickNpcForMeeting } from '../utils/progression'

interface LastEncounterResult {
	outcome: EncounterOutcomeType
	factorDelta: FactorState
}

export interface GameState {
	phase: GamePhase
	factors: FactorState
	npc: NpcState | null
	currentQuestion: string | null
	availableExcuses: ExcuseOption[]
	meetingsCount: number
	combo: ComboState
	stats: GameStats
	lastDefeat: DefeatInfo | null
	lastEncounterResult: LastEncounterResult | null
	currentBackground: string | null
	setCurrentBackground: (bgKey: string) => void
	startNewGame: () => void
	chooseExcuse: (excuse: ExcuseType) => void
}

const createEmptyStats = (): GameStats => ({
	meetingsCount: 0,
	successfulExcuses: 0,
	failedExcuses: 0,
	maxReputation: 50,
	bestSuccessStreak: 0,
})

const createInitialCombo = (): ComboState => ({
	successStreak: 0,
	failureStreak: 0,
})

const computeStatsAfterEncounter = (
	stats: GameStats,
	outcome: EncounterOutcomeType,
	factors: FactorState,
	combo: ComboState
): GameStats => {
	const meetingsCount = stats.meetingsCount + 1
	const successfulExcuses =
		stats.successfulExcuses + (outcome === 'success' ? 1 : 0)
	const failedExcuses = stats.failedExcuses + (outcome === 'failure' ? 1 : 0)
	const maxReputation = Math.max(stats.maxReputation, factors.reputation)
	const bestSuccessStreak = Math.max(
		stats.bestSuccessStreak,
		combo.successStreak
	)

	return {
		meetingsCount,
		successfulExcuses,
		failedExcuses,
		maxReputation,
		bestSuccessStreak,
	}
}

export const useGameStore = create<GameState>((set, get) => ({
	phase: 'menu',
	factors: createInitialFactors(),
	npc: null,
	currentQuestion: null,
	availableExcuses: [],
	meetingsCount: 0,
	combo: createInitialCombo(),
	stats: createEmptyStats(),
	lastDefeat: null,
	lastEncounterResult: null,
	currentBackground: null,
	setCurrentBackground: (bgKey: string) => {
		set({ currentBackground: bgKey })
	},

	startNewGame: () => {
		const factors = createInitialFactors()

		const firstNpcType = pickNpcForMeeting(0, null)
		const firstNpc: NpcState = {
			type: firstNpcType,
			lastExcuseType: null,
		}

		const firstQuestion = pickNpcQuestion(firstNpcType)
		const firstExcuses = getAvailableExcuses(firstNpc)

		set({
			phase: 'playing',
			factors,
			npc: firstNpc,
			currentQuestion: firstQuestion,
			availableExcuses: firstExcuses,
			meetingsCount: 0,
			combo: createInitialCombo(),
			stats: createEmptyStats(),
			lastDefeat: null,
			lastEncounterResult: null,
		})
	},

	chooseExcuse: (excuseType: ExcuseType) => {
		const state = get()
		if (state.phase !== 'playing' || !state.npc) {
			return
		}

		const result = resolveEncounter({
			currentFactors: state.factors,
			npc: state.npc,
			excuseType,
			combo: state.combo,
		})

		const newStats = computeStatsAfterEncounter(
			state.stats,
			result.outcome,
			result.updatedFactors,
			result.updatedCombo
		)

		if (result.defeat) {
			set({
				phase: 'gameOver',
				factors: result.updatedFactors,
				combo: result.updatedCombo,
				stats: newStats,
				lastDefeat: result.defeat,
				lastEncounterResult: {
					outcome: result.outcome,
					factorDelta: result.factorDelta,
				},
			})
			return
		}

		const nextMeetingIndex = state.meetingsCount + 1
		const previousNpcType = state.npc?.type ?? null
		const npcType = pickNpcForMeeting(nextMeetingIndex, previousNpcType)
		const npc: NpcState = {
			type: npcType,
			lastExcuseType: excuseType,
		}

		const availableExcuses = getAvailableExcuses(npc)
		const question = pickNpcQuestion(npcType)

		set({
			meetingsCount: nextMeetingIndex,
			factors: result.updatedFactors,
			combo: result.updatedCombo,
			stats: newStats,
			npc,
			availableExcuses,
			currentQuestion: question,
			lastDefeat: null,
			lastEncounterResult: {
				outcome: result.outcome,
				factorDelta: result.factorDelta,
			},
		})
	},
}))
