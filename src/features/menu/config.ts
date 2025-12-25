import {
	AlertTriangle,
	MessageCircle,
	Sparkles,
	Sword,
	type LucideIcon,
} from 'lucide-react'

interface RuleCard {
	emoji: LucideIcon
	title: string
	description: string
}

const rules: RuleCard[] = [
	{
		emoji: Sword,
		title: 'Четыре ресурса',
		description: 'Держите Репутацию, Уважение, Здоровье и Дух выше нуля.',
	},
	{
		emoji: MessageCircle,
		title: 'Три отмазки',
		description: 'На каждую просьбу NPC отвечайте одной из трёх отмазок.',
	},
	{
		emoji: Sparkles,
		title: 'Верный выбор',
		description: 'Верный тип отмазки радует NPC и даёт бонусы.',
	},
	{
		emoji: AlertTriangle,
		title: 'Осторожно',
		description: 'Неверный выбор злит NPC и усиливает штрафы.',
	},
]

export { rules }
