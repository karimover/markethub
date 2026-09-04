# MarketHub — portfolio notes

## What this project demonstrates

- React 19 + TypeScript
- TanStack Router with file-based routes
- TanStack Query for cached async data
- TanStack Table with URL-synced search, filters, sorting and pagination
- React Hook Form + Zod validation
- Reusable feature-based architecture
- Responsive marketplace operations UI
- Light/dark mode

## Why the data is mocked

This is intentionally a frontend portfolio project. There is no backend dependency. The product and customer services expose async functions that behave like an API boundary, so a real REST/GraphQL client can replace the mock implementations later without rewriting the UI layer.

## Portfolio story

MarketHub is a marketplace management workspace for sellers. It covers sales overview, orders, catalog management, customers, operational tasks and notifications.

## Design direction

The UI uses a commerce-admin visual language inspired by Shopify Polaris: neutral surfaces, compact information density, strong table hierarchy, semantic status badges and green primary actions. No Shopify logo or proprietary brand assets are used.

## Before publishing

1. Replace the placeholder GitHub URL in `src/config/site.ts` with the final repository URL.
2. Replace `https://markethub-demo.vercel.app` with the actual deployed URL.
3. Initialize a new Git repository instead of publishing the source repository history from the starter.
4. Be ready to explain the mock API boundary and every main feature during an interview.
