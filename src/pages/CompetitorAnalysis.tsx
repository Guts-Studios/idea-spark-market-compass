
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import DashboardCard from "@/components/DashboardCard";
import CompetitorCard from "@/components/CompetitorCard";
import { competitorsData } from "@/lib/mockData";
import { ResponsiveBar } from "@nivo/bar";

const CompetitorAnalysis = () => {
  // Set document title
  useEffect(() => {
    document.title = "Competitor Analysis | MarketCompass";
  }, []);

  // Prepare data for market share chart
  const marketShareData = competitorsData.map(comp => ({
    name: comp.name,
    marketShare: comp.marketShare
  }));

  // Prepare data for ratings comparison
  const ratingsData = competitorsData.map(competitor => ({
    competitor: competitor.name,
    rating: competitor.productRating
  }));
  
  // Prepare data for review sentiment comparison
  const reviewData = competitorsData.map(competitor => ({
    competitor: competitor.name,
    positive: competitor.reviews.positive,
    neutral: competitor.reviews.neutral,
    negative: competitor.reviews.negative,
  }));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Competitor Analysis</h1>
            <p className="text-muted-foreground">
              Detailed analysis of major competitors in the eco-friendly water bottle market
            </p>
          </div>

          {/* Competitor Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {competitorsData.map((competitor) => (
              <CompetitorCard key={competitor.id} competitor={competitor} />
            ))}
          </div>

          {/* Market Share Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <DashboardCard title="Market Share Comparison">
              <div className="h-[300px] w-full">
                <ResponsiveBar
                  data={marketShareData}
                  keys={["marketShare"]}
                  indexBy="name"
                  margin={{ top: 20, right: 30, bottom: 50, left: 60 }}
                  padding={0.3}
                  valueScale={{ type: "linear" }}
                  indexScale={{ type: "band", round: true }}
                  colors={"#0ea5e9"}
                  borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Competitor",
                    legendPosition: "middle",
                    legendOffset: 32
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Market Share (%)",
                    legendPosition: "middle",
                    legendOffset: -40
                  }}
                  labelSkipWidth={12}
                  labelSkipHeight={12}
                  labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
                />
              </div>
            </DashboardCard>

            <DashboardCard title="Product Rating Comparison">
              <div className="h-[300px] w-full">
                <ResponsiveBar
                  data={ratingsData}
                  keys={["rating"]}
                  indexBy="competitor"
                  margin={{ top: 20, right: 30, bottom: 50, left: 60 }}
                  padding={0.3}
                  valueScale={{ type: "linear" }}
                  indexScale={{ type: "band", round: true }}
                  colors={"#8b5cf6"}
                  borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Competitor",
                    legendPosition: "middle",
                    legendOffset: 32
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Rating (out of 5)",
                    legendPosition: "middle",
                    legendOffset: -40
                  }}
                  maxValue={5}
                  labelSkipWidth={12}
                  labelSkipHeight={12}
                  labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
                />
              </div>
            </DashboardCard>
          </div>

          {/* Customer Reviews */}
          <div className="mb-8">
            <DashboardCard title="Customer Sentiment Comparison">
              <div className="h-[400px] w-full">
                <ResponsiveBar
                  data={reviewData}
                  keys={["positive", "neutral", "negative"]}
                  indexBy="competitor"
                  margin={{ top: 20, right: 130, bottom: 50, left: 60 }}
                  padding={0.3}
                  groupMode="grouped"
                  valueScale={{ type: "linear" }}
                  indexScale={{ type: "band", round: true }}
                  colors={["#10b981", "#f59e0b", "#ef4444"]}
                  borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Competitor",
                    legendPosition: "middle",
                    legendOffset: 32
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Percentage (%)",
                    legendPosition: "middle",
                    legendOffset: -40
                  }}
                  labelSkipWidth={12}
                  labelSkipHeight={12}
                  labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
                  legends={[
                    {
                      dataFrom: "keys",
                      anchor: "bottom-right",
                      direction: "column",
                      justify: false,
                      translateX: 120,
                      translateY: 0,
                      itemsSpacing: 2,
                      itemWidth: 100,
                      itemHeight: 20,
                      itemDirection: "left-to-right",
                      itemOpacity: 0.85,
                      symbolSize: 20,
                      effects: [
                        {
                          on: "hover",
                          style: {
                            itemOpacity: 1
                          }
                        }
                      ]
                    }
                  ]}
                />
              </div>
            </DashboardCard>
          </div>

          {/* Competitive Advantage Strategy */}
          <DashboardCard title="Competitive Edge Strategy">
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium mb-2">Price Strategy</h3>
                <p className="text-sm">
                  The market is split between premium brands like Yeti and HydroFlask ($30-55) and mid-range brands like Contigo ($15-35).
                  For a new entrant, consider a mid-premium positioning ($25-40) with emphasis on unique features.
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium mb-2">Feature Differentiation</h3>
                <p className="text-sm">
                  Focus on addressing key competitor weaknesses:
                </p>
                <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                  <li>Target HydroFlask's limited customization with more personalized options</li>
                  <li>Address S'well's durability issues with enhanced materials</li>
                  <li>Improve on Contigo's premium feel while maintaining competitive pricing</li>
                </ul>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-medium mb-2">Distribution Strategy</h3>
                <p className="text-sm">
                  Yeti and HydroFlask have strong retail presence. Consider a balanced approach with DTC (direct-to-consumer)
                  e-commerce focus initially, then strategic retail partnerships to enhance visibility.
                </p>
              </div>
              <div className="p-4 bg-amber-50 rounded-lg">
                <h3 className="font-medium mb-2">Market Gap Opportunity</h3>
                <p className="text-sm">
                  A significant opportunity exists in combining premium durability (like Yeti) with
                  stylish design (like S'well) at a slightly more accessible price point, with enhanced customization options.
                </p>
              </div>
            </div>
          </DashboardCard>
        </main>
      </div>
    </div>
  );
};

export default CompetitorAnalysis;
