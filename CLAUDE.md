# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Production build
- `npm run lint` - Run Biome linter (`biome check`)
- `npm run format` - Format code with Biome (`biome format --write`)

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **Linting/Formatting**: Biome (not ESLint/Prettier)

## Project Structure

- `src/app/` - App Router pages and layouts
- Path alias `@/*` maps to `./src/*`

## Code Style

Biome is configured with:
- 2-space indentation
- Recommended rules for React and Next.js
- Auto-organized imports
