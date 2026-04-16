/**
 * src/features/
 *
 * Each sub-folder is a self-contained vertical slice for one domain.
 *
 * Anatomy of a feature:
 *
 * features/
 * └── <feature-name>/
 *     ├── components/   UI components used ONLY by this feature
 *     ├── hooks/        Hooks scoped to this feature
 *     ├── store/        Zustand slice (if needed locally)
 *     ├── types.ts      Domain types / interfaces
 *     └── index.ts      Public barrel — only export what other features need
 *
 * Rules:
 * - Features must not import from each other's internals
 * - Shared logic goes to src/lib/ or src/ui/
 * - Each feature owns its own data-fetching via src/api/
 */
