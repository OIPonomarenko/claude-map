#!/bin/bash

# Claude Code automation aliases
# Add to your ~/.bashrc or ~/.zshrc:
# source /path/to/claude-map/.claude-aliases.sh

# Quick review - just reviews changes
alias cr='echo "/review" | pbcopy && echo "Copied /review to clipboard - paste in Claude Code"'

# Quick commit - commits staged changes
alias cc='echo "/commit" | pbcopy && echo "Copied /commit to clipboard - paste in Claude Code"'

# Review and commit
alias crc='echo "/review-and-commit" | pbcopy && echo "Copied /review-and-commit to clipboard - paste in Claude Code"'

# Stage and commit everything
alias csc='echo "/stage-and-commit" | pbcopy && echo "Copied /stage-and-commit to clipboard - paste in Claude Code"'

# Fix linting and commit
alias cfc='echo "/fix-and-commit" | pbcopy && echo "Copied /fix-and-commit to clipboard - paste in Claude Code"'

# Interactive helper
claude-commit() {
  echo "Available commands:"
  echo "  /review            - Review changes only"
  echo "  /commit            - Commit staged changes"
  echo "  /review-and-commit - Review and commit"
  echo "  /stage-and-commit  - Stage all and commit"
  echo "  /fix-and-commit    - Fix linting and commit"
  echo ""
  echo "Which command? (1-5): "
  read choice

  case $choice in
    1) echo "/review" | pbcopy ;;
    2) echo "/commit" | pbcopy ;;
    3) echo "/review-and-commit" | pbcopy ;;
    4) echo "/stage-and-commit" | pbcopy ;;
    5) echo "/fix-and-commit" | pbcopy ;;
    *) echo "Invalid choice" && return 1 ;;
  esac

  echo "✅ Command copied to clipboard - paste in Claude Code!"
}
