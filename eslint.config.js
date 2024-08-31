import eslint from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintImportX from 'eslint-plugin-import-x'
import eslintNoRelativeImportPaths from 'eslint-plugin-no-relative-import-paths'
import eslintPrettierRecommended from 'eslint-plugin-prettier/recommended'
import eslintVue from 'eslint-plugin-vue'
import eslintVueA11y from 'eslint-plugin-vuejs-accessibility'
import globals from 'globals'
import tsEslint from 'typescript-eslint'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Base
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      ecmaVersion: 'latest',
      sourceType: 'module'
    }
  },
  {
    files: ['**/*.js', '**/*.ts', '**/*.vue']
  },
  {
    ignores: ['node_modules', '.nuxt']
  },

  // For JavaScript
  eslint.configs.recommended,

  // For TypeScript
  ...tsEslint.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        parser: tsEslint.parser,
        projectService: {
          defaultProject: 'tsconfig.json'
        },
        extraFileExtensions: ['.vue']
      }
    },
    rules: {
      '@typescript-eslint/no-unused-expressions': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn'
    }
  },

  // For Vue

  // eslint-plugin-vue languageOptions.sourceType is string
  // which is not compatible with typescript-eslint defined SourceType,
  // but it's ok so we ignore it as below
  // @ts-expect-error - eslint-plugin-vue languageOptions
  ...eslintVue.configs['flat/recommended'],
  ...eslintVueA11y.configs['flat/recommended'],
  {
    rules: {
      'vue/component-tags-order': [
        'error',
        {
          order: ['script', 'template', 'style']
        }
      ]
    }
  },

  // For Imports
  {
    plugins: {
      'import-x': eslintImportX
    },
    settings: {
      'import-x/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx']
      },
      'import-x/resolver': {
        typescript: true,
        node: true
      }
    },
    rules: {
      'import-x/no-unresolved': 'error'
    }
  },
  {
    plugins: {
      'no-relative-import-paths': eslintNoRelativeImportPaths
    },
    rules: {
      'no-relative-import-paths/no-relative-import-paths': [
        'error',
        {
          allowSameFolder: true
        }
      ]
    }
  },

  // For Custom Rules
  {
    rules: {
      'no-console': 'error',
      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: '*',
          next: ['return', 'block', 'block-like', 'const', 'let', 'var', 'continue']
        },
        {
          blankLine: 'always',
          prev: ['const', 'let', 'var'],
          next: '*'
        },
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var']
        }
      ]
    }
  },

  // For Prettier
  eslintPrettierRecommended,
  eslintConfigPrettier
)
