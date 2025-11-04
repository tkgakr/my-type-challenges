module.exports = {
  root: true,
  extends: [
    '@antfu',
  ],
  rules: {
    // オリジナルのtype-challengesのルールに準拠
    'no-console': 'off',
    'no-restricted-syntax': 'off',
    'no-undef': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'unused-imports/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'off',
    'import/order': ['error', {
      groups: [
        'builtin',
        'external',
        'internal',
        'parent',
        'sibling',
        'index',
        'object',
        'type',
      ],
    }],
    
    // フォーマット関連のルール
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'semi': ['error', 'never'],
    'comma-dangle': ['error', 'always-multiline'],
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'never',
      asyncArrow: 'always',
    }],
    'arrow-parens': ['error', 'as-needed'],
    'arrow-spacing': ['error', { before: true, after: true }],
    'key-spacing': ['error', { beforeColon: false, afterColon: true }],
    'keyword-spacing': ['error', { before: true, after: true }],
    'space-infix-ops': 'error',
    'no-multi-spaces': 'error',
    'no-trailing-spaces': 'error',
    'eol-last': ['error', 'always'],
  },
}
