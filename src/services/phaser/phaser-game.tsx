import Phaser from 'phaser'
import { useEffect, useRef } from 'react'
import { createPhaserConfig } from './config'

function PhaserGame() {
	const containerRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		if (!containerRef.current) return

		const config = createPhaserConfig(containerRef.current)
		const game = new Phaser.Game(config)

		return () => {
			game.destroy(true)
		}
	}, [])

	return <div ref={containerRef} className='size-full' />
}

export default PhaserGame
