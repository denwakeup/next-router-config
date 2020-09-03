module.exports = {
    env: {
        browser: true,
        es2020: true,
        node: true,
        jest: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
        'plugin:prettier/recommended',
        'prettier/@typescript-eslint',
        'prettier',
        'prettier/react',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 11,
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint'],
    settings: {
        'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
    },
    rules: {
        'react/jsx-filename-extension': [
            'error',
            {
                extensions: ['.ts', '.tsx'],
            },
        ],
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                mjs: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
            },
        ],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['error'],
        'import/prefer-default-export': 'off',
        'class-methods-use-this': 'off',
        'jsx-a11y/label-has-associated-control': [
            'error',
            {
                assert: 'nesting',
            },
        ],
        'react/jsx-props-no-spreading': 'off',
    },
    overrides: [
        {
            files: ['**/*.tsx'],
            rules: {
                'react/prop-types': 'off',
            },
        },
    ],
};
