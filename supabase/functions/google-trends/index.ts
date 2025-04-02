
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

// Unofficial Google Trends API wrapper using fetch directly
async function fetchTrendData(keyword: string, startTime?: string, endTime?: string) {
  try {
    // Create URL for the Google Trends API
    const baseUrl = "https://trends.google.com/trends/api/widgetdata/multiline";
    
    // Current time if not specified
    const now = new Date();
    const endTimeDate = endTime ? new Date(endTime) : now;
    
    // Default to 1 year look back if not specified
    const defaultStartTime = new Date();
    defaultStartTime.setFullYear(now.getFullYear() - 1);
    const startTimeDate = startTime ? new Date(startTime) : defaultStartTime;
    
    // Format dates for Google Trends
    const formatDate = (date: Date) => {
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    };
    
    // Get timestamps
    const startFormatted = formatDate(startTimeDate);
    const endFormatted = formatDate(endTimeDate);
    
    // Properly format the request params
    // This is based on reverse engineering the Google Trends request
    const token = new Date().getTime().toString();
    const req = {
      time: `${startFormatted} ${endFormatted}`,
      resolution: "WEEK",
      locale: "en-US",
      comparisonItem: [{ keyword, geo: "", time: `${startFormatted} ${endFormatted}` }],
      requestOptions: { property: "", backend: "IZG", category: 0 },
    };
    
    // Build the widget for the request
    const widget = {
      token,
      hl: "en-US",
      tz: -120,
      req: JSON.stringify(req),
    };
    
    // Build query parameters
    const params = new URLSearchParams();
    Object.entries(widget).forEach(([key, value]) => {
      params.append(key, value.toString());
    });
    
    // Make the request to Google Trends
    const response = await fetch(`${baseUrl}?${params.toString()}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
      },
    });
    
    if (!response.ok) {
      throw new Error(`Google Trends API error: ${response.status}`);
    }
    
    // Get text response
    const text = await response.text();
    
    // Google prefixes all JSON responses with ")]}'\n" - we need to remove this
    const jsonStr = text.substring(5);
    const data = JSON.parse(jsonStr);
    
    return {
      timelineData: data.default?.timelineData || [],
      averages: data.default?.averages || [],
    };
  } catch (error) {
    console.error("Error fetching trend data:", error);
    throw error;
  }
}

// Process and transform the raw data into a format suitable for our frontend
function processTrendData(rawData: any) {
  try {
    const { timelineData } = rawData;
    
    if (!timelineData || timelineData.length === 0) {
      return { trendData: [], error: "No trend data available" };
    }
    
    // Transform the data into the format expected by our frontend
    const trendData = timelineData.map((item: any) => {
      // Get the formatted time (month) from the raw data
      const date = new Date(parseInt(item.time) * 1000);
      const month = date.toLocaleString('default', { month: 'short' });
      
      // Get the interest value
      const value = item.value[0];
      
      return {
        month,
        searches: value,
        interest: Math.round(value * 0.8 + Math.random() * value * 0.4), // Simulating related interest
        formattedTime: item.formattedTime,
        date: date.toISOString(),
      };
    });
    
    return { trendData };
  } catch (error) {
    console.error("Error processing trend data:", error);
    return { trendData: [], error: "Failed to process trend data" };
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
    
    // Fetch data from Google Trends
    const rawTrendData = await fetchTrendData(keyword, startTime, endTime);
    
    // Process the data for our frontend
    const { trendData, error } = processTrendData(rawTrendData);
    
    if (error) {
      return new Response(
        JSON.stringify({ error }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
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
