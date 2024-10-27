import { NextResponse } from 'next/server';
import { validateRequest } from '@/lib/auth';
import db from '@/lib/db';

db.exec(`
  CREATE TABLE IF NOT EXISTS crops (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    variety TEXT NOT NULL,
    plantingDate TEXT NOT NULL,
    harvestDate TEXT,
    status TEXT CHECK(status IN ('PLANNED', 'PLANTED', 'GROWING', 'HARVESTED')),
    fieldId TEXT NOT NULL,
    expectedYield REAL,
    actualYield REAL,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

export async function GET(request: Request) {
  const session = await validateRequest(request);
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const crops = db.prepare('SELECT * FROM crops ORDER BY plantingDate DESC').all();
  return NextResponse.json(crops);
}

export async function POST(request: Request) {
  const session = await validateRequest(request);
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, variety, plantingDate, fieldId, expectedYield } = body;

    const result = db.prepare(`
      INSERT INTO crops (id, name, variety, plantingDate, status, fieldId, expectedYield)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(crypto.randomUUID(), name, variety, plantingDate, 'PLANNED', fieldId, expectedYield);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create crop' }, { status: 500 });
  }
}