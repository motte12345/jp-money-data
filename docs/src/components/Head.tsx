import { Head as SSGHead } from 'vite-react-ssg'
import { SITE } from '../site'

type Props = {
  title: string
  description: string
  path: string
}

export default function Head({ title, description, path }: Props) {
  const url = `${SITE}${path}`
  return (
    <SSGHead>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </SSGHead>
  )
}
