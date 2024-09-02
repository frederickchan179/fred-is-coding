export default {
  plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-tailwindcss'],
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
