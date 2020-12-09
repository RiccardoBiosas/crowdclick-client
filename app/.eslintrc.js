module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    semi: [2, 'never'],
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx'] }],
    'jsx-a11y/click-events-have-key-events': [0],
    'jsx-a11y/no-noninteractive-element-to-interactive-role': [0],
  },
}
