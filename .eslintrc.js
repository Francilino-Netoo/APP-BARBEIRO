module.exports = {
  root: true,
  extends: '@react-native',
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        parser: 'flow',
        endOfLine: 'off',
      },
    ],
    'react-hooks/rules-of-hooks': 'error', // Habilita a regra para verificar o uso correto dos hooks
    'react-hooks/exhaustive-deps': 'warn',
  },
};
