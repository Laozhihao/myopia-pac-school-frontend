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
    'no-nested-ternary': 'off',
    '@typescript-eslint/no-magic-numbers': [
      'error',
      {
        ignoreArrayIndexes: true,
        ignoreEnums: true,
        ignoreNumericLiteralTypes: true,
        ignore: [
          -1, 0, 1, 2, 3, 4, 6, 8, 14, 15, 40, 60, 100, 140, 200, 500, 550, 1000, 1024, 8001,
        ],
      },
    ], // 禁止使用魔术数字，魔术数字是在代码中多次出现的没有明确含义的数字。它最好由命名常量取代。
  },
};
