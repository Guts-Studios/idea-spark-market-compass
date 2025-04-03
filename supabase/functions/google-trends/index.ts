
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders, handleCors } from "./cors.ts";
import { fetchGoogleTrendsData, generateMockTrendsData } from "./fetchTrendsData.ts";

serve(async (req) => {
  // Handle CORS
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;
  
  try {
    // Parse request
    let requestBody;
    try {
      requestBody = await req.json();
    } catch (parseError) {
      console.error("Error parsing request body:", parseError);
      return new Response(
        JSON.stringify({ error: "Invalid JSON in request body" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }
    
    const { keyword, startTime, endTime } = requestBody;
    
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
      // First attempt to fetch real Google Trends data
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
      // If real data fetching fails, generate mock data
      console.log(`Failed to fetch real data: ${error.message}. Falling back to mock data.`);
      
      const mockData = generateMockTrendsData(keyword, startTime, endTime);
      
      // Return the mock data with a note that it's mock data
      return new Response(
        JSON.stringify({ 
          data: mockData,
          keyword,
          isMock: true,
          message: "Using generated mock trend data"
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
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

