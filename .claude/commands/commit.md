---
description: Generate and create a commit message for staged changes
---

Generate a commit message for the current staged changes:

1. **Check Staged Changes**:
   - Run `git diff --cached --stat` to see what's staged
   - If nothing is staged, inform the user and stop

2. **Analyze Changes**:
   - Run `git diff --cached` to see the actual changes
   - Understand what was modified, added, or removed

3. **Generate Commit Message**:
   Follow conventional commits format:
   ```
   type(scope): brief description

   Detailed explanation of:
   - What changed
   - Why it changed
   - Any important notes

   🤖 Generated with [Claude Code](https://claude.com/claude-code)

   Co-Authored-By: Claude <noreply@anthropic.com>
   ```

   Types: feat, fix, docs, style, refactor, test, chore, ci

4. **Show Message & Confirm**:
   - Display the proposed commit message
   - Ask: "Create commit with this message? (yes/no)"

5. **Create Commit** (if user says yes):
   ```bash
   git commit -m "$(cat <<'EOF'
   [your generated message here]
   EOF
   )"
   ```

IMPORTANT:
- Only commit after user confirmation
- Use heredoc format for multi-line messages
- Follow git safety protocol
