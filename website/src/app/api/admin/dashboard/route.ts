import { NextResponse } from 'next/server';
import { fetchAnalyticsData } from '@/lib/analytics-service';

export async function GET(request: Request) {
  try {
    // Get URL parameters if any
    const { searchParams } = new URL(request.url);
    const timeframe = searchParams.get('timeframe') || '7d';
    
    // Fetch analytics data using our service
    // This currently uses sample data but can be switched to Google Analytics
    const dashboardData = await fetchAnalyticsData(timeframe);
    
    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
} 