---
description: Stage all changes, review, and create a commit
---

Stage changes, review them, and create a commit:

1. **Check Current Status**:
   - Run `git status` to see all changes

2. **Stage Changes**:
   - Stage all modified and new files (excluding deletions for now)
   - Skip files that should not be committed (.env, .idea, node_modules, etc.)
   - Show what was staged

3. **Review Staged Changes**:
   - Run `git diff --cached` to show what will be committed
   - Provide a brief summary of changes

4. **Generate Commit Message**:
   - Analyze all staged changes
   - Create a conventional commit message
   - Include detailed body with bullet points

5. **Confirm & Commit**:
   - Show the proposed commit message
   - Ask for user confirmation
   - If confirmed, execute the commit

Example workflow:
```bash
# Stage appropriate files
git add [files]

# Show what's staged
git status

# Create commit
git commit -m "$(cat <<'EOF'
type(scope): description

- Change 1
- Change 2
EOF
)"
```

IMPORTANT:
- DO NOT stage .env, .idea/, node_modules/, or sensitive files
- Only commit after user approval
