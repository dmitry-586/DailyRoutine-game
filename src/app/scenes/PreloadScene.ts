import { Scene } from 'phaser'
import { registerGameAssets } from '../../services/phaser/assets'

export class PreloadScene extends Scene {
	constructor() {
		super('PreloadScene')
	}

	preload() {
		registerGameAssets(this.load)
	}

	create() {
		this.scene.start('GameScene')
	}
}
