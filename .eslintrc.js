module.exports = {
  extends: ['@hitechline', '@hitechline/eslint-config/typescript'],
  rules: {
    'no-console': 'off',
    'global-require': 'off',

    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-var-requires': 'off',

    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        'alphabetize': {
          order: 'asc',
          caseInsensitive: true,
        },
        'groups': [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index'],
          'object',
        ],
      },
    ],
  },
};
