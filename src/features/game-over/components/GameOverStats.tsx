import { useStats } from '../../game/hooks'

export function GameOverStats() {
	const stats = useStats()

	return (
		<div className='game-over-stats'>
			<div>Встреч пройдено: {stats.meetingsCount}</div>
			<div>Успешных отмазок: {stats.successfulExcuses}</div>
			<div>Провалов: {stats.failedExcuses}</div>
			<div>Максимальная репутация: {stats.maxReputation}</div>
			<div>Лучший стрик успехов: {stats.bestSuccessStreak}</div>
		</div>
	)
}
