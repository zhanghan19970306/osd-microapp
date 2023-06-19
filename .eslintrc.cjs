/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  env: {
    'browser': true,
    'node': true,
    'commonjs': true,
    'es6': true,
    /**
     * eslint规则需要显式的导入'defineProps'和 'defineEmits'编译器宏，但是会在build/dev阶段会有警告
     * @desc 设置vue3的编译宏
     */
    'vue/setup-compiler-macros': true,
  },
  extends: [
    'airbnb-base',
    'plugin:vue/vue3-strongly-recommended',
    'plugin:import/recommended',
    'plugin:promise/recommended',
    '@vue/eslint-config-prettier/skip-formatting',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['simple-import-sort', 'check-file'],
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
      },
    },
  },
  rules: {
    /**
     * @desc 捕获当前执行上下文时强制一致命名
     */
    'consistent-this': ['error', 'that'],

    /**
     * 可以在catch块当中 使用console.error()方法
     * @desc 不允许调用console方法
     */
    'no-console': ['warn', { allow: ['error'] }],

    /**
     * @desc 不允许debugger
     */
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

    /**
     * @desc 不允许指定的语法
     */
    'no-restricted-syntax': [
      'warn',
      {
        selector: 'ForInStatement',
        message:
          'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      {
        selector: 'ForOfStatement',
        message:
          'iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations.',
      },
      {
        selector: 'LabeledStatement',
        message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],

    /**
     * @desc 不允许使用未使用的表达式
     */
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
      },
    ],

    /**
     * @desc 需要使用==和==
     */
    'eqeqeq': 'off',

    /**
     * @desc 强制camelcase命名约定
     */
    'camelcase': 'off',

    /**
     * @desc 要求return语句始终或从不指定值
     */
    'consistent-return': 'off',

    /**
     * @desc 不允许变量声明隐藏在外部范围中声明的变量
     */
    'no-shadow': 'off',

    /**
     * @desc 不允许一元运算符++和--
     */
    'no-plusplus': 'off',

    /**
     * @desc 不允许标识符中的悬挂下划线
     */
    'no-underscore-dangle': [
      'warn',
      {
        allow: [],
        allowAfterThis: false,
        allowAfterSuper: false,
        enforceInMethodNames: true,
      },
    ],

    /**
     * 配合simple-import-sort插件 进行导入的排序
     */
    'simple-import-sort/imports': 'error',

    /**
     * 配合simple-import-sort插件 进行导出的排序
     */
    'simple-import-sort/exports': 'error',

    /**
     * 事实上 我们经常会只用来发请求 没有必要 非要有返回值
     * @desc promise then必须要有返回值
     */
    'promise/always-return': 'off',

    /**
     * 有很大的争议 争议点: 不能明确的告知catch方法里面会怎么写 会导致错误被隐藏。
     * @desc 确保每一个Promise的then最后 必须要跟上catch
     */
    'promise/catch-or-return': 'off',

    /**
     * 强制给报错 Tip: 推荐使用async await来规避
     * @desc 避免嵌套的then或catch语句
     */
    'promise/no-nesting': 'error',

    /**
     * @desc 不允许重新分配函数参数
     */
    'no-param-reassign': ['off', { props: false }],

    /**
     * @desc 不允许在分配或比较之外使用新运算符
     */
    'no-new': 'off',

    /**
     * 允许requrei和import
     */
    'import/no-unresolved': ['error', { commonjs: true }],

    /**
     * @desc 禁止导入包中未声明的外部模块。
     */

    /**
     * 在任何情况下都应该使用命名导出
     * @desc 当一个模块只有一个导出时，首选使用默认导出而不是命名导出。
     */
    'import/prefer-default-export': 'off',

    /**
     * @desc 确保没有通过依赖项返回此模块的可解析路径(禁止循环依赖深度)。
     */
    'import/no-cycle': ['off', { maxDepth: 1, ignoreExternal: true }],

    /**
     * @desc 禁止导入package.json中未声明的外部模块
     */
    'import/no-extraneous-dependencies': [
      'off',
      {
        devDependencies: true,
        optionalDependencies: true,
        peerDependencies: true,
      },
    ],

    /**
     * @desc 对指定文件的文件名强制执行一致的命名模式
     */
    'check-file/filename-naming-convention': [
      'error',
      {
        'src/**/!(*.d|*.spec|*.test).js': 'CAMEL_CASE',
        'src/**/!(*.d|*.spec|*.test).ts': 'CAMEL_CASE',
        'src/**/!(index).vue': 'PASCAL_CASE',
      },
    ],

    /**
     * @desc 为模板中的零部件命名样式强制使用特定大写
     */
    'vue/component-name-in-template-casing': ['error', 'PascalCase', { registeredComponentsOnly: true }],

    /**
     * 选用camelCase
     * @desc 强制自定义事件名称的特定大小写
     */
    'vue/custom-event-name-casing': ['error', 'camelCase'],

    /**
     * @desc 在HTML注释中强制使用统一间距
     */
    'vue/html-comment-content-spacing': ['error', 'always', { exceptions: [] }],

    /**
     * 事实上我们经常会使用v-html
     * @desc 禁止使用v-html
     */
    'vue/no-v-html': 'off',

    /**
     * @desc 不允许<template> <script> <style>块为空
     */
    'vue/no-empty-component-block': 'error',

    /**
     * @desc 不允许组件属性中存在潜在的拼写错误
     */
    'vue/no-potential-component-option-typo': 'error',

    /**
     * @desc 在beforeRouteEnter方法中不允许this用法
     */
    'vue/no-this-in-before-route-enter': 'error',

    /**
     * @desc 不允许不必要的插值
     */
    'vue/no-useless-mustaches': 'error',

    /**
     * @desc 不允许使用v-text
     */
    'vue/no-v-text': 'error',

    /**
     * @desc 要求直接导出组件
     */
    'vue/require-direct-export': 'error',

    /**
     * @desc 不允许不必要的v-bind指令
     */
    'vue/no-useless-v-bind': 'error',

    /**
     * teamplte - script - style 之间必须要有空行
     * @desc vue-sfc 块之间的填充线
     */
    'vue/padding-line-between-blocks': 'error',

    /**
     * 选用camelCase
     * @desc 在Vue组件中为props名称强制特定大小写
     */
    'vue/prop-name-casing': ['error', 'camelCase'],

    /**
     * 选用in
     * @desc 在Vue组件中为props名称强制特定大小写
     */
    'vue/v-for-delimiter-style': ['error', 'in'],

    /**
     * @desc 在v-on指令中不带参数的方法调用后强制或禁止括号
     */
    'vue/v-on-function-call': ['error', 'never', { ignoreIncludesComment: true }],

    /**
     * @desc 强制插槽指令样式
     */
    'vue/v-slot-style': ['error', { atComponent: 'shorthand', default: 'shorthand', named: 'shorthand' }],

    /**
     * 默认是warn 强制改为error 因为这条规则 极为容易引发引发bug
     * @desc 此规则旨在消除v-for指令或范围属性的隐藏变量声明。
     */
    'vue/no-template-shadow': 'error',

    /**
     * @desc 强制组件API样式
     */
    'vue/component-api-style': ['error', ['script-setup', 'composition']],

    /**
     * @desc 强制编译器宏的顺序
     */
    'vue/define-macros-order': ['error', { order: ['defineProps', 'defineEmits'] }],

    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['index'],
      },
    ],
  },
}
