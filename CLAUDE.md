# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16.0.1 application that integrates Mapbox for interactive map exploration. The app allows users to search locations, navigate maps, and place markers by clicking on the map.

## Technology Stack

- **Framework**: Next.js 16.0.1 (App Router)
- **React**: 19.2.0 with React Compiler enabled
- **Styling**: Tailwind CSS v4 with custom theme configuration
- **Mapping**: Mapbox GL JS v3.16.0 with Mapbox Geocoder v5.1.2
- **TypeScript**: v5 with strict mode enabled
- **Fonts**: Geist Sans and Geist Mono (optimized via next/font)

## Development Commands

```bash
# Start development server (runs on http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Key Architecture

### Project Structure

- `app/` - Next.js App Router directory
  - `layout.tsx` - Root layout with font configuration
  - `page.tsx` - Home page (currently default Next.js template)
  - `components/MapboxExplorer.tsx` - Core Mapbox map component
  - `globals.css` - Global styles with Tailwind v4 and CSS variables for theming
- `public/` - Static assets
- TypeScript path aliases configured: `@/*` maps to root directory

### MapboxExplorer Component

The main mapping component (`app/components/MapboxExplorer.tsx`) is a client-side component that:

- Requires a Mapbox access token (passed as prop or will show error state)
- Accepts `initialCenter` (coordinates array) and `initialZoom` (number) props
- Initializes a Mapbox map with navigation controls and geocoder search
- Enables click-to-place markers with coordinate popups
- Markers can be removed by clicking them and confirming
- Tracks marker count in UI state
- Uses refs to manage map instance and markers array to prevent re-initialization

**Important TypeScript patterns**:
- All refs must be properly typed: `useRef<mapboxgl.Map | null>(null)`, `useRef<HTMLDivElement>(null)`, `useRef<mapboxgl.Marker[]>([])`
- Null checks required before using `map.current` and `mapContainer.current`
- Proper cleanup in useEffect to prevent memory leaks when unmounting

### Styling Approach

- Using Tailwind CSS v4 with inline theme configuration in `globals.css`
- CSS variables for theming: `--background`, `--foreground`, `--font-sans`, `--font-mono`
- Dark mode support via `prefers-color-scheme: dark` media query
- Custom colors mapped: `--color-background`, `--color-foreground`

### Next.js Configuration

- React Compiler is **enabled** (`reactCompiler: true` in `next.config.ts`)
- TypeScript with strict mode and ES2017 target
- Module resolution set to `bundler`
- ESLint uses flat config format with Next.js core-web-vitals and TypeScript rules

## Mapbox Integration Notes

- The `MapboxExplorer` component expects an `accessToken` prop
- Without a valid token, it renders a helpful error state with instructions
- Mapbox GL CSS and Geocoder CSS are imported directly in the component
- Map initialization uses `mapbox://styles/mapbox/streets-v12` style
- Geocoder is configured with `marker: false` since custom markers are placed on click

## Type Safety

- All React components use TypeScript with proper type definitions
- Mapbox type definitions installed: `@types/mapbox__mapbox-gl-geocoder`
- `next/font` types are used for font configuration
- Path alias `@/*` is configured in `tsconfig.json`
- Always add proper null checks when working with refs that can be null