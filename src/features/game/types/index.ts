export type FactorKey = 'reputation' | 'respect' | 'health' | 'spirit'

export interface FactorState {
	reputation: number
	respect: number
	health: number
	spirit: number
}

export type NpcType = 'sensei' | 'shogun' | 'geisha' | 'ronin'

export interface NpcState {
	type: NpcType
	lastExcuseType: ExcuseType | null
}

export type ExcuseType =
	| 'polite'
	| 'respectful'
	| 'creative'
	| 'funny'
	| 'impudent'
	| 'mystic'

export interface ExcuseEffect {
	factor: FactorKey
	delta: number
}

export interface ExcuseDefinition {
	id: ExcuseType
	label: string
	description: string
	effects: readonly ExcuseEffect[]
}

export interface ExcuseOption {
	type: ExcuseType
	text: string
}

export type EncounterOutcomeType = 'success' | 'failure'

export interface ComboState {
	successStreak: number
	failureStreak: number
}

export interface EncounterFactorDelta {
	reputation: number
	respect: number
	health: number
	spirit: number
}

export interface EncounterResult {
	outcome: EncounterOutcomeType
	factorDelta: EncounterFactorDelta
	updatedFactors: FactorState
	updatedCombo: ComboState
}

export interface GameStats {
	meetingsCount: number
	successfulExcuses: number
	failedExcuses: number
	maxReputation: number
	bestSuccessStreak: number
}

export interface GameDifficultyState {
	effectMultiplier: number
	npcDemandLevel: number
}

export type GamePhase = 'menu' | 'playing' | 'gameOver'

export interface DefeatInfo {
	factor: FactorKey
	message: string
}
