import { SYNERGY_BONUS } from './cardData'
import type { CardCategory, PlayedCard, PositionState } from './types'

// Расчет силы карт на позиции с учетом синергий
export const calculatePositionPower = (cards: PlayedCard[]): number => {
	if (cards.length === 0) return 0

	// Базовая сила всех карт
	let totalPower = cards.reduce((sum, card) => sum + card.data.power, 0)

	// Подсчет карт по категориям
	const categoryCount = new Map<CardCategory, number>()
	cards.forEach(card => {
		const category = card.data.category
		categoryCount.set(category, (categoryCount.get(category) || 0) + 1)
	})

	// Добавляем бонусы синергии
	cards.forEach(card => {
		const category = card.data.category
		const count = categoryCount.get(category) || 0

		// Синергия активна если 2+ карты одной категории
		if (count >= 2) {
			totalPower += SYNERGY_BONUS[category]
		}
	})

	return totalPower
}

// Определение победителя на позиции
export const getPositionWinner = (
	position: PositionState
): 'player' | 'opponent' | 'draw' => {
	const playerPower = calculatePositionPower(position.playerCards)
	const opponentPower = calculatePositionPower(position.opponentCards)

	if (playerPower > opponentPower) return 'player'
	if (opponentPower > playerPower) return 'opponent'
	return 'draw'
}

// Подсчет побед на позициях
export const calculateRoundWinner = (
	positions: Record<string, PositionState>
): 'player' | 'opponent' | null => {
	let playerWins = 0
	let opponentWins = 0

	Object.values(positions).forEach(position => {
		const winner = getPositionWinner(position)
		if (winner === 'player') playerWins++
		if (winner === 'opponent') opponentWins++
	})

	// Победа если выиграны 2+ позиции
	if (playerWins >= 2) return 'player'
	if (opponentWins >= 2) return 'opponent'

	return null
}

// Проверка окончания раунда (у обоих 0 карт в руке)
export const isRoundOver = (
	playerHandSize: number,
	opponentHandSize: number
): boolean => {
	return playerHandSize === 0 && opponentHandSize === 0
}

// Проверка окончания игры (кто-то выиграл 3 раунда)
export const getGameWinner = (
	playerRoundsWon: number,
	opponentRoundsWon: number
): 'player' | 'opponent' | null => {
	if (playerRoundsWon >= 3) return 'player'
	if (opponentRoundsWon >= 3) return 'opponent'
	return null
}
