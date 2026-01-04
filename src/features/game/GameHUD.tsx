import { BottomPanel } from './BottomPanel'
import { TopPanel } from './TopPanel'

export function GameHUD() {
	return (
		<div className='absolute inset-0 z-10 flex flex-col justify-between p-4'>
			<TopPanel />
			<BottomPanel />
		</div>
	)
}
