export const BACKGROUND_MAP: Record<string, string> = {
	bg_1: '/assets/backgrounds/bg-1.png',
	bg_1_mobile: '/assets/backgrounds/bg-1-mobile.png',
	bg_2_mobile: '/assets/backgrounds/bg-2-mobile.png',
}

export const DEFAULT_BACKGROUND = '/assets/backgrounds/bg-1.png'

export const getBackgroundUrl = (currentBackground: string | null): string => {
	if (!currentBackground) return DEFAULT_BACKGROUND
	return BACKGROUND_MAP[currentBackground] || DEFAULT_BACKGROUND
}
