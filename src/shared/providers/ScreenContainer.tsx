import type { ReactNode } from 'react'

export interface ScreenContainerProps {
	children: ReactNode
	className?: string
}

export function ScreenContainer({ children, className }: ScreenContainerProps) {
	return (
		<section
			className={[
				'w-screen h-screen max-w-5xl mx-auto relative',
				className
			].join(' ')}
		>
			{children}
		</section>
	)
}
