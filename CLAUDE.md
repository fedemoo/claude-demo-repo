# Claude Code — Project Instructions

This repository is a demo project used to showcase how Claude Code integrates into an engineering workflow at MOO.

## Project Overview

A TypeScript utility library with unit tests. The codebase is intentionally simple to keep the focus on the Claude integration, not the application logic.

## Tech Stack

- **Language**: TypeScript
- **Test runner**: Vitest
- **Package manager**: npm

## Commands

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Type-check
npm run typecheck

# Build
npm run build
```

## Code Conventions

- Use `camelCase` for variables and functions, `PascalCase` for types/interfaces
- Prefer `const` over `let`; never use `var`
- All functions must have explicit return types
- Tests live alongside source files as `*.test.ts`
- Keep functions small and single-purpose

## What Claude Should Know

- If asked to fix a failing test, run `npm test` first to confirm the failure, then fix the source (not the test) unless the test itself is clearly wrong
- When generating new functionality, follow the existing patterns in `src/`
- Do not modify `.github/workflows/` without explicit instruction
- The `NOTES.md` file contains manual setup steps — do not alter it
