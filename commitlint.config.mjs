export default {
    extends: ["@commitlint/config-conventional"],
    rules: {
        "type-enum": [
            2,
            "always",
            ["feat", "fix", "docs", "style", "refactor", "test", "ci", "perf", "chore", "revert"],
        ],
        "scope-empty": [1, "never"],
        "subject-case": [1, "always", ["lower-case", "sentence-case"]],
    },
}
