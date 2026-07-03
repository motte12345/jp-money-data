import type { RouteRecord } from 'vite-react-ssg'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import DatasetsIndexPage from './pages/DatasetsIndexPage'
import DatasetDetailPage from './pages/DatasetDetailPage'
import GettingStartedPage from './pages/GettingStartedPage'
import SchemaPage from './pages/SchemaPage'
import LicensePage from './pages/LicensePage'
import ChangelogPage from './pages/ChangelogPage'
import AboutPage from './pages/AboutPage'
import NotFoundPage from './pages/NotFoundPage'

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'datasets', element: <DatasetsIndexPage /> },
      { path: 'datasets/:id', element: <DatasetDetailPage /> },
      { path: 'docs/getting-started', element: <GettingStartedPage /> },
      { path: 'docs/schema', element: <SchemaPage /> },
      { path: 'docs/license', element: <LicensePage /> },
      { path: 'changelog', element: <ChangelogPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]
