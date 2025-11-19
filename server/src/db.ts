import mysql from 'mysql2/promise';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
}

let pool: mysql.Pool;

export const initializeDatabase = async (): Promise<void> => {
  pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'LahiruJava03@',
    database: process.env.DB_NAME || 'todo_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  const connection = await pool.getConnection();

  await connection.query(`
    CREATE TABLE IF NOT EXISTS task (
      id VARCHAR(36) PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      completed BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // await connection.query(`
  //   CREATE INDEX idx_completed ON task(completed)
  // `);

  try {
  await connection.query(`CREATE INDEX idx_completed ON task (completed)`);
} catch (err) {
  // Ignore duplicate index error
  if (err.code !== "ER_DUP_KEYNAME") {
    throw err;
  }
}

try {
  await connection.query(`CREATE INDEX idx_created_at ON task(created_at)`);
} catch (err) {
  // Ignore duplicate index error
  if (err.code !== "ER_DUP_KEYNAME") {
    throw err;
  }
}

  // await connection.query(`
  //   CREATE INDEX idx_created_at ON task(created_at)
  // `);

  connection.release();
};

export const getPool = (): mysql.Pool => {
  if (!pool) {
    throw new Error('Database not initialized');
  }
  return pool;
};

export const getTasks = async (): Promise<Task[]> => {
  const connection = await getPool().getConnection();
  try {
    const [rows] = await connection.query(
      'SELECT * FROM task WHERE completed = false ORDER BY created_at DESC LIMIT 5'
    );
    return rows as Task[];
  } finally {
    connection.release();
  }
};

export const createTask = async (id: string, title: string, description: string): Promise<Task> => {
  const connection = await getPool().getConnection();
  try {
    await connection.query(
      'INSERT INTO task (id, title, description) VALUES (?, ?, ?)',
      [id, title, description]
    );

    const [rows] = await connection.query('SELECT * FROM task WHERE id = ?', [id]);
    return (rows as Task[])[0];
  } finally {
    connection.release();
  }
};

export const completeTask = async (id: string): Promise<Task | null> => {
  const connection = await getPool().getConnection();
  try {
    await connection.query('UPDATE task SET completed = true WHERE id = ?', [id]);

    const [rows] = await connection.query('SELECT * FROM task WHERE id = ?', [id]);
    return rows && (rows as Task[]).length > 0 ? (rows as Task[])[0] : null;
  } finally {
    connection.release();
  }
};
