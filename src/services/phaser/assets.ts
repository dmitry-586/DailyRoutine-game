import type Phaser from 'phaser'

// Ключи текстур для NPC
export const NPC_TEXTURE_KEYS: Record<string, string> = {
	sensei: 'sensei',
	shogun: 'shogun',
	geisha: 'geisha',
	ronin: 'ronin',
	craftsman: 'craftsman',
	elder: 'elder',
	merchant: 'merchant',
	peasant: 'peasant',
	poet: 'poet',
	samurai: 'samurai'
}

export const registerGameAssets = (
	loader: Phaser.Loader.LoaderPlugin
): void => {
	loader.image(NPC_TEXTURE_KEYS.sensei, '/assets/sensei/sensei.png')
	loader.image(NPC_TEXTURE_KEYS.ronin, '/assets/ronin/ronin.png')
	loader.image(NPC_TEXTURE_KEYS.shogun, '/assets/shogun/shogun.png')
	loader.image(NPC_TEXTURE_KEYS.geisha, '/assets/geisha/geisha.png')
	loader.image(NPC_TEXTURE_KEYS.craftsman, '/assets/craftsman/craftsman.png')
	loader.image(NPC_TEXTURE_KEYS.elder, '/assets/elder/elder.png')
	loader.image(NPC_TEXTURE_KEYS.merchant, '/assets/merchant/merchant.png')
	loader.image(NPC_TEXTURE_KEYS.peasant, '/assets/peasant/peasant.png')
	loader.image(NPC_TEXTURE_KEYS.poet, '/assets/poet/poet.png')
	loader.image(NPC_TEXTURE_KEYS.samurai, '/assets/samurai/samurai.png')
}
