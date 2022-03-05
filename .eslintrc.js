module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2022,
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'jest'
  ],
  ignorePatterns: ['.eslintrc.js', 'babel.config.js', 'metro.config.js', 'index.js'],
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
  ],
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  rules: {
    "no-console": "off",
    // Too restrictive, writing ugly code to defend against a very unlikely scenario: https://eslint.org/docs/rules/no-prototype-builtins
    'no-prototype-builtins': 'off',
    // Too restrictive: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
    'react/destructuring-assignment': 'off',
    "import/extensions": ['error', 'never'],
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-unused-expressions": "off",
    "no-param-reassign": "off",
    "react/jsx-props-no-spreading": "off",
    "react/require-default-props": [0],
    "no-return-await": "off",
    "@typescript-eslint/return-await": "off",
    // Use function hoisting to improve code readability
    'no-use-before-define': [
      'error',
      { functions: false, classes: true, variables: true },
    ],
    '@typescript-eslint/no-use-before-define': [
      'error',
      { functions: false, classes: true, variables: true, typedefs: true },
    ],
  }
};
