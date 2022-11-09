module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'stylelint-config-recess-order',
    'stylelint-prettier/recommended',
  ],
  overrides: [
    {
      files: ['src/**/*.{js,ts,jsx,tsx}'],
      customSyntax: '@stylelint/postcss-css-in-js',
    },
  ],
  rules: {
    'comment-empty-line-before': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
    'color-function-notation': 'legacy',
    'scss/at-import-partial-extension': 'always',
    'function-url-quotes': 'never',
    'number-max-precision': 10,
    'no-invalid-position-at-import-rule': null,
    'selector-class-pattern': null,
    'rule-empty-line-before': null,
    'scss/dollar-variable-pattern': null,
    'scss/double-slash-comment-empty-line-before': null,
    'scss/no-global-function-names': null,
    'scss/dollar-variable-empty-line-before': null,
  },
};
