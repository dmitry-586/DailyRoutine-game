import Phaser from 'phaser'
import { MainScene } from './main-scene'

export const createPhaserConfig = (
	parent: string | HTMLElement
): Phaser.Types.Core.GameConfig => {
	return {
		type: Phaser.AUTO,
		parent,
		width: 800,
		height: 600,
		scene: [MainScene],
	}
}
