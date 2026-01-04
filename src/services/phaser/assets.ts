// Ключи текстур для NPC
export const NPC_TEXTURE_KEYS: Record<string, string> = {
	sensei: 'npc_sensei',
	shogun: 'npc_shogun',
	geisha: 'npc_geisha',
	ronin: 'npc_ronin',
	craftsman: 'npc_craftsman',
	elder: 'npc_elder',
	merchant: 'npc_merchant',
	peasant: 'npc_peasant',
	poet: 'npc_poet',
	samurai: 'npc_samurai',
}

// Регистрация ассетов для Phaser
export const registerGameAssets = (
	loader: Phaser.Loader.LoaderPlugin
): void => {
	// NPC карты
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
