import type { HandCard } from '@/services/game'
import { GameObjects, type Scene } from 'phaser'

export class Card extends GameObjects.Sprite {
	public cardData: HandCard

	constructor(scene: Scene, x: number, y: number, cardData: HandCard) {
		super(scene, x, y, cardData.data.textureKey)

		this.cardData = cardData
		this.scene.add.existing(this)
		this.setInteractive()

		// Включаем drag and drop
		this.scene.input.setDraggable(this)
	}
}
