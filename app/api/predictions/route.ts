import { NextResponse } from 'next/server';
import { validateRequest } from '@/lib/auth';
import db from '@/lib/db';

export async function GET(request: Request) {
  const session = await validateRequest(request);
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // In a real app, this would use ML models for predictions
  const historicalData = db.prepare(`
    SELECT 
      name,
      variety,
      plantingDate,
      harvestDate,
      actualYield,
      julianday(harvestDate) - julianday(plantingDate) as growthDays
    FROM crops
    WHERE status = 'HARVESTED'
    ORDER BY plantingDate DESC
  `).all();

  const predictions = historicalData.map(crop => {
    const seasonalFactor = 1.1; // Example: 10% increase in spring
    const weatherImpact = 0.95; // Example: 5% decrease due to weather
    const predictedYield = crop.actualYield * seasonalFactor * weatherImpact;

    return {
      cropName: crop.name,
      variety: crop.variety,
      predictedYield,
      confidence: 0.85,
      optimalPlantingDate: '2024-04-15',
      estimatedHarvestDate: '2024-08-15',
      factors: {
        weather: 'Favorable',
        soilCondition: 'Optimal',
        seasonality: 'Peak Season'
      }
    };
  });

  return NextResponse.json(predictions);
}