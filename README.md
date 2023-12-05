# Task Tracker (Node.js Backend)

This project is a Task Tracker Application with a Node.js backend and MySQL database.

## Getting Started

1. Clone the repository.
2. Install dependencies: `npm install`
3. Set up the environment variables by creating a `.env` file .
4. Start the server: `npm start` or `node app.js`

## Configuration

- `DB_HOST`: Database host
- `DB_USER`: Database user
- `DB_PASSWORD`: Database password
- `DB_NAME`: Database name
- `PORT`: Server port

## API Endpoints

- `GET /api/tasks/getAllTasks`: Get all tasks
- `GET /api/tasks/getTaskById/:id`: Get task by ID
- `POST /api/tasks/createTask`: Create a new task
- `POST /api/tasks/updateTask/:id`: Update task by ID
- `POST /api/tasks/entryForSameTask`: Another entry for same taskNumber

## SQL Query for creating Task table

For this, please refer the folder: sqlQueries > query.txt
