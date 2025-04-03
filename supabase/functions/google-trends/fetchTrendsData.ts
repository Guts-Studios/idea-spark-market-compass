
import googleTrends from "https://esm.sh/google-trends-api@4.9.2";

// Function to fetch real Google Trends data
export async function fetchGoogleTrendsData(keyword: string, startTime?: string, endTime?: string) {
  try {
    // Parse date ranges
    const now = new Date();
    const endTimeDate = endTime ? new Date(endTime) : now;
    
    // Default to 1 year look back if not specified
    const defaultStartTime = new Date();
    defaultStartTime.setFullYear(now.getFullYear() - 1);
    const startTimeDate = startTime ? new Date(startTime) : defaultStartTime;
    
    console.log(`Fetching trends for keyword: ${keyword}, from ${startTimeDate.toISOString()} to ${endTimeDate.toISOString()}`);

    // Call Google Trends API with the specified parameters
    const results = await googleTrends.interestOverTime({
      keyword: keyword,
      startTime: startTimeDate,
      endTime: endTimeDate,
      geo: '', // Empty string for worldwide data
    });
    
    // Parse the results
    const parsedResults = JSON.parse(results);
    
    if (!parsedResults.default?.timelineData) {
      console.error("No timeline data found in the response");
      throw new Error("No trend data available for this keyword");
    }
    
    // Transform the data into our expected format
    const formattedData = parsedResults.default.timelineData.map((point: any) => {
      const date = new Date(parseInt(point.time) * 1000);
      const month = date.toLocaleString('default', { month: 'short' });
      
      return {
        month,
        searches: point.value[0], // Search interest value
        interest: Math.round(point.value[0] * 0.85), // Estimated consumer interest (using a fixed calculation)
        formattedTime: `${month} ${date.getFullYear()}`,
        date: date.toISOString(),
      };
    });
    
    return formattedData;
  } catch (error) {
    console.error("Error fetching Google Trends data:", error);
    throw error;
  }
}
