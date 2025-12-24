import { useGameActions } from '../../game/hooks'

function MainMenu() {
	const { startNewGame } = useGameActions()

	return (
		<div className='screen screen-main-menu'>
			<div className='main-menu-content'>
				<div className='main-menu-header'>
					<h1 className='main-menu-title'>
						<span className='title-main'>Ленивый</span>
						<span className='title-accent'>Самурай</span>
					</h1>
					<div className='title-decoration'></div>
				</div>

				<div className='main-menu-description'>
					<p className='description-text'>
						Вы — самурай, который просто хочет дойти домой. Но по дороге все
						хотят что-то от вас.
					</p>
				</div>

				<div className='main-menu-rules'>
					<h3 className='rules-title'>Правила игры</h3>
					<ul className='screen-rules'>
						<li>
							<span className='rule-icon'>⚔️</span>
							<span className='rule-text'>
								Держите четыре ресурса выше нуля: <strong>Репутация</strong>,{' '}
								<strong>Уважение</strong>, <strong>Здоровье</strong> и{' '}
								<strong>Дух</strong>.
							</span>
						</li>
						<li>
							<span className='rule-icon'>💬</span>
							<span className='rule-text'>
								На каждую просьбу NPC отвечайте одной из трёх отмазок.
							</span>
						</li>
						<li>
							<span className='rule-icon'>✨</span>
							<span className='rule-text'>
								Верный тип отмазки радует NPC и даёт бонусы.
							</span>
						</li>
						<li>
							<span className='rule-icon'>⚠️</span>
							<span className='rule-text'>
								Неверный — злит и усиливает штрафы.
							</span>
						</li>
					</ul>
				</div>

				<button
					type='button'
					className='primary-button main-menu-button'
					onClick={startNewGame}
				>
					<span className='button-text'>Начать игру</span>
					<span className='button-arrow'>→</span>
				</button>
			</div>
		</div>
	)
}

export default MainMenu
