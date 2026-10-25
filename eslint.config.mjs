import pluginVue from 'eslint-plugin-vue'
import vueTs from '@vue/eslint-config-typescript'
import globals from 'globals'

export default [
  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/node_modules/**', '**/*.d.ts', 'scripts/**']
  },
  ...pluginVue.configs['flat/recommended'],
  ...vueTs(),
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }]
    }
  }
]
