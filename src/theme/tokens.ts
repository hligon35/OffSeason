export const theme = {
  colors: {
    black: '#000000',
    white: '#FFFFFF',
    red: '#E50914',
    gray: {
      50: '#FAFAFA',
      100: '#F4F4F5',
      200: '#E4E4E7',
      300: '#D4D4D8',
      400: '#A1A1AA',
      500: '#71717A',
      600: '#52525B',
      700: '#3F3F46',
      800: '#27272A',
      900: '#18181B',
    },
  },
  typography: {
    headlineFont: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
    bodyFont: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
    headlineWeight: 800,
    bodyWeight: 400,
  },
  spacing: {
    pageX: { base: 12, sm: 16, lg: 24 },
    gutter: { base: 12, lg: 24 },
    moduleGap: 16,
  },
  layout: {
    maxWidth: 1536,
    sidebarWidth: 340,
    headerHeight: 56,
  },
} as const
