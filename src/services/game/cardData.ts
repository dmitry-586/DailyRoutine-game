import { NPC_TEXTURE_KEYS } from '@/services/phaser/assets'
import { CardCategory, CardType, type CardData } from './types'

// База данных карт с характеристиками
export const CARD_DATABASE: Record<CardType, CardData> = {
	[CardType.Shogun]: {
		type: CardType.Shogun,
		category: CardCategory.Warrior,
		power: 10,
		textureKey: NPC_TEXTURE_KEYS.shogun
	},
	[CardType.Sensei]: {
		type: CardType.Sensei,
		category: CardCategory.Sage,
		power: 9,
		textureKey: NPC_TEXTURE_KEYS.sensei
	},
	[CardType.Samurai]: {
		type: CardType.Samurai,
		category: CardCategory.Warrior,
		power: 8,
		textureKey: NPC_TEXTURE_KEYS.samurai
	},
	[CardType.Elder]: {
		type: CardType.Elder,
		category: CardCategory.Sage,
		power: 7,
		textureKey: NPC_TEXTURE_KEYS.elder
	},
	[CardType.Ronin]: {
		type: CardType.Ronin,
		category: CardCategory.Warrior,
		power: 6,
		textureKey: NPC_TEXTURE_KEYS.ronin
	},
	[CardType.Geisha]: {
		type: CardType.Geisha,
		category: CardCategory.Special,
		power: 5,
		textureKey: NPC_TEXTURE_KEYS.geisha
	},
	[CardType.Craftsman]: {
		type: CardType.Craftsman,
		category: CardCategory.Artisan,
		power: 4,
		textureKey: NPC_TEXTURE_KEYS.craftsman
	},
	[CardType.Merchant]: {
		type: CardType.Merchant,
		category: CardCategory.Artisan,
		power: 3,
		textureKey: NPC_TEXTURE_KEYS.merchant
	},
	[CardType.Poet]: {
		type: CardType.Poet,
		category: CardCategory.Common,
		power: 2,
		textureKey: NPC_TEXTURE_KEYS.poet
	},
	[CardType.Peasant]: {
		type: CardType.Peasant,
		category: CardCategory.Common,
		power: 1,
		textureKey: NPC_TEXTURE_KEYS.peasant
	}
}

// Бонусы синергии по категориям
export const SYNERGY_BONUS: Record<CardCategory, number> = {
	[CardCategory.Warrior]: 3,
	[CardCategory.Sage]: 2,
	[CardCategory.Artisan]: 1,
	[CardCategory.Common]: 1,
	[CardCategory.Special]: 0
}

// Создание колоды (по 4 экземпляра каждой карты)
export const createDeck = (): CardData[] => {
	const deck: CardData[] = []
	const cardTypes = Object.values(CardType)

	cardTypes.forEach(type => {
		for (let i = 0; i < 4; i++) {
			deck.push(CARD_DATABASE[type])
		}
	})

	return shuffleDeck(deck)
}

// Перемешивание колоды
export const shuffleDeck = (deck: CardData[]): CardData[] => {
	const shuffled = [...deck]
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
	}
	return shuffled
}
