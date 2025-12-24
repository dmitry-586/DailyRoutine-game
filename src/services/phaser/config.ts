import Phaser from 'phaser'
import { BootScene } from './scenes/boot-scene'
import { MainScene } from './scenes/main-scene'

export const createPhaserConfig = (
	parent: string | HTMLElement
): Phaser.Types.Core.GameConfig => {
	const isMobile = window.innerWidth <= 768

	return {
		type: Phaser.AUTO,
		parent,
		backgroundColor: '#000000',
		transparent: false,
		width: isMobile ? window.innerWidth : 768,
		height: window.innerHeight,
		scale: {
			mode: Phaser.Scale.RESIZE,
			autoCenter: Phaser.Scale.CENTER_BOTH,
		},
		physics: {
			default: 'arcade',
			arcade: {
				gravity: { x: 0, y: 0 },
				debug: false,
			},
		},
		scene: [BootScene, MainScene],
	}
}

