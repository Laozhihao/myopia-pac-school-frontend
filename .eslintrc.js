module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
  },
  rules: {
    'global-require': [0],
    'no-console': 'off',
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'prefer-promise-reject-errors': 'off',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
    'react/no-array-index-key': 'off',
    'no-param-reassign': 'off',
  },
};
