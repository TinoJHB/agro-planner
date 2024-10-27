import { NextResponse } from 'next/server';
import { validateRequest } from '@/lib/auth';
import db from '@/lib/db';

db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    dueDate TEXT NOT NULL,
    priority TEXT CHECK(priority IN ('LOW', 'MEDIUM', 'HIGH')),
    status TEXT CHECK(status IN ('PENDING', 'IN_PROGRESS', 'COMPLETED')),
    assignedTo TEXT,
    cropId TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

export async function GET(request: Request) {
  const session = await validateRequest(request);
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const tasks = db.prepare('SELECT * FROM tasks ORDER BY dueDate ASC').all();
  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  const session = await validateRequest(request);
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, description, dueDate, priority, assignedTo, cropId } = body;

    const result = db.prepare(`
      INSERT INTO tasks (id, title, description, dueDate, priority, status, assignedTo, cropId)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(crypto.randomUUID(), title, description, dueDate, priority, 'PENDING', assignedTo, cropId);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
  }
}