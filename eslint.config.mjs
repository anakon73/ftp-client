import antfu from '@antfu/eslint-config'
import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss'

export default antfu({
  plugins: {
    'better-tailwindcss': eslintPluginBetterTailwindcss,
  },
  rules: {
    'max-len': ['error', { code: 80 }],
    'perfectionist/sort-imports': ['off'],
    'import/order': ['off'],
    'unused-imports/no-unused-imports': 'off',
    'import/consistent-type-specifier-style': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/no-redeclare': 'off',
    'node/prefer-global/process': 'off',
    'node/prefer-global/buffer': 'off',
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 3,
      },
      multiline: {
        max: 1,
      },
    }],
    ...eslintPluginBetterTailwindcss.configs['recommended-warn'].rules,
    ...eslintPluginBetterTailwindcss.configs['recommended-error'].rules,
    'better-tailwindcss/multiline': ['warn', { printWidth: 80 }],
  },
})
