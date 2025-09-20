# Vue 3 + Vite CRUD Application

A full-stack Vue.js application with CRUD operations, featuring a Vue 3 frontend with PrimeVue components and a Node.js/Express backend with MariaDB database.

## Features

- 🚀 Vue 3 with Composition API
- ⚡ Vite for fast development
- 🎨 PrimeVue UI components with Aura theme
- 🗄️ MariaDB database with Drizzle ORM
- 🔧 Express.js REST API
- 📱 Responsive design
- ✨ Full CRUD operations for user management
- 🐳 Docker support for easy deployment

## Tech Stack

### Frontend
- Vue 3
- Vite
- PrimeVue
- Vue Router
- Pinia (State Management)

### Backend
- Node.js
- Express.js
- Drizzle ORM
- MariaDB
- CORS enabled

## Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (v16 or higher)
- npm or yarn
- Docker and Docker Compose (for database)

## Installation & Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd learn-vue-completed
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory with the following variables:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=vue_user
DB_PASSWORD=vue_password
DB_NAME=vue_app
```

### 4. Database Setup

#### Option A: Using Docker (Recommended)
Start the MariaDB container:
```bash
npm run docker:up
```

#### Option B: Manual MariaDB Setup
If you prefer to use your own MariaDB instance, make sure it's running and update the `.env` file accordingly.

### 5. Start the Development Servers

#### Option 1: Start both frontend and backend together
```bash
npm run dev:full
```

#### Option 2: Start servers separately

**Terminal 1 - Backend API Server:**
```bash
npm run server
```

**Terminal 2 - Frontend Development Server:**
```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start Vite development server
- `npm run server` - Start Express.js API server
- `npm run dev:full` - Start both frontend and backend concurrently
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run docker:up` - Start Docker containers
- `npm run docker:down` - Stop Docker containers

## API Endpoints

The backend API provides the following endpoints:

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## Project Structure

```
├── server/                 # Backend API
│   ├── app.js             # Express app configuration
│   ├── controllers/       # Route controllers
│   ├── db/               # Database configuration
│   └── routes/           # API routes
├── src/                  # Frontend source
│   ├── components/       # Vue components
│   ├── views/           # Page components
│   ├── router/          # Vue Router configuration
│   └── stores/          # Pinia stores
├── docker/              # Docker configuration
└── docker-compose.yml   # Docker Compose setup
```

## Usage

1. **Access the Application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

2. **User Management:**
   - Navigate to `/users` to access the CRUD interface
   - Add, edit, and delete users through the intuitive UI
   - All operations are persisted in the MariaDB database

## Development

### Adding New Features
1. Create new Vue components in `src/components/`
2. Add new API endpoints in `server/routes/` and `server/controllers/`
3. Update database schema in `server/db/schema.js`

### Database Migrations
The database schema is automatically created when the server starts. Sample data is inserted if the users table is empty.

## Docker Deployment

For production deployment using Docker:

```bash
# Build and start all services
docker-compose up -d

# Stop all services
docker-compose down
```

## Troubleshooting

### Common Issues

1. **Port conflicts:** Make sure ports 3000 (API) and 5173 (frontend) are available
2. **Database connection:** Ensure MariaDB is running and credentials are correct
3. **Missing dependencies:** Run `npm install` if you encounter import errors

### Database Issues
If you encounter database connection issues:
1. Check if MariaDB container is running: `docker ps`
2. Verify environment variables in `.env`
3. Restart the database container: `npm run docker:down && npm run docker:up`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

---

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).
