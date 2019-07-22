// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true
  },
  extends: [
    'plugin:vue/essential',
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 1 : 0,
    'no-console': process.env.NODE_ENV === 'production' ? 1 : 0,
    'no-mixed-spaces-and-tabs': 0,
    'eol-last': 0,
    'no-trailing-spaces': 0,
    'no-irregular-whitespace': 0,
    'no-unused-vars': [0, { 'vars': 'all', 'args': 'after-used' }],
    'no-multi-spaces': 0,
    'no-trailing-spaces': 0,
    'indent': [0, 2],
    'no-alert': 1,
    'no-tabs': 'off',
    'no-new': 'off',
    'space-before-function-paren': [1, 'always'],
    // 结尾禁止分号
    'semi': 1,
    'quotes': [1, 'single']
  }
}
