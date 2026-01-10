import { NPC_TEXTURE_KEYS } from '@/services/phaser/assets'
import { Scene } from 'phaser'

export class GameScene extends Scene {
	constructor() {
		super('GameScene')
	}

	create() {
		const craftsman = this.add.sprite(400, 600, NPC_TEXTURE_KEYS.craftsman)
		const sensei = this.add.sprite(400, 200, NPC_TEXTURE_KEYS.sensei)

		craftsman.scale = 1
		sensei.scale = 1
	}
}
