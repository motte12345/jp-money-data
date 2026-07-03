import { ViteReactSSG } from 'vite-react-ssg'
import './styles.css'
import { routes } from './App'

export const createRoot = ViteReactSSG({ routes })
