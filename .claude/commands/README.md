# Custom Claude Code Commands

These custom slash commands automate code review and commit workflows.

## Available Commands

### `/review`
**Review code changes without committing**

Reviews current changes (staged and unstaged) and provides:
- Positive aspects of the code
- Issues and concerns
- Suggestions for improvement
- Overall assessment

Usage:
```
/review
```

---

### `/commit`
**Generate and create a commit for staged changes**

Generates a conventional commit message for already-staged changes and creates the commit after confirmation.

Usage:
```bash
# First, stage your changes
git add .

# Then run the command
/commit
```

---

### `/review-and-commit`
**Review staged changes and create a commit**

Combines code review with commit creation:
1. Reviews staged changes
2. Identifies any issues
3. Generates a commit message
4. Creates the commit after approval

Usage:
```bash
# Stage your changes first
git add .

# Review and commit
/review-and-commit
```

---

### `/stage-and-commit`
**Stage all changes, review, and commit**

Automatically stages appropriate files, reviews them, and creates a commit:
1. Checks current status
2. Stages modified files (excluding sensitive files)
3. Reviews changes
4. Generates commit message
5. Commits after confirmation

Usage:
```
/stage-and-commit
```

---

### `/fix-and-commit`
**Fix linting issues and commit the fixes**

Runs the linter, fixes issues, and commits the fixes:
1. Runs `npm run lint`
2. Fixes TypeScript and ESLint errors
3. Re-runs linter to verify
4. Stages fixes
5. Creates a commit with the fixes

Usage:
```
/fix-and-commit
```

---

## Commit Message Format

All commands follow **Conventional Commits** format:

```
type(scope): brief description

Detailed explanation of changes:
- What changed
- Why it changed
- Any important notes
```

### Commit Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes

---

## Quick Workflow Examples

### Example 1: Quick commit
```bash
git add .
```
Then type: `/commit`

### Example 2: Review before committing
```bash
git add .
```
Then type: `/review-and-commit`

### Example 3: Let Claude stage and commit
Just type: `/stage-and-commit`

### Example 4: Fix linting and commit
Just type: `/fix-and-commit`

---

## Safety Features

All commands:
- ✅ Show proposed commit message before committing
- ✅ Require user confirmation
- ✅ Follow git safety protocols
- ✅ Skip sensitive files (.env, .idea, etc.)
- ✅ Never use `--no-verify` or force flags
- ✅ Check for unstaged/uncommitted changes

---

## Tips

1. **Review First**: Use `/review` to check changes before committing
2. **Stage Selectively**: For complex changes, stage files manually then use `/commit`
3. **Fix Linting Early**: Run `/fix-and-commit` before major commits
4. **Multiple Commits**: For multiple logical changes, stage and commit them separately

---

## Customization

To modify these commands:
1. Edit the `.claude/commands/*.md` files
2. Customize the prompts and workflows
3. Commands reload automatically

For more info: https://docs.claude.com/claude-code/commands
