module.exports = {
  root: true,

  // This tells ESLint to load the config from the package `eslint-config-custom/nest`
  extends: ['custom/nest'],

  // このアプリだけに適用するルールを追加する
  rules: {},

  // 設定を上書きする場合はここに書く
  overrides: [],
};
