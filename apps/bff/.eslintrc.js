module.exports = {
  root: true,

  // This tells ESLint to load the config from the package `eslint-config-custom/nest`
  extends: ['custom/nest'],

  parserOptions: {
    // このアプリの tsconfig.json を参照する
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaVersion: 'es2022',
  },

  // このアプリだけに適用するルールを追加する
  rules: {},

  // 設定を上書きする場合はここに書く
  overrides: [],
};
