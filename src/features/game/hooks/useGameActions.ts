import { useShallow } from 'zustand/react/shallow'
import { useGameStore } from '../model/store'

export const useGameActions = () =>
	useGameStore(
		useShallow(state => ({
			startNewGame: state.startNewGame,
			chooseExcuse: state.chooseExcuse,
		}))
	)
