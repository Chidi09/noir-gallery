/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      /* -------------------------------------------------------------------------
         Colors - Using CSS Custom Properties (Design Tokens)
         These reference the token system defined in tokens.css
         ------------------------------------------------------------------------- */
      colors: {
        // Surface Scale
        'surface-dim': 'var(--color-surface-dim)',
        'surface': 'var(--color-surface)',
        'surface-container-lowest': 'var(--color-surface-container-lowest)',
        'surface-container-low': 'var(--color-surface-container-low)',
        'surface-container': 'var(--color-surface-container)',
        'surface-container-high': 'var(--color-surface-container-high)',
        'surface-container-highest': 'var(--color-surface-container-highest)',
        'surface-bright': 'var(--color-surface-bright)',
        'surface-variant': 'var(--color-surface-variant)',
        
        // Primary Scale (Electric Yellow)
        'primary': 'var(--color-primary)',
        'primary-dim': 'var(--color-primary-dim)',
        'primary-container': 'var(--color-primary-container)',
        'on-primary': 'var(--color-on-primary)',
        'on-primary-container': 'var(--color-on-primary-container)',
        'primary-fixed': 'var(--color-primary-fixed)',
        'primary-fixed-dim': 'var(--color-primary-fixed-dim)',
        'on-primary-fixed': 'var(--color-on-primary-fixed)',
        'on-primary-fixed-variant': 'var(--color-on-primary-fixed-variant)',
        'inverse-primary': 'var(--color-inverse-primary)',
        
        // Secondary Scale (Neon Purple)
        'secondary': 'var(--color-secondary)',
        'secondary-dim': 'var(--color-secondary-dim)',
        'secondary-container': 'var(--color-secondary-container)',
        'on-secondary': 'var(--color-on-secondary)',
        'on-secondary-container': 'var(--color-on-secondary-container)',
        'secondary-fixed': 'var(--color-secondary-fixed)',
        'secondary-fixed-dim': 'var(--color-secondary-fixed-dim)',
        'on-secondary-fixed': 'var(--color-on-secondary-fixed)',
        'on-secondary-fixed-variant': 'var(--color-on-secondary-fixed-variant)',
        
        // Tertiary Scale (Warm Gold)
        'tertiary': 'var(--color-tertiary)',
        'tertiary-dim': 'var(--color-tertiary-dim)',
        'tertiary-container': 'var(--color-tertiary-container)',
        'on-tertiary': 'var(--color-on-tertiary)',
        'on-tertiary-container': 'var(--color-on-tertiary-container)',
        'tertiary-fixed': 'var(--color-tertiary-fixed)',
        'tertiary-fixed-dim': 'var(--color-tertiary-fixed-dim)',
        'on-tertiary-fixed': 'var(--color-on-tertiary-fixed)',
        'on-tertiary-fixed-variant': 'var(--color-on-tertiary-fixed-variant)',
        
        // Content Colors
        'on-surface': 'var(--color-on-surface)',
        'on-surface-variant': 'var(--color-on-surface-variant)',
        'on-background': 'var(--color-on-background)',
        'inverse-surface': 'var(--color-inverse-surface)',
        'inverse-on-surface': 'var(--color-inverse-on-surface)',
        'surface-tint': 'var(--color-surface-tint)',
        
        // Utility Colors
        'outline': 'var(--color-outline)',
        'outline-variant': 'var(--color-outline-variant)',
        'background': 'var(--color-background)',
        
        // Error Colors
        'error': 'var(--color-error)',
        'error-dim': 'var(--color-error-dim)',
        'error-container': 'var(--color-error-container)',
        'on-error': 'var(--color-on-error)',
        'on-error-container': 'var(--color-on-error-container)',
      },
      
      /* -------------------------------------------------------------------------
         Typography - Using CSS Custom Properties
         ------------------------------------------------------------------------- */
      fontFamily: {
        'headline': ['var(--font-headline)', 'sans-serif'],
        'body': ['var(--font-body)', 'sans-serif'],
        'label': ['var(--font-label)', 'sans-serif'],
      },
      
      fontSize: {
        'display-lg': ['var(--text-display-lg)', { lineHeight: 'var(--leading-display)', letterSpacing: 'var(--tracking-display)' }],
        'display-md': ['var(--text-display-md)', { lineHeight: 'var(--leading-display)', letterSpacing: 'var(--tracking-display)' }],
        'headline-lg': ['var(--text-headline-lg)', { lineHeight: 'var(--leading-headline)', letterSpacing: 'var(--tracking-headline)' }],
        'headline-md': ['var(--text-headline-md)', { lineHeight: 'var(--leading-headline)', letterSpacing: 'var(--tracking-headline)' }],
        'headline-sm': ['var(--text-headline-sm)', { lineHeight: 'var(--leading-headline)', letterSpacing: 'var(--tracking-headline)' }],
        'body-lg': ['var(--text-body-lg)', { lineHeight: 'var(--leading-body)' }],
        'body-md': ['var(--text-body-md)', { lineHeight: 'var(--leading-body)' }],
        'label-md': ['var(--text-label-md)', { lineHeight: 'var(--leading-label)', letterSpacing: 'var(--tracking-label)' }],
      },
      
      /* -------------------------------------------------------------------------
         Border Radius - Using CSS Custom Properties
         ------------------------------------------------------------------------- */
      borderRadius: {
        'none': 'var(--radius-none)',
        'sm': 'var(--radius-sm)',
        'DEFAULT': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
        'full': 'var(--radius-full)',
      },
      
      /* -------------------------------------------------------------------------
         Spacing - Using CSS Custom Properties
         ------------------------------------------------------------------------- */
      spacing: {
        '0': 'var(--space-0)',
        '1': 'var(--space-1)',
        '2': 'var(--space-2)',
        '3': 'var(--space-3)',
        '4': 'var(--space-4)',
        '5': 'var(--space-5)',
        '6': 'var(--space-6)',
        '8': 'var(--space-8)',
        '10': 'var(--space-10)',
        '12': 'var(--space-12)',
        '16': 'var(--space-16)',
        '20': 'var(--space-20)',
        '24': 'var(--space-24)',
        '32': 'var(--space-32)',
      },
      
      /* -------------------------------------------------------------------------
         Max Width - Using CSS Custom Properties
         ------------------------------------------------------------------------- */
      maxWidth: {
        'xs': 'var(--max-width-xs)',
        'sm': 'var(--max-width-sm)',
        'md': 'var(--max-width-md)',
        'lg': 'var(--max-width-lg)',
        'xl': 'var(--max-width-xl)',
        '2xl': 'var(--max-width-2xl)',
        '3xl': 'var(--max-width-3xl)',
        '4xl': 'var(--max-width-4xl)',
        '5xl': 'var(--max-width-5xl)',
        '6xl': 'var(--max-width-6xl)',
        '7xl': 'var(--max-width-7xl)',
      },
      
      /* -------------------------------------------------------------------------
         Box Shadow - Using CSS Custom Properties
         ------------------------------------------------------------------------- */
      boxShadow: {
        'none': 'var(--shadow-none)',
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
        'glow-primary': 'var(--glow-primary)',
        'glow-secondary': 'var(--glow-secondary)',
      },
      
      /* -------------------------------------------------------------------------
         Transitions - Using CSS Custom Properties
         ------------------------------------------------------------------------- */
      transitionTimingFunction: {
        'cinematic': 'var(--ease-cinematic)',
        'spring': 'var(--ease-spring)',
        'smooth': 'var(--ease-smooth)',
      },
      
      transitionDuration: {
        'instant': 'var(--duration-instant)',
        'fast': 'var(--duration-fast)',
        'normal': 'var(--duration-normal)',
        'slow': 'var(--duration-slow)',
        'slower': 'var(--duration-slower)',
      },
      
      /* -------------------------------------------------------------------------
         Z-Index - Using CSS Custom Properties
         ------------------------------------------------------------------------- */
      zIndex: {
        'hide': 'var(--z-hide)',
        'base': 'var(--z-base)',
        'docked': 'var(--z-docked)',
        'dropdown': 'var(--z-dropdown)',
        'sticky': 'var(--z-sticky)',
        'banner': 'var(--z-banner)',
        'overlay': 'var(--z-overlay)',
        'modal': 'var(--z-modal)',
        'popover': 'var(--z-popover)',
        'toast': 'var(--z-toast)',
        'tooltip': 'var(--z-tooltip)',
        'top': 'var(--z-top)',
      },
    },
  },
  plugins: [],
}
