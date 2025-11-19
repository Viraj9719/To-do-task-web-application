# Todo Task Web Application


## Architecture

- **Frontend**: React with TypeScript and Tailwind CSS
- **Backend**: Express.js REST API
- **Database**: MySQL 8.0
- **Deployment**: Docker and Docker Compose


## Prerequisites

- Docker
- Docker Compose
- (or Node.js 18+ and MySQL 8.0 for local development)

## Start with Docker

### Build and Run

```bash
docker-compose up --build
```

This will:
- Start MySQL database on port 3306
- Build and start the backend API on port 3000
- Build and start the frontend on port 5173

### Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000/api/tasks

## Local Development

### Prerequisites

- Node.js 18+
- MySQL 8.0

### Setup

1. **Install root dependencies**:
```bash
npm install
```

2. **Install backend dependencies**:
```bash
cd server
npm install
cd ..
```

3. **Configure environment variables**:
Create a `.env` file in the root directory:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=todo_db
PORT=3000
```

4. **Start MySQL**:
```bash
mysql -u root -p < init.sql
```

5. **Build and run**:
```bash
npm run build
```

6. **Start backend**:
```bash
cd server
npm start
```

7. **Start frontend**:
```bash
npm run dev
```

The application will be available at http://localhost:5173

## API Endpoints

### Get Tasks
```
GET /api/tasks
```
Returns the 5 most recent incomplete tasks.

**Response**:
```json
[
  {
    "id": "uuid",
    "title": "Task Title",
    "description": "Task description",
    "completed": false,
    "created_at": "2025-11-19T10:00:00Z"
  }
]
```

### Create Task
```
POST /api/tasks
Content-Type: application/json

{
  "title": "Task Title",
  "description": "Task description"
}
```

**Response**: 201 Created
```json
{
  "id": "uuid",
  "title": "Task Title",
  "description": "Task description",
  "completed": false,
  "created_at": "2025-11-19T10:00:00Z"
}
```

### Complete Task
```
PUT /api/tasks/:id
```


### Docker Issues
```bash
# Remove all containers and volumes
docker-compose down -v

# Rebuild images
docker-compose up --build
```

## Testing

Run tests with:
```bash
npm test
```

