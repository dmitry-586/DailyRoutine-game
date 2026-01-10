import { MainMenu } from '@/features/home'
import type { Game } from 'phaser'
import { useEffect, useRef, useState } from 'react'
import { initGame } from './GameScreen'

function App() {
	const [isGameStarted, setIsGameStarted] = useState(false)
	const gameRef = useRef<Game | null>(null)
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!isGameStarted || gameRef.current || !containerRef.current) return

		gameRef.current = initGame(containerRef.current)

		return () => {
			gameRef.current?.destroy(true)
			gameRef.current = null
		}
	}, [isGameStarted])

	if (isGameStarted) {
		return (
			<div
				ref={containerRef}
				className='w-full h-screen'
			/>
		)
	}

	return <MainMenu onStart={() => setIsGameStarted(true)} />
}

export default App
