import { useShallow } from 'zustand/react/shallow'
import { useGameStore } from '../model/store'

export const useFactors = () =>
	useGameStore(
		useShallow(state => ({
			reputation: state.factors.reputation,
			respect: state.factors.respect,
			health: state.factors.health,
			spirit: state.factors.spirit,
		}))
	)

export const useStats = () =>
	useGameStore(
		useShallow(state => ({
			meetingsCount: state.stats.meetingsCount,
			successfulExcuses: state.stats.successfulExcuses,
			failedExcuses: state.stats.failedExcuses,
			maxReputation: state.stats.maxReputation,
			bestSuccessStreak: state.stats.bestSuccessStreak,
		}))
	)
