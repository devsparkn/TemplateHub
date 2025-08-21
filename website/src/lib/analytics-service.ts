/* eslint-disable @typescript-eslint/no-unused-vars */
import sampleData from "@/data/sample-dashboard-data.json";

// Sample data source (for testing)
export const fetchSampleAnalyticsData = async (timeframe: string = "7d") => {
  try {
    // For now, we're just returning the sample data
    // Later, you could modify this to filter based on timeframe
    return {
      ...sampleData,
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error fetching sample analytics data:", error);
    throw new Error("Failed to fetch analytics data");
  }
};

// Main analytics service function - this is what your application should call
export const fetchAnalyticsData = async (timeframe: string = "7d") => {
  if (fetchSampleAnalyticsData) {
    return fetchSampleAnalyticsData(timeframe);
  }
};
