// Типы карт по категориям
export enum CardCategory {
	Warrior = 'warrior',
	Sage = 'sage',
	Artisan = 'artisan',
	Common = 'common',
	Special = 'special'
}

// Типы карт
export enum CardType {
	Shogun = 'shogun',
	Sensei = 'sensei',
	Samurai = 'samurai',
	Elder = 'elder',
	Ronin = 'ronin',
	Geisha = 'geisha',
	Craftsman = 'craftsman',
	Merchant = 'merchant',
	Poet = 'poet',
	Peasant = 'peasant'
}

// Позиции на поле
export enum Position {
	Left = 'left',
	Center = 'center',
	Right = 'right'
}

// Характеристики карты
export interface CardData {
	type: CardType
	category: CardCategory
	power: number
	textureKey: string
}

// Карта на поле
export interface PlayedCard {
	id: string
	data: CardData
	position: Position
	owner: 'player' | 'opponent'
}

// Карта в руке
export interface HandCard {
	id: string
	data: CardData
}

// Состояние позиции
export interface PositionState {
	playerCards: PlayedCard[]
	opponentCards: PlayedCard[]
	playerScore: number
	opponentScore: number
}

// Состояние игры
export interface GameState {
	// Текущий раунд (1-3)
	round: number

	// Карты
	playerHand: HandCard[]
	opponentHand: HandCard[]
	playerDeck: CardData[]
	opponentDeck: CardData[]

	// Поле
	positions: Record<Position, PositionState>

	// Счет раундов
	playerRoundsWon: number
	opponentRoundsWon: number

	// Текущий игрок
	currentPlayer: 'player' | 'opponent'

	// Фаза игры
	phase: 'selectCards' | 'cardSelected' | 'roundEnd' | 'gameEnd'

	// Выбранные карты для хода
	selectedCards: HandCard[]
}
