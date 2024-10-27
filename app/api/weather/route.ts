import { NextResponse } from 'next/server';
import { validateRequest } from '@/lib/auth';

const MOCK_WEATHER_DATA = {
  current: {
    temperature: 24,
    humidity: 65,
    precipitation: 30,
    windSpeed: 12,
    condition: 'Partly Cloudy'
  },
  forecast: [
    { date: '2024-03-20', high: 26, low: 18, condition: 'Sunny' },
    { date: '2024-03-21', high: 25, low: 17, condition: 'Cloudy' },
    { date: '2024-03-22', high: 23, low: 16, condition: 'Rain' },
    { date: '2024-03-23', high: 22, low: 15, condition: 'Rain' },
    { date: '2024-03-24', high: 24, low: 16, condition: 'Partly Cloudy' }
  ]
};

export async function GET(request: Request) {
  const session = await validateRequest(request);
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // In a real app, you would fetch from a weather API using lat/long
  return NextResponse.json(MOCK_WEATHER_DATA);
}