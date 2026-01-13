import { createDeck } from './cardData'
import { calculateRoundWinner, getGameWinner, isRoundOver } from './gameLogic'
import {
	Position,
	type GameState,
	type HandCard,
	type PlayedCard,
	type PositionState
} from './types'

// Менеджер игрового состояния
export class GameManager {
	private state: GameState

	constructor() {
		this.state = this.initializeGame()
	}

	// Инициализация новой игры
	private initializeGame(): GameState {
		const playerDeck = createDeck()
		const opponentDeck = createDeck()

		// Раздаем по 5 карт в руку
		const playerHand = this.drawCards(playerDeck, 5)
		const opponentHand = this.drawCards(opponentDeck, 5)

		return {
			round: 1,
			playerHand,
			opponentHand,
			playerDeck,
			opponentDeck,
			positions: this.createEmptyPositions(),
			playerRoundsWon: 0,
			opponentRoundsWon: 0,
			currentPlayer: 'player',
			phase: 'selectCards',
			selectedCards: []
		}
	}

	// Создание пустых позиций
	private createEmptyPositions(): Record<Position, PositionState> {
		const createEmpty = (): PositionState => ({
			playerCards: [],
			opponentCards: [],
			playerScore: 0,
			opponentScore: 0
		})

		return {
			[Position.Left]: createEmpty(),
			[Position.Center]: createEmpty(),
			[Position.Right]: createEmpty()
		}
	}

	// Взять карты из колоды
	private drawCards(
		deck: typeof this.state.playerDeck,
		count: number
	): HandCard[] {
		const cards: HandCard[] = []

		for (let i = 0; i < count && deck.length > 0; i++) {
			const cardData = deck.pop()!
			cards.push({
				id: `${cardData.type}-${Date.now()}-${Math.random()}`,
				data: cardData
			})
		}

		return cards
	}

	// Получить текущее состояние
	getState(): GameState {
		return { ...this.state }
	}

	// Выбрать карту из руки
	selectCard(cardId: string): boolean {
		const card = this.state.playerHand.find(c => c.id === cardId)
		if (!card) return false

		// Максимум 2 карты за ход
		if (this.state.selectedCards.length >= 2) return false

		this.state.selectedCards.push(card)
		this.state.phase = 'cardSelected'

		return true
	}

	// Отменить выбор карты
	deselectCard(cardId: string): boolean {
		const index = this.state.selectedCards.findIndex(c => c.id === cardId)
		if (index === -1) return false

		this.state.selectedCards.splice(index, 1)

		if (this.state.selectedCards.length === 0) {
			this.state.phase = 'selectCards'
		}

		return true
	}

	// Разыграть карты на позицию
	playCards(position: Position): boolean {
		if (this.state.selectedCards.length === 0) return false
		if (this.state.currentPlayer !== 'player') return false

		const positionState = this.state.positions[position]

		// Размещаем выбранные карты на позиции
		this.state.selectedCards.forEach(handCard => {
			const playedCard: PlayedCard = {
				id: handCard.id,
				data: handCard.data,
				position,
				owner: 'player'
			}

			positionState.playerCards.push(playedCard)

			// Удаляем карту из руки
			const handIndex = this.state.playerHand.findIndex(
				c => c.id === handCard.id
			)
			if (handIndex !== -1) {
				this.state.playerHand.splice(handIndex, 1)
			}
		})

		// Очищаем выбор
		this.state.selectedCards = []

		// Берем 1 карту из колоды
		const newCards = this.drawCards(this.state.playerDeck, 1)
		this.state.playerHand.push(...newCards)

		// Проверяем окончание раунда
		if (
			isRoundOver(this.state.playerHand.length, this.state.opponentHand.length)
		) {
			this.endRound()
		} else {
			// Переход хода
			this.state.currentPlayer = 'opponent'
			this.state.phase = 'selectCards'
		}

		return true
	}

	// Завершение раунда
	private endRound(): void {
		const winner = calculateRoundWinner(this.state.positions)

		if (winner === 'player') {
			this.state.playerRoundsWon++
		} else if (winner === 'opponent') {
			this.state.opponentRoundsWon++
		}

		// Проверяем окончание игры
		const gameWinner = getGameWinner(
			this.state.playerRoundsWon,
			this.state.opponentRoundsWon
		)

		if (gameWinner) {
			this.state.phase = 'gameEnd'
			return
		}

		// Начинаем новый раунд
		this.startNewRound()
	}

	// Начало нового раунда
	private startNewRound(): void {
		this.state.round++
		this.state.positions = this.createEmptyPositions()

		// Раздаем по 1 карте
		const newPlayerCards = this.drawCards(this.state.playerDeck, 1)
		const newOpponentCards = this.drawCards(this.state.opponentDeck, 1)

		this.state.playerHand.push(...newPlayerCards)
		this.state.opponentHand.push(...newOpponentCards)

		this.state.currentPlayer = 'player'
		this.state.phase = 'selectCards'
	}
}
