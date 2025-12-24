import Phaser from 'phaser'
import { useEffect, useRef } from 'react'
import { createPhaserConfig } from './config'

const PHASER_CONTAINER_ID = 'phaser-game-root'

const CONTAINER_STYLE: React.CSSProperties = {
	width: '100%',
	height: '100%',
	maxWidth: '768px',
	margin: '0 auto',
}

function PhaserGame() {
	const gameRef = useRef<Phaser.Game | null>(null)
	const containerRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		if (!containerRef.current) return

		const config = createPhaserConfig(containerRef.current)
		const game = new Phaser.Game(config)
		gameRef.current = game

		return () => {
			game.destroy(true)
			gameRef.current = null
		}
	}, [])

	return (
		<div id={PHASER_CONTAINER_ID} ref={containerRef} style={CONTAINER_STYLE} />
	)
}

export default PhaserGame
