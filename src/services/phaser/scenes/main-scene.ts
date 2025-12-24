import Phaser from 'phaser'
import { useGameStore } from '../../../features/game/model/store'

const MOBILE_BACKGROUNDS = ['bg_1_mobile', 'bg_2_mobile'] as const
const DESKTOP_BACKGROUNDS = ['bg_1'] as const

export class MainScene extends Phaser.Scene {
	constructor() {
		super('MainScene')
	}

	create(): void {
		const { width, height } = this.scale
		const isMobile = width <= 768

		const availableBackgrounds = isMobile
			? MOBILE_BACKGROUNDS
			: DESKTOP_BACKGROUNDS

		const bgKey = Phaser.Utils.Array.GetRandom([
			...availableBackgrounds,
		]) as string

		// Сохраняем выбранный фон в store
		useGameStore.getState().setCurrentBackground(bgKey)

		this.add
			.image(width / 2, height / 2, bgKey)
			.setDisplaySize(width, height)
			.setOrigin(0.5)
	}
}
