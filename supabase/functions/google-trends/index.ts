
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
import { corsHeaders, handleCors } from "./cors.ts";
import { fetchGoogleTrendsData } from "./fetchTrendsData.ts";

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
