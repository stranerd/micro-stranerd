module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: ['eslint:recommended'],
	plugins: [
		'promise',
		'@typescript-eslint'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2021
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
		'no-tabs': 'off',
		'no-unused-vars': 0,
		'@typescript-eslint/no-unused-vars': 0,
		'no-var': 'error',
		'accessor-pairs': 'off',
		indent: ['error', 'tab', { SwitchCase: 1 }],
		'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
		semi: ['error', 'never'],
		quotes: ['error', 'single'],
		'prefer-const': ['error'],
		'arrow-parens': ['error', 'always'],
		'no-return-assign': 'off',
		curly: 'off',
		'object-property-newline': 'off',
		'require-atomic-updates': 'off',
		'require-await': 'off'
	},
	overrides: [
		{
			files: ['tests/**/*.[jt]s?(x)', 'tests/**/*.spec.[jt]s?(x)'],
			env: {
				jest: true
			}
		}
	]
}
