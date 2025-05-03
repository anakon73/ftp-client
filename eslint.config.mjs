import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'max-len': ['error', { code: 80 }],
    'perfectionist/sort-imports': ['off'],
    'import/order': ['off'],
    'unused-imports/no-unused-imports': 'off',
    'import/consistent-type-specifier-style': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/no-redeclare': 'off',
    'node/prefer-global/process': 'off',
  },
})
