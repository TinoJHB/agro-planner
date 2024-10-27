import { NextResponse } from 'next/server';
import { validateRequest } from '@/lib/auth';
import db from '@/lib/db';

export async function GET(request: Request) {
  const session = await validateRequest(request);
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const yearlyYields = db.prepare(`
    SELECT 
      strftime('%Y', harvestDate) as year,
      SUM(actualYield) as totalYield,
      AVG(actualYield) as averageYield,
      COUNT(*) as cropCount
    FROM crops
    WHERE status = 'HARVESTED'
    GROUP BY year
    ORDER BY year DESC
  `).all();

  const cropPerformance = db.prepare(`
    SELECT 
      name,
      variety,
      AVG(actualYield) as averageYield,
      MAX(actualYield) as bestYield,
      COUNT(*) as plantingCount
    FROM crops
    WHERE status = 'HARVESTED'
    GROUP BY name, variety
    ORDER BY averageYield DESC
  `).all();

  const taskCompletion = db.prepare(`
    SELECT 
      strftime('%Y-%m', dueDate) as month,
      COUNT(*) as totalTasks,
      SUM(CASE WHEN status = 'COMPLETED' THEN 1 ELSE 0 END) as completedTasks
    FROM tasks
    GROUP BY month
    ORDER BY month DESC
    LIMIT 12
  `).all();

  return NextResponse.json({
    yearlyYields,
    cropPerformance,
    taskCompletion
  });
}