export default {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'ci', 'perf', 'chore', 'revert']],
        // Disable
        'scope-empty': [0, 'never'],
        'subject-case': [0, 'always'],
}
