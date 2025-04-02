
import { useEffect } from "react";
import { BarChart2, TrendingUp, Users, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import DashboardCard from "@/components/DashboardCard";
import TrendChart from "@/components/TrendChart";
import SentimentGauge from "@/components/SentimentGauge";
import { dashboardSummary, sentimentData, marketTrendsData } from "@/lib/mockData";
import TrendSearch from "@/components/TrendSearch";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const Dashboard = () => {
  // Set document title
  useEffect(() => {
    document.title = "Dashboard | MarketCompass";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Market Research Dashboard</h1>
            <p className="text-muted-foreground">
              Comprehensive insights for your product idea: Eco-friendly Water Bottles
            </p>
          </div>

          {/* Live Data Alert */}
          <Alert className="mb-8 bg-blue-50 border-blue-200">
            <TrendingUp className="h-4 w-4 text-blue-500" />
            <AlertTitle>Live Google Trends Data Available</AlertTitle>
            <AlertDescription>
              You can now search for any product or keyword to see real-time market trend data from Google Trends.
            </AlertDescription>
          </Alert>

          {/* Google Trends Search */}
          <DashboardCard title="Live Market Trends" className="mb-10">
            <TrendSearch defaultKeyword="eco-friendly water bottle" />
          </DashboardCard>

          {/* Viability Score */}
          <div className="mb-10">
            <Card className="bg-gradient-to-r from-blue-50 to-sky-50">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-bold mb-2">Idea Viability Score</h2>
                    <p className="text-sm text-muted-foreground mb-4 md:mb-0">
                      Based on market trends, competition, and consumer sentiment
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="relative flex items-center justify-center w-32 h-32 mb-2">
                      <svg className="w-full h-full" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#e6e6e6"
                          strokeWidth="3"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#0ea5e9"
                          strokeWidth="3"
                          strokeDasharray={`${dashboardSummary.ideaViability}, 100`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold">{dashboardSummary.ideaViability}</span>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">out of 100</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <DashboardCard
              title="Market Growth"
              icon={<TrendingUp size={18} />}
            >
              <div className="text-3xl font-bold">{dashboardSummary.marketGrowth}</div>
              <p className="text-sm text-muted-foreground">Annual growth rate</p>
            </DashboardCard>

            <DashboardCard
              title="Competition Level"
              icon={<Users size={18} />}
            >
              <div className="text-3xl font-bold">{dashboardSummary.competitionLevel}</div>
              <div className="mt-2">
                <Progress value={dashboardSummary.competitionLevel === "High" ? 80 : dashboardSummary.competitionLevel === "Medium" ? 50 : 30} className="h-2" />
              </div>
            </DashboardCard>

            <DashboardCard
              title="Consumer Sentiment"
              icon={<MessageSquare size={18} />}
            >
              <div className="text-3xl font-bold">{dashboardSummary.consumerSentiment}</div>
              <div className="mt-2">
                <Progress 
                  value={dashboardSummary.consumerSentiment === "Favorable" ? 75 : dashboardSummary.consumerSentiment === "Neutral" ? 50 : 25} 
                  className="h-2" 
                />
              </div>
            </DashboardCard>

            <DashboardCard
              title="Market Size"
              icon={<BarChart2 size={18} />}
            >
              <div className="text-3xl font-bold">{dashboardSummary.estimatedTAM}</div>
              <p className="text-sm text-muted-foreground">Total addressable market</p>
            </DashboardCard>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <DashboardCard title="Search Trend Analysis (Historical)">
              <TrendChart 
                data={marketTrendsData.trendOverTime}
                xKey="month"
                lines={[
                  { key: "searches", name: "Search Volume", color: "#0ea5e9" },
                  { key: "interest", name: "Consumer Interest", color: "#8b5cf6" }
                ]}
              />
            </DashboardCard>

            <DashboardCard title="Overall Sentiment Distribution">
              <SentimentGauge 
                positive={sentimentData.overall.positive}
                neutral={sentimentData.overall.neutral}
                negative={sentimentData.overall.negative}
              />
            </DashboardCard>
          </div>

          {/* Opportunities & Challenges */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DashboardCard title="Top Market Opportunities">
              <ul className="space-y-2">
                {dashboardSummary.topOpportunities.map((opportunity, index) => (
                  <li key={index} className="flex items-center gap-2 p-2 bg-green-50 rounded-md">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    <span>{opportunity}</span>
                  </li>
                ))}
              </ul>
            </DashboardCard>

            <DashboardCard title="Top Market Challenges">
              <ul className="space-y-2">
                {dashboardSummary.topChallenges.map((challenge, index) => (
                  <li key={index} className="flex items-center gap-2 p-2 bg-red-50 rounded-md">
                    <span className="h-2 w-2 rounded-full bg-red-500"></span>
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </DashboardCard>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
