
import { useState } from 'react';
import { useTrendData } from '@/hooks/useTrendData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import TrendChart from '@/components/TrendChart';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface TrendSearchProps {
  defaultKeyword?: string;
}

const TrendSearch: React.FC<TrendSearchProps> = ({ defaultKeyword = "eco-friendly water bottle" }) => {
  const [keyword, setKeyword] = useState(defaultKeyword);
  const [searchTerm, setSearchTerm] = useState(defaultKeyword);
  const { trendData, isLoading, error, fetchTrendData } = useTrendData();

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
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {trendData && trendData.length > 0 ? (
        <>
          <div className="p-4 bg-blue-50 rounded-lg mb-4">
            <h3 className="text-lg font-semibold mb-1">Google Trends Data</h3>
            <p className="text-sm text-muted-foreground">
              Showing actual search interest over time for: <span className="font-medium">{searchTerm}</span>
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
              This data shows real Google Trends interest for "{searchTerm}" over the past year.
              The search interest indicates relative popularity of the term, where 100 is the peak popularity.
            </p>
          </div>
        </>
      ) : !isLoading && !error && (
        <div className="py-8 text-center text-muted-foreground">
          Search for a product or keyword to see trend data
        </div>
      )}
    </div>
  );
};

export default TrendSearch;
