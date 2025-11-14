---
description: Run linter, fix issues, review, and commit
---

Fix linting issues, review changes, and commit:

1. **Run Linter**:
   - Execute `npm run lint` to check for issues
   - Show any errors or warnings

2. **Fix Issues** (if any):
   - Fix TypeScript errors
   - Fix ESLint warnings
   - Clean up code formatting
   - Run linter again to verify fixes

3. **Review Changes**:
   - Run `git diff` to show all fixes made
   - Summarize what was fixed

4. **Stage & Review**:
   - Stage the fixed files
   - Run `git diff --cached` to confirm staged changes

5. **Generate Commit Message**:
   ```
   fix: resolve linting errors and warnings

   - Fixed TypeScript errors in [files]
   - Resolved ESLint warnings in [files]
   - Cleaned up code formatting

   🤖 Generated with [Claude Code](https://claude.com/claude-code)

   Co-Authored-By: Claude <noreply@anthropic.com>
   ```

6. **Confirm & Commit**:
   - Show the commit message
   - Ask for confirmation
   - Create the commit if approved

Workflow:
```bash
npm run lint          # Check for issues
# [Fix issues]
git add [fixed files]
git commit -m "..."
npm run lint          # Verify all fixed
```
