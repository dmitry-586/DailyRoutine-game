import Phaser from 'phaser'
import { registerGameAssets } from '../assets'

export class BootScene extends Phaser.Scene {
	constructor() {
		super('BootScene')
	}

	preload(): void {
		registerGameAssets(this.load)
	}

	create(): void {
		this.scene.start('MainScene')
	}
}

