import type { NpcType } from '../types'

export const NPC_LABELS: Record<NpcType, string> = {
	sensei: 'Сэнсэй',
	shogun: 'Сёгун',
	geisha: 'Гейша',
	ronin: 'Ронин',
}

export const NPC_IMAGES: Record<NpcType, string> = {
	sensei: '/assets/sensei/sensei.png',
	shogun: '/assets/shogun/shogun.png',
	geisha: '/assets/geisha/geisha.png',
	ronin: '/assets/ronin/ronin.png',
}
