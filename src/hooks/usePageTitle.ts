import { useEffect } from 'react'

const BASE_TITLE = 'Zara | Smartphones'

export const usePageTitle = (pageTitle?: string): void => {
  useEffect(() => {
    document.title = pageTitle ? `${pageTitle} — ${BASE_TITLE}` : BASE_TITLE
    return () => {
      document.title = BASE_TITLE
    }
  }, [pageTitle])
}
