export const toHttps = (url: string | undefined): string =>
  url ? url.replace(/^http:\/\//, 'https://') : ''
