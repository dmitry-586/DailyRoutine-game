import { GameScene } from '@/app/scenes/GameScene'
import { PreloadScene } from '@/app/scenes/PreloadScene'
import { AUTO, Game, Scale, type Types } from 'phaser'

export const initGame = (parent: HTMLElement): Game => {
	const dpr = window.devicePixelRatio || 1
	const displayWidth = parent.clientWidth || 800
	const displayHeight = parent.clientHeight || 600

	// Увеличиваем внутреннее разрешение для четкости на высоких DPI
	const width = displayWidth * dpr
	const height = displayHeight * dpr

	const config: Types.Core.GameConfig = {
		type: AUTO,
		width,
		height,
		backgroundColor: '#2d3134',
		parent,
		scene: [PreloadScene, GameScene],
		render: {
			antialias: false,
			pixelArt: true,
			roundPixels: true
		},
		scale: {
			mode: Scale.FIT,
			autoCenter: Scale.CENTER_BOTH,
			width: displayWidth,
			height: displayHeight
		}
	}

	const game = new Game(config)

	const canvas = game.canvas
	if (canvas) {
		canvas.style.width = `${displayWidth}px`
		canvas.style.height = `${displayHeight}px`
		canvas.style.transform = `scale(${1 / dpr})`
		canvas.style.transformOrigin = 'top left'
	}

	return game
}
