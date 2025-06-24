#!/bin/bash

# Install dependencies for the entire monorepo
pnpm install

# Build only the backend
cd packages/backend
pnpm build

echo "Backend build completed successfully!" 