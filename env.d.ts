/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL: string
  readonly VITE_COLOR_PRIMARY: string
  readonly VITE_COLOR_PRIMARY_DARK: string
  readonly VITE_COLOR_SECONDARY: string
  readonly VITE_COLOR_ACCENT: string
  readonly VITE_COLOR_BG: string
  readonly VITE_COLOR_SURFACE: string
  readonly VITE_COLOR_TEXT: string
  readonly VITE_COLOR_TEXT_MUTED: string
  readonly VITE_COLOR_DANGER: string
  readonly VITE_COLOR_SUCCESS: string
  readonly VITE_CONTACT_URL: string
  readonly VITE_VIDEO_CALL_URL: string
  readonly VITE_FORM_ENDPOINT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
