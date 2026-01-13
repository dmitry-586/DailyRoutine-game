import { CARD_DATABASE, CardType } from '@/services/game'
import { Card } from '@/services/phaser/Card'
import { Scene } from 'phaser'

interface FieldData {
	id: string
	x: number
	y: number
	width: number
	height: number
	cards: Card[]
}

export class GameScene extends Scene {
	private handCards: Card[] = []
	private fields: Map<string, FieldData> = new Map()
	private readonly FIELD_HEIGHT = 120
	private readonly CARD_SPACING = 20

	constructor() {
		super('GameScene')
	}

	create() {
		this.input.on('drag', this.onDrag, this)
		this.input.on('dragend', this.onDragEnd, this)
		this.input.on('drop', this.onDrop, this)

		this.drawFields()
		this.createInitialHand()
	}

	private drawFields(): void {
		const width = this.cameras.main.width
		const height = this.cameras.main.height

		const fieldWidth = width * 0.95
		const fieldX = width / 2
		const topMargin = 50
		const fieldSpacing = height * 0.25

		const fieldConfigs = [
			{ id: 'top', y: topMargin + this.FIELD_HEIGHT / 2, label: 'Противник' },
			{
				id: 'center',
				y: topMargin + this.FIELD_HEIGHT + fieldSpacing,
				label: 'Центр'
			},
			{
				id: 'bottom',
				y: topMargin + this.FIELD_HEIGHT * 2 + fieldSpacing * 2,
				label: 'Вы'
			}
		]

		fieldConfigs.forEach(({ id, y, label }) => {
			// Фон поля
			this.add.rectangle(
				fieldX,
				y,
				fieldWidth,
				this.FIELD_HEIGHT,
				0x16213e,
				0.9
			)

			// Рамка
			const border = this.add.rectangle(
				fieldX,
				y,
				fieldWidth,
				this.FIELD_HEIGHT
			)
			border.setStrokeStyle(2, 0x4a90e2, 0.8)

			// Название поля
			this.add.text(10, y - this.FIELD_HEIGHT / 2 - 25, label, {
				fontSize: '16px',
				color: '#ffffff',
				fontStyle: 'bold'
			})

			// Зона для drop
			const dropZone = this.add.zone(fieldX, y, fieldWidth, this.FIELD_HEIGHT)
			dropZone.setRectangleDropZone(fieldWidth, this.FIELD_HEIGHT)
			dropZone.setName(id)

			// Сохраняем данные поля
			this.fields.set(id, {
				id,
				x: fieldX,
				y,
				width: fieldWidth,
				height: this.FIELD_HEIGHT,
				cards: []
			})
		})
	}

	private createInitialHand(): void {
		const cardTypes = [
			CardType.Shogun,
			CardType.Samurai,
			CardType.Sensei,
			CardType.Craftsman,
			CardType.Ronin
		]

		const width = this.cameras.main.width
		const height = this.cameras.main.height
		const handY = height - 80
		const spacing = 120
		const startX = width / 2 - ((cardTypes.length - 1) * spacing) / 2

		cardTypes.forEach((type, index) => {
			const card = new Card(this, startX + index * spacing, handY, {
				id: `${type}-${index}`,
				data: CARD_DATABASE[type]
			})
			card.setScale(0.5)
			this.handCards.push(card)
		})
	}

	private onDrag(
		_pointer: unknown,
		gameObject: Card,
		dragX: number,
		dragY: number
	): void {
		gameObject.x = dragX
		gameObject.y = dragY
		gameObject.setDepth(1000)
	}

	private onDrop(
		_pointer: unknown,
		gameObject: Card,
		dropZone: Phaser.GameObjects.Zone
	): void {
		const fieldId = dropZone.name
		const field = this.fields.get(fieldId)

		if (!field) return

		// Убираем карту из руки
		const handIndex = this.handCards.indexOf(gameObject)
		if (handIndex !== -1) {
			this.handCards.splice(handIndex, 1)
		}

		// Убираем карту из предыдущего поля
		this.fields.forEach(f => {
			const idx = f.cards.indexOf(gameObject)
			if (idx !== -1) {
				f.cards.splice(idx, 1)
				this.arrangeCardsInField(f)
			}
		})

		// Добавляем карту в новое поле
		field.cards.push(gameObject)
		gameObject.setDepth(1)

		// Переставляем все карты в поле
		this.arrangeCardsInField(field)

		// Обновляем руку
		this.updateHandPositions()
	}

	private onDragEnd(
		_pointer: unknown,
		gameObject: Card,
		dropped: boolean
	): void {
		if (!dropped) {
			// Возвращаем в руку
			if (!this.handCards.includes(gameObject)) {
				this.handCards.push(gameObject)
			}
			this.updateHandPositions()
		}
		gameObject.setDepth(1)
	}

	private arrangeCardsInField(field: FieldData): void {
		const cardCount = field.cards.length
		if (cardCount === 0) return

		const cardWidth = 100
		const totalWidth =
			cardCount * cardWidth + (cardCount - 1) * this.CARD_SPACING
		const startX = field.x - totalWidth / 2 + cardWidth / 2

		field.cards.forEach((card, index) => {
			const targetX = startX + index * (cardWidth + this.CARD_SPACING)

			this.tweens.add({
				targets: card,
				x: targetX,
				y: field.y,
				duration: 200,
				ease: 'Power2'
			})
		})
	}

	private updateHandPositions(): void {
		const width = this.cameras.main.width
		const height = this.cameras.main.height
		const handY = height - 80
		const spacing = 120
		const startX = width / 2 - ((this.handCards.length - 1) * spacing) / 2

		this.handCards.forEach((card, index) => {
			this.tweens.add({
				targets: card,
				x: startX + index * spacing,
				y: handY,
				duration: 200,
				ease: 'Power2'
			})
		})
	}
}
