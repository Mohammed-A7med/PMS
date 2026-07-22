# Project Management System (PMS)

A React + TypeScript web app for managing projects, tasks, and team members. PMS supports two roles — **Manager** and **Employee** — with role-based dashboards, authentication, and task workflows backed by a remote REST API.

## What it does

Managers plan work by creating projects and tasks, assigning them to employees, and monitoring progress and user activity. Employees focus on their assigned work through a Kanban-style task board where they can move tasks between **To Do**, **In Progress**, and **Done**.

## Main features

### Authentication
- Login and logout with JWT stored in `localStorage`
- User registration (profile image, username, email, country, phone, password)
- Email account verification
- Forgot password and reset password flows
- Change password

### Role-based access
- **Manager:** manage users, projects, and tasks (full CRUD)
- **Employee:** view assigned projects and update task status on the board

### Dashboard
- Welcome overview with task counts (To Do / In Progress / Done) and charts
- Managers also see active/inactive user stats

### Projects
- Searchable, paginated project list (table and card layouts)
- Create and edit projects (title, description)
- Delete projects with confirmation (managers)

### Tasks
- **Manager:** searchable/filterable task list, create/edit tasks (title, description, assignee, project), delete with confirmation
- **Employee:** drag-and-drop Kanban board to update task status

### Users (Manager)
- Searchable, paginated user list
- Activate or deactivate users

### UX
- Protected routes and collapsible sidebar navigation
- Light / dark mode
- Toasts, loading states, empty states, and a 404 page
- Responsive layouts

## Tech stack

| Area | Technology |
|------|------------|
| UI | React 18, TypeScript, Vite |
| Routing | React Router DOM (hash router) |
| Styling | Bootstrap 5, React Bootstrap, CSS modules |
| Forms | React Hook Form |
| HTTP | Axios |
| Auth | JWT (`jwt-decode`) |
| Charts | Chart.js + react-chartjs-2 |
| Animation | Framer Motion |
| Deploy | Netlify |

This repository is the **frontend only**. Data is served by the Upskilling Egypt API:

`https://upskilling-egypt.com:3003/api/v1`

## Getting started

### Prerequisites
- Node.js (LTS recommended)
- npm

### Install & run

```bash
npm install
npm run dev
```

### Other scripts

```bash
npm run build    # Type-check and production build
npm run preview  # Preview the production build
npm run lint     # Run ESLint
```

## Project structure

```
src/
├── assets/           # Images and branding
├── constans/         # API endpoints and shared constants
├── context/          # Auth context (JWT user state)
├── hooks/            # Custom React hooks
├── interfaces/       # TypeScript types
├── modules/
│   ├── Authentication/
│   ├── Dashboard/
│   ├── Projects/
│   ├── Tasks/
│   ├── Users/
│   └── Shared/       # Layout, navbar, sidebar, tables, modals
├── App.tsx           # Routes
└── main.tsx
```

## License

Private project (`package.json` marks this package as private).
