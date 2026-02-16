import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
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
            900: '#18181B'
          }
        }
      },
      fontWeight: {
        headline: '800'
      },
      letterSpacing: {
        tightish: '-0.01em'
      },
      maxWidth: {
        'screen-2xl': '1536px'
      }
    }
  },
  plugins: []
}

export default config
