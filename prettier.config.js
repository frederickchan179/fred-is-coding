export default {
  plugins: ['prettier-plugin-tailwindcss', 'prettier-plugin-organize-imports'],
  printWidth: 120,
  semi: false,
  singleQuote: true,
  trailingComma: 'none',
  jsxSingleQuote: true,
  bracketSpacing: true,
  bracketSameLine: false,
  useTabs: false,
  tabWidth: 2,
  arrowParens: 'always',
  overrides: [
    {
      files: ['**/*.css', '**/*.html'],
      options: {
        singleQuote: false
      }
    }
  ]
}
