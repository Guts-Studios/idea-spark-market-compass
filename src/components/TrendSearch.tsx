
import { useState } from 'react';
import { useTrendData } from '@/hooks/useTrendData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, AlertCircle, BarChart2, InfoIcon } from 'lucide-react';
import TrendChart from '@/components/TrendChart';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface TrendSearchProps {
  defaultKeyword?: string;
}

const TrendSearch: React.FC<TrendSearchProps> = ({ defaultKeyword = "eco-friendly water bottle" }) => {
  const [keyword, setKeyword] = useState(defaultKeyword);
  const [searchTerm, setSearchTerm] = useState(defaultKeyword);
  const { trendData, isLoading, error, isMockData, fetchTrendData } = useTrendData();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(keyword);
    await fetchTrendData({ keyword });
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex space-x-2">
        <Input 
          value={keyword} 
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Enter product or keyword"
          className="flex-1"
        />
        <Button 
          type="submit" 
          disabled={isLoading || !keyword.trim()}
          className="min-w-[100px]"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading
            </>
          ) : 'Search'}
        </Button>
      </form>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {trendData && trendData.length > 0 ? (
        <>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
            <h3 className="text-lg font-semibold mb-1">Market Trend Data</h3>
            <p className="text-sm text-muted-foreground">
              Showing trend data for: <span className="font-medium">{searchTerm}</span>
              {isMockData && (
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
                  <InfoIcon className="h-3 w-3 mr-1" />
                  Simulated Data
                </span>
              )}
            </p>
          </div>
          
          <TrendChart 
            data={trendData}
            xKey="month"
            lines={[
              { key: "searches", name: "Search Interest", color: "#0ea5e9" },
              { key: "interest", name: "Estimated Consumer Interest", color: "#8b5cf6" }
            ]}
            height={350}
          />
          
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="text-md font-semibold mb-1">Analysis Insights</h3>
            <p className="text-sm">
              This data shows market trends for "{searchTerm}" over the past year.
              The search interest indicates the relative popularity of the term over time.
              {isMockData && (
                <span className="block mt-2 text-amber-600">
                  Note: This is simulated data as real-time Google Trends data could not be accessed.
                </span>
              )}
            </p>
          </div>
        </>
      ) : !isLoading && !error && (
        <div className="py-8 text-center text-muted-foreground">
          <BarChart2 className="mx-auto h-12 w-12 opacity-30 mb-2" />
          Search for a product or keyword to see trend data
        </div>
      )}
    </div>
  );
}

export default TrendSearch;
