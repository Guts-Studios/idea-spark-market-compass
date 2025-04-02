
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import DashboardCard from "@/components/DashboardCard";
import TrendChart from "@/components/TrendChart";
import { marketTrendsData } from "@/lib/mockData";
import { Badge } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const MarketTrends = () => {
  // Set document title
  useEffect(() => {
    document.title = "Market Trends | MarketCompass";
  }, []);

  // Define a function to get badge color based on difficulty
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Market Trend Analysis</h1>
            <p className="text-muted-foreground">
              Detailed insights into market trends for eco-friendly water bottles
            </p>
          </div>

          {/* Trend Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <DashboardCard title="Search Interest Over Time">
              <TrendChart 
                data={marketTrendsData.trendOverTime}
                xKey="month"
                lines={[
                  { key: "searches", name: "Search Volume", color: "#0ea5e9" },
                  { key: "interest", name: "Consumer Interest", color: "#8b5cf6" }
                ]}
              />
              <div className="mt-4 text-sm text-muted-foreground">
                <p>Data shows increasing search interest starting from April, with peak interest in July-August.</p>
              </div>
            </DashboardCard>

            <DashboardCard title="Market Seasonality">
              <TrendChart 
                data={marketTrendsData.seasonality}
                xKey="month"
                lines={[
                  { key: "index", name: "Seasonality Index", color: "#10b981" }
                ]}
              />
              <div className="mt-4 text-sm text-muted-foreground">
                <p>Strong seasonality observed, with peak demand during summer months (June-August).</p>
              </div>
            </DashboardCard>
          </div>

          {/* Market Size */}
          <div className="mb-8">
            <DashboardCard title="Market Size Analysis">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-blue-50 rounded-lg p-4 flex flex-col items-center justify-center">
                  <span className="text-sm text-blue-600 font-medium mb-1">Current Global Market</span>
                  <span className="text-2xl font-bold">{marketTrendsData.marketSize.global}</span>
                </div>
                <div className="bg-green-50 rounded-lg p-4 flex flex-col items-center justify-center">
                  <span className="text-sm text-green-600 font-medium mb-1">Annual Growth Rate</span>
                  <span className="text-2xl font-bold">{marketTrendsData.marketSize.cagr}</span>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 flex flex-col items-center justify-center">
                  <span className="text-sm text-purple-600 font-medium mb-1">2025 Forecast</span>
                  <span className="text-2xl font-bold">{marketTrendsData.marketSize.forecast2025}</span>
                </div>
              </div>
              <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Key Growth Drivers</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Increasing environmental awareness among consumers</li>
                  <li>Growing preference for reusable products</li>
                  <li>Rising health consciousness and hydration trends</li>
                  <li>Corporate sustainability initiatives driving B2B demand</li>
                </ul>
              </div>
            </DashboardCard>
          </div>

          {/* Related Keywords */}
          <div className="mb-8">
            <DashboardCard title="Keyword Analysis">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Keyword</TableHead>
                      <TableHead>Monthly Search Volume</TableHead>
                      <TableHead>Difficulty</TableHead>
                      <TableHead>CPC ($)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {marketTrendsData.relatedKeywords.map((keyword, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{keyword.keyword}</TableCell>
                        <TableCell>{keyword.volume.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge className={`font-normal ${getDifficultyColor(keyword.difficulty)}`}>
                            {keyword.difficulty}
                          </Badge>
                        </TableCell>
                        <TableCell>${keyword.cpc}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-4 p-4 bg-amber-50 rounded-lg">
                <h3 className="font-medium mb-2">Keyword Insights</h3>
                <p className="text-sm">
                  "Reusable water bottle" has the highest search volume but faces high competition. 
                  "Glass water bottle" presents lower competition with reasonable search volume,
                  potentially offering a better entry point.
                </p>
              </div>
            </DashboardCard>
          </div>

          {/* Recommendations */}
          <DashboardCard title="Market Entry Recommendations">
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium mb-2">Timing Strategy</h3>
                <p className="text-sm">
                  Plan product launches for April-May to capture the rising summer demand curve.
                  Consider promotional campaigns during January to target the "new year's resolution" audience.
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium mb-2">Positioning Strategy</h3>
                <p className="text-sm">
                  Focus on eco-friendly and health benefits rather than just reusability.
                  Consider targeting the "glass water bottle" niche which shows lower competition.
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-medium mb-2">Marketing Focus</h3>
                <p className="text-sm">
                  Emphasize sustainability credentials during peak environmental awareness periods.
                  Target fitness and outdoor recreation segments during summer months.
                </p>
              </div>
            </div>
          </DashboardCard>
        </main>
      </div>
    </div>
  );
};

export default MarketTrends;
