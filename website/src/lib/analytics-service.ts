import sampleData from '@/data/sample-dashboard-data.json';

/**
 * Analytics Service with two implementations:
 * 1. Sample Data: Used for testing and development
 * 2. Google Analytics API: For production use (to be implemented)
 */

// Sample data source (for testing)
export const fetchSampleAnalyticsData = async (timeframe: string = '7d') => {
  try {
    // For now, we're just returning the sample data
    // Later, you could modify this to filter based on timeframe
    return {
      ...sampleData,
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching sample analytics data:', error);
    throw new Error('Failed to fetch analytics data');
  }
};

// Google Analytics API source (for production)
export const fetchGoogleAnalyticsData = async (timeframe: string = '7d') => {
  try {
    // This is where you would implement the Google Analytics Data API
    // Example: https://developers.google.com/analytics/devguides/reporting/data/v1
    
    // For now, return the sample data
    // TODO: Replace with actual Google Analytics API call
    return fetchSampleAnalyticsData(timeframe);
    
    /* 
    Sample implementation for GA4 API:
    
    const GA_PROPERTY_ID = process.env.GA_PROPERTY_ID;
    const startDate = getStartDateFromTimeframe(timeframe);
    const endDate = 'today';
    
    const response = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/properties/${GA_PROPERTY_ID}:runReport`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dateRanges: [{ startDate, endDate }],
          dimensions: [{ name: 'date' }],
          metrics: [
            { name: 'totalUsers' },
            { name: 'screenPageViews' },
            { name: 'sessions' },
            { name: 'bounceRate' },
          ],
        }),
      }
    );
    
    const data = await response.json();
    return transformGoogleAnalyticsData(data);
    */
  } catch (error) {
    console.error('Error fetching Google Analytics data:', error);
    
    // Fallback to sample data if Google Analytics API fails
    console.log('Falling back to sample data');
    return fetchSampleAnalyticsData(timeframe);
  }
};

// Helper function to get start date based on timeframe
function getStartDateFromTimeframe(timeframe: string): string {
  const date = new Date();
  
  switch (timeframe) {
    case '7d':
      date.setDate(date.getDate() - 7);
      break;
    case '30d':
      date.setDate(date.getDate() - 30);
      break;
    case '90d':
      date.setDate(date.getDate() - 90);
      break;
    default:
      date.setDate(date.getDate() - 7);
  }
  
  return date.toISOString().split('T')[0];
}

// Main analytics service function - this is what your application should call
export const fetchAnalyticsData = async (timeframe: string = '7d') => {
  // Check if we should use Google Analytics or sample data
  const useGoogleAnalytics = process.env.USE_GOOGLE_ANALYTICS === 'true';
  
  if (useGoogleAnalytics) {
    return fetchGoogleAnalyticsData(timeframe);
  } else {
    return fetchSampleAnalyticsData(timeframe);
  }
}; 