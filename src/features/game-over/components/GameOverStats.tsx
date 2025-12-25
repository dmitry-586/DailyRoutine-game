import { useStats } from '../../game/hooks'
import { GameOverItem } from './GameOverItem'

export function GameOverStats() {
	const stats = useStats()

	const statsItems = [
		{ label: 'Встреч пройдено', value: stats.meetingsCount },
		{ label: 'Успешных отмазок', value: stats.successfulExcuses },
		{ label: 'Провалов', value: stats.failedExcuses },
		{ label: 'Максимальная репутация', value: stats.maxReputation },
		{ label: 'Лучший стрик успехов', value: stats.bestSuccessStreak },
	]

	return (
		<div className='game-over-stats grid grid-cols-2 gap-3 gap-x-6 text-base p-5 bg-black/60 border border-white/15 rounded-xl shadow-elevated max-md:grid-cols-1 max-md:gap-2 max-md:p-4'>
			{statsItems.map(item => (
				<GameOverItem key={item.label} label={item.label} value={item.value} />
			))}
		</div>
	)
}
