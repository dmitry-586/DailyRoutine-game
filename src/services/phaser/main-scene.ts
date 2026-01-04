import Phaser from 'phaser'

export class MainScene extends Phaser.Scene {
	create(): void {
		this.add
			.text(400, 300, 'Hello Phaser', {
				fontSize: '32px',
				color: '#ffffff',
			})
			.setOrigin(0.5)
	}
}
