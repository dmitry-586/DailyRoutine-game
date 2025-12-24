import type { NpcType } from '../../features/game/types'

export const HERO_TEXTURE_KEY = 'hero_samurai'

export const BACKGROUND_TEXTURE_KEYS = [
	'bg_1',
	'bg_1_mobile',
	'bg_2_mobile',
] as const

export const NPC_TEXTURE_KEYS: Record<NpcType, string> = {
	sensei: 'npc_sensei',
	shogun: 'npc_shogun',
	geisha: 'npc_geisha',
	ronin: 'npc_ronin',
}

export const registerGameAssets = (
	loader: Phaser.Loader.LoaderPlugin
): void => {
	// Фоны
	loader.image('bg_1', '/assets/backgrounds/bg-1.png')
	loader.image('bg_1_mobile', '/assets/backgrounds/bg-1-mobile.png')
	loader.image('bg_2_mobile', '/assets/backgrounds/bg-2-mobile.png')

	// Герой
	loader.image(HERO_TEXTURE_KEY, '/assets/samurai/samurai.png')

	// NPC
	loader.image(NPC_TEXTURE_KEYS.sensei, '/assets/sensei/sensei.png')
	loader.image(NPC_TEXTURE_KEYS.ronin, '/assets/ronin/ronin.png')
	loader.image(NPC_TEXTURE_KEYS.shogun, '/assets/shogun/shogun.png')
	loader.image(NPC_TEXTURE_KEYS.geisha, '/assets/geisha/geisha.png')
}
