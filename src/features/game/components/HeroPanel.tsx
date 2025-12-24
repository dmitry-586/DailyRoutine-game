function HeroPanel() {
	return (
		<div className='hero-panel'>
			<div className='hero-avatar-frame'>
				<img
					src='/assets/samurai/samurai.png'
					alt='Ленивый самурай'
					className='hero-avatar-image'
				/>
			</div>
			<div className='hero-info'>
				<div className='hero-name'>Ленивый самурай</div>
				<div className='hero-subtitle'>Главный герой</div>
			</div>
		</div>
	)
}

export default HeroPanel
