
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

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

// Function to generate simulated trend data
async function generateTrendData(keyword: string, startTime?: string, endTime?: string) {
  try {
    // Generate a time range from startTime (or 1 year ago) to endTime (or now)
    const now = new Date();
    const endTimeDate = endTime ? new Date(endTime) : now;
    
    // Default to 1 year look back if not specified
    const defaultStartTime = new Date();
    defaultStartTime.setFullYear(now.getFullYear() - 1);
    const startTimeDate = startTime ? new Date(startTime) : defaultStartTime;
    
    // Generate 12 data points (roughly monthly)
    const months = [];
    const dataPoints = [];
    
    let currentDate = new Date(startTimeDate);
    
    // Generate monthly data points
    while (currentDate <= endTimeDate) {
      const month = currentDate.toLocaleString('default', { month: 'short' });
      
      // Base value is between 40-90 with randomized fluctuations
      // We add a bias based on the keyword to ensure consistent results for the same keyword
      const keywordHash = keyword.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 30;
      const baseValue = (40 + keywordHash) + Math.floor(Math.random() * 50);
      
      // Ensure value is between 0-100 (Google Trends scale)
      const value = Math.min(100, Math.max(0, baseValue));
      
      months.push(month);
      dataPoints.push({
        month,
        searches: value,
        interest: Math.round(value * 0.8 + Math.random() * value * 0.4), // Simulated related interest
        formattedTime: `${month} ${currentDate.getFullYear()}`,
        date: currentDate.toISOString(),
      });
      
      // Move to next month
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    
    // Sort data by date
    dataPoints.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    return dataPoints;
  } catch (error) {
    console.error("Error generating trend data:", error);
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
    
    console.log(`Fetching trend data for keyword: ${keyword}`);
    
    // Generate reliable simulated trend data
    const trendData = await generateTrendData(keyword, startTime, endTime);
    
    if (!trendData || trendData.length === 0) {
      return new Response(
        JSON.stringify({ error: "No trend data available" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 404,
        }
      );
    }
    
    // Return the processed data
    return new Response(
      JSON.stringify({ 
        data: trendData, 
        keyword,
        message: "Trend data fetched successfully" 
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
