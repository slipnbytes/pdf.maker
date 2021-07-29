module.exports = {
  extends: ['@hitechline', '@hitechline/eslint-config/typescript'],
  rules: {
    'global-require': 'off',

    'no-console': 'off',
    'no-useless-constructor': 'off',

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
