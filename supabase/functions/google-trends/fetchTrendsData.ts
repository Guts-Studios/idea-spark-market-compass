
import googleTrends from "https://esm.sh/google-trends-api@4.9.2";

// Function to generate mock Google Trends data
export function generateMockTrendsData(keyword: string, startTime?: string, endTime?: string) {
  console.log(`Generating mock trends data for keyword: ${keyword}`);
  
  // Parse date ranges to determine the number of data points to generate
  const now = new Date();
  const endTimeDate = endTime ? new Date(endTime) : now;
  
  // Default to 1 year look back if not specified
  const defaultStartTime = new Date();
  defaultStartTime.setFullYear(now.getFullYear() - 1);
  const startTimeDate = startTime ? new Date(startTime) : defaultStartTime;
  
  // Calculate the number of months between dates
  const monthsDiff = (endTimeDate.getFullYear() - startTimeDate.getFullYear()) * 12 + 
                     (endTimeDate.getMonth() - startTimeDate.getMonth());
  
  // Generate consistent mock data points
  const mockData = [];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Base values and multipliers for the "interest" trend
  const baseValue = (keyword.length % 30) + 40; // Generate value between 40-70 based on keyword
  const lengthMultiplier = keyword.includes("eco") ? 1.2 : 0.9; // Higher multiplier for eco-related terms
  
  // Create mock data points for each month in the range
  for (let i = 0; i <= monthsDiff; i++) {
    const currentDate = new Date(startTimeDate);
    currentDate.setMonth(startTimeDate.getMonth() + i);
    
    const month = months[currentDate.getMonth()];
    const year = currentDate.getFullYear();
    
    // Create some variation in the values with a seasonal pattern
    const seasonalFactor = 1 + 0.3 * Math.sin((currentDate.getMonth() / 12) * 2 * Math.PI);
    const randomVariation = 0.8 + (Math.random() * 0.4); // Random factor between 0.8 and 1.2
    
    // Calculate search value with a slight upward trend over time
    const trendFactor = 1 + (i * 0.02); // Small increase over time
    const searchValue = Math.round(baseValue * seasonalFactor * randomVariation * trendFactor);
    
    // Consumer interest is slightly lower than search values
    const interestValue = Math.round(searchValue * 0.85 * lengthMultiplier);
    
    mockData.push({
      month,
      searches: searchValue,
      interest: interestValue,
      formattedTime: `${month} ${year}`,
      date: currentDate.toISOString(),
    });
  }
  
  console.log(`Generated ${mockData.length} mock data points for ${keyword}`);
  return mockData;
}

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
      timeout: 30000, // Increase timeout to 30 seconds
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

