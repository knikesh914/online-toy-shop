import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    },
    theme: {
      defaultTheme: 'light',
      themes: {
        light: {
          dark: false,
          colors: {
            primary: '#6366F1',
            secondary: '#EC4899',
            accent: '#F59E0B',
            success: '#10B981',
            info: '#06B6D4',
            warning: '#F97316',
            error: '#EF4444',
            background: '#F8FAFC',
            surface: '#FFFFFF',
          },
        },
      },
    },
  })

  nuxtApp.vueApp.use(vuetify)
})
