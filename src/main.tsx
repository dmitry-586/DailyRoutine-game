import { ScreenContainer } from '@/shared'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/app.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ScreenContainer>
			<App />
		</ScreenContainer>
	</StrictMode>
)
