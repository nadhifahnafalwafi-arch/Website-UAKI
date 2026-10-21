import PagePlaceholder from '@/components/PagePlaceholder'
import usePageMeta from '@/lib/usePageMeta'
import { pageMeta } from '@/lib/siteData'

export default function News() {
  usePageMeta(pageMeta.news)
  return <PagePlaceholder name="Berita" />
}
