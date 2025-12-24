import type { NpcType } from '../types'

export const pickNpcForMeeting = (
	meetingIndex: number,
	previousNpcType: NpcType | null = null
): NpcType => {
	const allNpcs: NpcType[] = ['sensei', 'ronin', 'geisha', 'shogun']
	let pool: NpcType[]

	if (meetingIndex < 5) {
		pool = ['sensei', 'ronin'] as NpcType[]
	} else if (meetingIndex < 10) {
		pool = ['sensei', 'ronin', 'geisha'] as NpcType[]
	} else {
		pool = [...allNpcs]
	}

	// Исключаем предыдущего NPC, если он есть
	if (previousNpcType) {
		pool = pool.filter(npc => npc !== previousNpcType)
	}

	// Если после фильтрации пул пуст (не должно случиться, но на всякий случай)
	if (pool.length === 0) {
		pool = allNpcs.filter(npc => npc !== previousNpcType)
	}

	return pool[Math.floor(Math.random() * pool.length)]
}
