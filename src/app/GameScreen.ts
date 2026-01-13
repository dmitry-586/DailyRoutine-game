import { GameScene } from '@/app/scenes/GameScene'
import { PreloadScene } from '@/app/scenes/PreloadScene'
import { AUTO, Game, Scale, type Types } from 'phaser'

export const initGame = (parent: HTMLElement): Game => {
	const getDisplaySize = (): { width: number; height: number } => ({
		width: parent.clientWidth || window.innerWidth,
		height: parent.clientHeight || window.innerHeight
	})

	const { width: displayWidth, height: displayHeight } = getDisplaySize()

	const config: Types.Core.GameConfig = {
		type: AUTO,
		width: displayWidth,
		height: displayHeight,
		backgroundColor: '#2d3134',
		parent,
		scene: [PreloadScene, GameScene],
		render: {
			antialias: true,
			pixelArt: false,
			roundPixels: false
		},
		scale: {
			mode: Scale.RESIZE,
			autoCenter: Scale.CENTER_BOTH,
			width: displayWidth,
			height: displayHeight
		}
	}

	const game = new Game(config)

	const canvas = game.canvas
	if (canvas) {
		canvas.style.width = '100%'
		canvas.style.height = '100%'
		canvas.style.display = 'block'
	}

	const handleResize = () => {
		const { width, height } = getDisplaySize()
		game.scale.resize(width, height)
	}

	window.addEventListener('resize', handleResize)
	window.addEventListener('orientationchange', handleResize)
	game.events.once('destroy', () => {
		window.removeEventListener('resize', handleResize)
		window.removeEventListener('orientationchange', handleResize)
	})

	return game
}
