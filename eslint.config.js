import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import prettierConfig from 'eslint-config-prettier'

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.strict,
  {
    plugins: {
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11y,
    },
    rules: {
      ...reactHooksPlugin.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
  },
  prettierConfig,
  {
    ignores: ['dist/**', 'node_modules/**', 'eslint.config.js'],
  },
)
