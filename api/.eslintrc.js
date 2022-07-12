module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: [
    'specs/**/*.ts',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    indent: ['error', 2],
    'comma-dangle': ['error', 'always-multiline'],
    'comma-spacing': [1, { 'after': true }],
    'space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'always',
      asyncArrow: 'always',
    }],
    'space-before-blocks': ['error', 'always'],
    'key-spacing': [1, { 'afterColon': true }],
    'object-curly-spacing': ['error', 'always'],
    '@typescript-eslint/type-annotation-spacing': ['error', { after: true }],
    'no-console': ['error', { allow: ['log', 'warn', 'error'] }],
  },
}
