import { useGameStore } from '../model/store'

export const useGamePhase = () => useGameStore(state => state.phase)

export const useNpc = () => useGameStore(state => state.npc)

export const useNpcQuestion = () => useGameStore(state => state.currentQuestion)

export const useExcuses = () => useGameStore(state => state.availableExcuses)

export const useLastDefeat = () => useGameStore(state => state.lastDefeat)
