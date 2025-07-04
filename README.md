# Todo App Monorepo

A full-stack todo application built with React (frontend) and Hono (backend) in a monorepo structure inspired by this project:

<img src="https://i.ibb.co/mCrnjpr2/preview.png" alt="Preview of the app" />

## 🏗️ Project Structure

```
todo-app-monorepo/
├── packages/
│   ├── frontend/          # React + Vite frontend
│   └── backend/           # Hono REST API
├── package.json           # Root workspace configuration
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Install dependencies for all packages:

```bash
pnpm install
```

2. Set up environment variables:

```bash
# Copy environment files
cp packages/backend/env.example packages/backend/.env
cp packages/frontend/env.example packages/frontend/.env

# Edit the files with your configuration
```

3. Start both frontend and backend in development mode:

```bash
pnpm dev
```

This will start:

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

### Individual Commands

You can also run packages individually:

```bash
# Frontend only
pnpm --filter frontend dev

# Backend only
pnpm --filter backend dev

# Build both
pnpm build

# Lint both
pnpm lint
```

## 📦 Packages

### Frontend (`packages/frontend/`)

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **State Management**: Custom hooks with API integration
- **Form Handling**: React Hook Form + Zod validation

### Backend (`packages/backend/`)

- **Framework**: Hono
- **Runtime**: Node.js with tsx for development
- **Validation**: Zod schemas
- **CORS**: Enabled for frontend communication

## 🔌 API Endpoints

| Method   | Endpoint         | Description       |
| -------- | ---------------- | ----------------- |
| `GET`    | `/api/todos`     | Get all todos     |
| `POST`   | `/api/todos`     | Create a new todo |
| `PUT`    | `/api/todos/:id` | Update a todo     |
| `DELETE` | `/api/todos/:id` | Delete a todo     |

### Todo Schema

```typescript
{
  id: string;
  title: string;
  isCompleted: boolean;
  dueDate: string; // ISO datetime string
}
```

## 🛠️ Development

### Adding Dependencies

```bash
# Add to frontend
pnpm --filter frontend add <package>

# Add to backend
pnpm --filter backend add <package>

# Add dev dependency
pnpm --filter frontend add -D <package>
```

### TypeScript

Both packages use TypeScript with strict configuration. The backend uses `tsx` for development and compiles to `dist/` for production.

### Environment Variables

Create `.env` files in each package directory:

**Backend (`packages/backend/.env`):**

```bash
# Database URL (required)
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"

# Server port (optional, defaults to 3000)
PORT=3000
```

**Frontend (`packages/frontend/.env`):**

```bash
# Backend API URL (optional, defaults to http://localhost:3000)
VITE_API_URL=http://localhost:3000
```

**Important Notes:**

- Frontend environment variables must be prefixed with `VITE_` to be accessible in the browser
- The backend URL in the frontend `.env` should match your backend server address
- For production, update `VITE_API_URL` to your deployed backend URL

## 🚀 Deployment

### Frontend

The frontend builds to `packages/frontend/dist/` and can be deployed to any static hosting service.

**Production Environment Setup:**

```bash
# Set the production backend URL
VITE_API_URL=https://your-backend-domain.com
```

### Backend

The backend can be deployed to any Node.js hosting service:

```bash
# Build
pnpm --filter backend build

# Start production server
pnpm --filter backend start
```

**Production Environment Setup:**

```bash
# Required: Set your production database URL
DATABASE_URL="postgresql://..."

# Optional: Set production port
PORT=3000
```

## 📝 Features

- ✅ Create, read, update, delete todos
- ✅ Toggle todo completion status
- ✅ Sort by completion and due date
- ✅ Dark/light theme toggle
- ✅ Responsive design
- ✅ Real-time API integration
- ✅ Error handling and loading states
- ✅ TypeScript throughout
- ✅ CORS enabled for cross-origin requests

## 🔧 Tech Stack

- **Frontend**: React, Vite, TypeScript, Tailwind CSS, Radix UI
- **Backend**: Hono, Node.js, TypeScript, Zod
- **Package Manager**: pnpm workspaces
- **Development**: Concurrent development servers
