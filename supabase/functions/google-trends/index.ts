
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
    
    try {
      // Attempt to fetch real Google Trends data
      const trendData = await fetchGoogleTrendsData(keyword, startTime, endTime);
      console.log(`Successfully fetched real Google Trends data for ${keyword}`);
      
      // Return the processed data
      return new Response(
        JSON.stringify({ 
          data: trendData, 
          keyword,
          message: "Real Google Trends data fetched successfully"
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    } catch (error) {
      // For any errors, we'll pass them to the client with relevant information
      console.error(`Error fetching trend data: ${error.message}`);
      
      let errorMessage = "Unable to fetch trend data";
      let errorDetails = error.message || "Unknown error";
      
      // Provide more specific error messages for common cases
      if (error.message.includes("[unenv]") || error.message.includes("request is not implemented")) {
        errorMessage = "Google Trends API access is currently unavailable";
        errorDetails = "The server environment can't access the Google Trends API";
      } else if (error.message.includes("quota")) {
        errorMessage = "API quota exceeded";
        errorDetails = "Google Trends API request limit reached. Please try again later";
      }
      
      return new Response(
        JSON.stringify({ 
          error: errorMessage,
          details: errorDetails
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 503, // Service Unavailable
        }
      );
    }
  } catch (error) {
    console.error("Error in Google Trends function:", error);
    
    // Return error response
    return new Response(
      JSON.stringify({ 
        error: "Failed to process request",
        details: error.message 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
