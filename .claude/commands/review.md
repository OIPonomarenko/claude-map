---
description: Review current code changes without committing
---

You are an expert code reviewer. Review the current changes:

1. **Check Current Status**:
   - Run `git status` to see modified files
   - Run `git diff` for unstaged changes
   - Run `git diff --cached` for staged changes

2. **Code Review**:
   Analyze all changes and provide:

   **✅ Positive Aspects**
   - Well-implemented features
   - Good practices followed
   - Code quality improvements

   **⚠️ Issues & Concerns**
   - Potential bugs
   - Security vulnerabilities
   - Performance implications
   - Code smells or anti-patterns

   **💡 Suggestions**
   - Improvements to consider
   - Best practices to apply
   - Refactoring opportunities

   **📝 Summary**
   - Overall assessment
   - Recommendation: approve, request changes, or approve with comments

3. **Format**:
   - Use clear headings and bullet points
   - Be concise but thorough
   - Focus on actionable feedback
   - Include file paths and line numbers for specific issues

Do NOT create commits. This is review-only.