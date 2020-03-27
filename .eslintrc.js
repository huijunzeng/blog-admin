// ESLint  javascript代码检测工具
module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ['plugin:vue/recommended', 'eslint:recommended'],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'space-before-function-paren': 0,
        'indent': ['off', 2],
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}
