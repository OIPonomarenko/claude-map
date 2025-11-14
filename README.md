This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

![CI](https://github.com/YOUR_USERNAME/claude-map/actions/workflows/ci.yml/badge.svg)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Testing

This project uses Jest and React Testing Library for unit and integration testing.

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### Test Coverage

Tests are located in `__tests__` directories next to the components they test:
- `app/__tests__/` - Page component tests
- `app/components/mapbox/__tests__/` - MapboxExplorer component tests
- `app/components/navbar/__tests__/` - NavBar component tests

## CI/CD Pipeline

This project uses GitHub Actions for continuous integration and deployment.

### Workflows

**CI Workflow** (`.github/workflows/ci.yml`)
- Triggers on push to `main` and on pull requests
- Runs linter (`npm run lint`)
- Runs all tests with coverage (`npm test -- --coverage`)
- Builds the application
- Uploads coverage reports to Codecov (optional)
- Uploads build artifacts

### Setup Requirements

To enable the full CI/CD pipeline, configure these secrets in your GitHub repository:

1. **CODECOV_TOKEN** (Optional) - For uploading coverage reports to Codecov
2. **NEXT_PUBLIC_MAPBOX_TOKEN** - Your Mapbox access token for the build step

To add secrets:
1. Go to your GitHub repository
2. Navigate to Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Add the secret name and value

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
