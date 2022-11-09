module.exports = {
  extends: ['next/core-web-vitals', './index.js'],
  settings: {
    next: {
      rootDir: ['apps/*/'],
    },
  },

  // next だけに適用するルールを追加する
  rules: {},

  // base の設定を上書きする場合はここに書く
  overrides: [],
};
