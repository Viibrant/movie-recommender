# Contributing

Thank you for your interest in contributing! This guide explains how to set up your environment, follow best practices, and submit your contributions for review. Following these steps ensures we maintain a clean, collaborative, and high-quality project.

## Why We Follow Best Practices

Clear and consistent workflows help us:

- **Collaborate effectively**: Clean commits and logical changes make reviews faster.
- **Debug issues quickly**: A clear history helps pinpoint and fix problems.
- **Maintain quality**: A consistent approach ensures the project stays manageable as it grows.

## 🛠 Prerequisites

1. Install [Git](https://git-scm.com/) on your machine.
2. Install [Bun](https://bun.sh/) for fast builds and package management.
3. Familiarise yourself with [Conventional Commits](https://www.conventionalcommits.org/) for structured commit messages.

## 🚀 Setting Up the Project

### 1. Fork the repository

Click the **Fork** button at the top-right of the repository to create your own copy.

### 2. Clone your fork

Clone your forked repository to your local machine:

```bash
git clone https://github.com/<your-username>/movie-recommender.git
```

Replace `<your-username>` with your GitHub username.

### 3. Create a new branch

**Always create a new branch off of `develop`**, not `master`. Use a descriptive name:

```bash
git checkout -b feature/<your-feature-name>
```

For example: `feature/add-genre-dropdown`.

### 4. Install dependencies

Install the project dependencies using Bun:

```bash
bun install
```

### 5. Run the development server

Start the development server:

```bash
bun dev
```

Visit the app in your browser at [http://localhost:3000](http://localhost:3000).

## 🤝 Making Contributions

### 1. Keep commits atomic

A commit should:

- **Do one thing**: Avoid bundling multiple unrelated changes into a single commit.
- **Have a clear message**: Describe the change concisely and follow the [commit format](#commit-message-format).

### 2. Examples of Bad Commit Messages

Here’s a list of **bad commit messages**, why they’re problematic, and how to improve them:

| **Commit Message** | **Why It’s Bad**                                                              | **Better Example**                             |
| ------------------ | ----------------------------------------------------------------------------- | ---------------------------------------------- |
| `stuff works now`  | Vague and meaningless. What "stuff"? What was broken before?                  | `fix(api): resolve error in movie fetch logic` |
| `fixed bugs`       | Too generic - what bugs? In what part of the code?                            | `fix(ui): correct grid layout for movie cards` |
| `wip`              | "Work in progress" doesn’t describe what was done.                            | `feat(api): implement genre filtering`         |
| `added things`     | "Things" could mean anything. Be specific.                                    | `feat(ui): add dropdown for genre selection`   |
| `update README`    | Misses the _why_. Did you add instructions, fix typos, or document a feature? | `docs: update README with setup instructions`  |

### 3. Commit Message Format

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>
```

#### Types

- `feat`: New feature.
- `fix`: Bug fix.
- `docs`: Documentation updates.
- `refactor`: Code changes without adding features or fixing bugs.
- `test`: Adding or updating tests.
- `chore`: Maintenance tasks (e.g., updating dependencies).

### 4. Push Your Branch

Push your branch to your forked repository:

```bash
git push origin feature/<your-feature-name>
```

### 5. Create a Pull Request

Open a pull request from your branch:

1. Click **Pull Requests** on the original repository.
2. Click **New Pull Request**. Ensure the name conforms to the [commit message format](#3-commit-message-format).
3. Select your branch and ensure it targets the `develop` branch.
4. Add a clear description of your changes.

### 6. Why branch off `develop`?

- The `develop` branch is where we integrate ongoing work.
- Changes in `develop` are reviewed and tested before merging into `master`, which contains only stable, production-ready code.

## Fixing Commit Messages with Rebase

Sometimes, you may need to fix your commit messages to follow the correct format or provide better clarity. This section covers two common ways to fix commit messages: amending the most recent commit and rewriting multiple commits.

### Fixing the Last Commit with Amend

If your last commit message needs updating, use the `--amend` option to rewrite it:

1. Edit the last commit message:
   ```bash
   git commit --amend
   ```
2. Update the message in your editor. For example, change:
   ```
   added dropdown
   ```
   to:
   ```
   feat(ui): add dropdown for genres
   ```
3. Save and close the editor. Your latest commit message is now updated.

> **Note**: If you’ve already pushed the commit, you’ll need to force push the updated commit:
>
> ```bash
> git push origin <branch-name> --force
> ```

### Rewriting Multiple Commits with Interactive Rebase

To fix messages in older commits, use **interactive rebase**. This is useful when multiple commit messages need improvement.

#### Step-by-Step Process:

1. **Start the Rebase**:

   ```bash
   git rebase -i HEAD~n
   ```

   Replace `n` with the number of commits you want to edit.

2. **Choose Commits to Edit**:  
   Git will open an editor showing the last `n` commits. For example:

   ```
   pick a1b2c3d feat(ui): add dropdown for genres
   pick b2c3d4e fix(api): handle missing genre ID
   pick c3d4e5f wip: add recommendation logic
   pick d4e5f6a docs: update README
   ```

   - Change `pick` to `reword` for the commits you want to modify:
     ```
     pick a1b2c3d feat(ui): add dropdown for genres
     reword c3d4e5f wip: add recommendation logic
     reword d4e5f6a docs: update README
     ```

3. **Edit Commit Messages**:  
   Git will prompt you to edit each selected commit message one by one. Update the message and save:

   - Example changes:
     ```
     wip: add recommendation logic
     ```
     becomes:
     ```
     feat(api): implement basic recommendation logic
     ```
   - Similarly:
     ```
     docs: update README
     ```
     becomes:
     ```
     docs: add instructions for running the project
     ```

4. **Complete the Rebase**:
   After editing all messages, complete the rebase:

   ```bash
   git rebase --continue
   ```

5. **Push Updated History**:  
   If you’ve already pushed the branch, force push the rewritten commits:
   ```bash
   git push origin <branch-name> --force
   ```

### Understanding `HEAD~n`

The `HEAD~n` syntax specifies how many commits to include in the rebase, starting from the most recent.

- `HEAD~1`: Only the last commit.
- `HEAD~2`: The last two commits.
- `HEAD~4`: The last four commits.

For example, if your commit history is:

```
a1b2c3d feat(ui): add dropdown for genres
b2c3d4e fix(api): handle missing genre ID
c3d4e5f wip: add recommendation logic
d4e5f6a docs: update README
```

- `HEAD~2` would include `a1b2c3d` and `b2c3d4e`.
- `HEAD~4` would include all four commits.

### Summary of Rebase Commands

| **Command**             | **What It Does**                             |
| ----------------------- | -------------------------------------------- |
| `git commit --amend`    | Edit the last commit message.                |
| `git rebase -i HEAD~n`  | Interactively rebase the last `n` commits.   |
| `git rebase --continue` | Continue the rebase after making changes.    |
| `git push --force`      | Push rewritten commits to the remote branch. |

## 🧪 Testing Your Changes

Before submitting your pull request, ensure everything works by running the tests:

```bash
bun test
```

## 🎉 Thank You!

Your contributions help make this project better. If you have questions or need help, feel free to open an issue or reach out on GitHub. Thank you for contributing!
