
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface TrendDataParams {
  keyword: string;
  startTime?: string;
  endTime?: string;
}

export function useTrendData() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMockData, setIsMockData] = useState(false);
  const { toast } = useToast();

  const fetchTrendData = async ({ keyword, startTime, endTime }: TrendDataParams) => {
    setIsLoading(true);
    setError(null);
    setIsMockData(false);

    try {
      const { data: response, error } = await supabase.functions.invoke('google-trends', {
        body: { keyword, startTime, endTime },
      });

      if (error) {
        throw new Error(error.message || 'Failed to fetch trend data');
      }

      if (response.error) {
        throw new Error(response.error);
      }

      // Check if the data is mock/simulated
      setIsMockData(response.isMock === true);
      
      if (response.isMock) {
        toast({
          title: 'Using simulated trend data',
          description: 'Real-time Google Trends data is currently unavailable.',
          variant: 'default',
        });
      }

      setData(response.data || []);
      return response.data || [];
    } catch (err: any) {
      const errorMessage = err.message || 'An error occurred while fetching trend data';
      setError(errorMessage);
      toast({
        title: 'Error fetching trend data',
        description: errorMessage,
        variant: 'destructive',
      });
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return {
    trendData: data,
    isLoading,
    error,
    isMockData,
    fetchTrendData,
  };
}

