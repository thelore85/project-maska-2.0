# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production (runs tsc -b && vite build) |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint |
| `npm run test`    | Run all tests with Vitest |
| `npm run coverage` | Run tests with coverage |
| `npm test-file`   | Run specific test file (example: vitest src/components/8TDD/Post.test.tsx) |

## Technology Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4.1 + shadcn/ui components
- **State Management**: Zustand with localStorage persistence
- **Data Fetching**: TanStack React Query (v5)
- **Authentication**: Azure MSAL (@azure/msal-react, @azure/msal-browser)
- **Routing**: React Router v7
- **Testing**: Vitest + React Testing Library + jsdom
- **Icons**: FontAwesome + Lucide React

## Project Architecture

### Feature-Based Structure
The project follows a feature-based architecture in `src/features/`:
- `auth/` - Azure AD B2C authentication with MSAL
- `articles/` - Article management functionality  
- `claims/` - Claims processing

Each feature contains:
- `api/` - API calls and React Query hooks
- `components/` - Feature-specific components
- `hooks/` - Custom hooks
- `utils/` - Utility functions

### Core Directories
- `src/components/` - Shared UI components (shadcn/ui + custom)
- `src/layouts/` - Layout components (auth, dashboard)
- `src/pages/` - Route-based page components
- `src/store/` - Zustand stores (auth state with persistence)
- `src/router/` - Route configuration with auth guards
- `src/providers/` - React providers and context

### Authentication System
- Uses Azure AD B2C with MSAL
- Protected routes with RequireAuth guard
- Auth state managed via Zustand with localStorage persistence
- Environment variables required for Azure configuration

## Environment Variables

Copy `.env.exemple` to `.env` and configure:
- `VITE_CLIENT_ENV` - Environment (development/production)
- `VITE_API_URL` - Backend API URL
- `VITE_B2C_SPA_CLIENT_ID` - Azure B2C App Registration ID
- `VITE_B2C_AUTH_DOMAIN` - Azure B2C domain
- `VITE_B2C_TENANT` - Azure B2C tenant
- `VITE_API_SCOPE` - API access scope
- `VITE_API_BASE` - API base URL

## Code Style

- ESLint configuration with TypeScript, React hooks, and React refresh rules
- Prettier with Tailwind CSS plugin
- Path alias `@/` maps to `src/`
- Component naming follows PascalCase
- Feature-based imports (prefer local imports within features)

## Testing

- Vitest with jsdom environment
- React Testing Library setup
- Test setup file at `test/setup.ts`
- Global test configuration in `vite.config.ts`

## Development Guidelines

**IMPORTANT**: For detailed development guidelines, communication style, and project-specific requirements, see: `CLAUDE.prompt.md`

This project requires a conservative and rigorous approach with minimal interventions and Italian communication.