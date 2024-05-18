module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    // 'airbnb',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-unused-vars': 'warn',
    'react/react-in-jsx-scope': 0,
    'react/jsx-filename-extension': 0,
    'import/extensions': 0,
    'linebreak-style': 0,
    'import/no-unresolved': 0,
    '@typescript-eslint/no-explicit-any': 'warn',
  },
}
