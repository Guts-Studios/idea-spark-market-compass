
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
// Import as default since that's how the module is structured
import googleTrends from "https://esm.sh/google-trends-api@4.9.2";

// CORS headers for browser requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Handle CORS preflight requests
const handleCors = (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
      status: 204,
    });
  }
  return null;
};

// Function to generate mock trend data
function generateMockTrendData(keyword: string, startTime?: string, endTime?: string) {
  console.log(`Generating mock trend data for: ${keyword}`);
  
  // Parse date ranges
  const now = new Date();
  const endTimeDate = endTime ? new Date(endTime) : now;
  
  // Default to 1 year look back if not specified
  const defaultStartTime = new Date();
  defaultStartTime.setFullYear(now.getFullYear() - 1);
  const startTimeDate = startTime ? new Date(startTime) : defaultStartTime;
  
  // Calculate number of months between start and end date
  const monthDiff = (endTimeDate.getFullYear() - startTimeDate.getFullYear()) * 12 + 
                    endTimeDate.getMonth() - startTimeDate.getMonth();
  
  const mockData = [];
  const currentDate = new Date(startTimeDate);
  
  // Generate realistic-looking trend data
  for (let i = 0; i <= monthDiff; i++) {
    // Create a base value that follows a seasonal pattern
    const baseValue = 30 + Math.sin(i / 12 * Math.PI * 2) * 15;
    
    // Add a general trend (increasing over time)
    const trendFactor = i / monthDiff * 15;
    
    // Add some randomness
    const randomness = Math.random() * 15;
    
    // Calculate the search interest value (between 0 and 100)
    let searches = Math.round(baseValue + trendFactor + randomness);
    searches = Math.min(100, Math.max(0, searches)); // Clamp between 0 and 100
    
    const date = new Date(currentDate);
    const month = date.toLocaleString('default', { month: 'short' });
    
    mockData.push({
      month,
      searches: searches,
      interest: Math.round(searches * (0.7 + Math.random() * 0.3)), // Estimated consumer interest
      formattedTime: `${month} ${date.getFullYear()}`,
      date: date.toISOString(),
    });
    
    // Move to next month
    currentDate.setMonth(currentDate.getMonth() + 1);
  }
  
  return mockData;
}

// Function to fetch real Google Trends data
async function fetchGoogleTrendsData(keyword: string, startTime?: string, endTime?: string) {
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
        interest: Math.round(point.value[0] * (0.7 + Math.random() * 0.3)), // Estimated consumer interest
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

serve(async (req) => {
  // Handle CORS
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;
  
  try {
    // Parse request
    const { keyword, startTime, endTime } = await req.json();
    
    if (!keyword) {
      return new Response(
        JSON.stringify({ error: "Missing required parameter: keyword" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }
    
    console.log(`Processing trend data for keyword: ${keyword}`);
    
    let trendData;
    let isMockData = false;
    
    try {
      // Attempt to fetch real Google Trends data
      trendData = await fetchGoogleTrendsData(keyword, startTime, endTime);
      console.log(`Successfully fetched real Google Trends data for ${keyword}`);
    } catch (error) {
      // Log the error
      console.error(`Failed to fetch real data: ${error.message}`);
      
      // For certain errors, we might want to generate mock data
      if (error.message.includes("[unenv]") || error.message.includes("request is not implemented")) {
        // Generate mock data but mark it clearly
        isMockData = true;
        trendData = generateMockTrendData(keyword, startTime, endTime);
        console.log(`Generated ${trendData.length} mock data points for ${keyword}`);
      } else {
        // For other errors, we'll pass the error to the client
        throw new Error(`Unable to fetch trend data: ${error.message}`);
      }
    }
    
    if (!trendData || trendData.length === 0) {
      return new Response(
        JSON.stringify({ 
          error: "No trend data available for this keyword",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 404,
        }
      );
    }
    
    // Return the processed data with an indicator if it's mock data
    return new Response(
      JSON.stringify({ 
        data: trendData, 
        keyword,
        isMockData,
        message: isMockData 
          ? "Showing simulated trend data due to API limitations" 
          : "Trend data processed successfully" 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in Google Trends function:", error);
    
    // Return error response
    return new Response(
      JSON.stringify({ 
        error: "Failed to fetch trend data",
        details: error.message 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
