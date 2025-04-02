
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import DashboardCard from "@/components/DashboardCard";
import SentimentGauge from "@/components/SentimentGauge";
import TrendChart from "@/components/TrendChart";
import { sentimentData } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const SentimentAnalysis = () => {
  // Set document title
  useEffect(() => {
    document.title = "Sentiment Analysis | MarketCompass";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Sentiment Analysis</h1>
            <p className="text-muted-foreground">
              Analysis of customer sentiment across various platforms for eco-friendly water bottles
            </p>
          </div>

          {/* Overall Sentiment */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <DashboardCard title="Overall Market Sentiment">
              <SentimentGauge 
                positive={sentimentData.overall.positive}
                neutral={sentimentData.overall.neutral}
                negative={sentimentData.overall.negative}
              />
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium mb-2">Key Insight</h3>
                <p className="text-sm">
                  The eco-friendly water bottle market enjoys a predominantly positive sentiment (72%),
                  with environmental benefits and product durability being the most appreciated aspects.
                </p>
              </div>
            </DashboardCard>

            <DashboardCard title="Sentiment Trend (Last 12 Months)">
              <TrendChart 
                data={sentimentData.reviewTrend}
                xKey="month"
                lines={[
                  { key: "sentiment", name: "Positive Sentiment %", color: "#10b981" }
                ]}
                height={240}
              />
              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium mb-2">Trend Analysis</h3>
                <p className="text-sm">
                  Positive sentiment has been steadily increasing throughout the year, with a notable
                  jump during the summer months. This aligns with increased environmental awareness campaigns
                  and peak usage season.
                </p>
              </div>
            </DashboardCard>
          </div>

          {/* Platform Breakdown */}
          <div className="mb-8">
            <DashboardCard title="Sentiment by Platform">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
                {Object.entries(sentimentData.byPlatform).map(([platform, data]) => (
                  <div key={platform} className="bg-white rounded-lg p-4 border">
                    <h3 className="font-medium mb-3 capitalize">{platform}</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-green-600">Positive</span>
                          <span className="text-xs font-medium">{data.positive}%</span>
                        </div>
                        <Progress value={data.positive} className="h-2 bg-gray-100" indicatorColor="bg-green-500" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-yellow-600">Neutral</span>
                          <span className="text-xs font-medium">{data.neutral}%</span>
                        </div>
                        <Progress value={data.neutral} className="h-2 bg-gray-100" indicatorColor="bg-yellow-500" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-red-600">Negative</span>
                          <span className="text-xs font-medium">{data.negative}%</span>
                        </div>
                        <Progress value={data.negative} className="h-2 bg-gray-100" indicatorColor="bg-red-500" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium mb-2">Platform Insights</h3>
                <p className="text-sm mb-2">
                  Amazon reviews show the most positive sentiment (78%), while Reddit discussions are more critical (62% positive).
                  This suggests consumers are generally satisfied with their purchases, while enthusiasts in community platforms
                  have higher expectations and highlight more issues.
                </p>
                <p className="text-sm">
                  For marketing, leverage positive Amazon reviews. For product improvements, focus on Reddit and Twitter feedback.
                </p>
              </div>
            </DashboardCard>
          </div>

          {/* Common Phrases */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <DashboardCard title="Top Positive Phrases">
              <div className="space-y-3">
                {sentimentData.commonPhrases.positive.map((phrase, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200 py-1.5 px-3">
                      "{phrase.phrase}"
                    </Badge>
                    <span className="text-sm font-medium">{phrase.count} mentions</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium mb-2">Positive Sentiment Drivers</h3>
                <p className="text-sm">
                  Functional benefits (insulation, durability, leak-proof design) are the primary drivers
                  of positive sentiment, followed by aesthetic appeal (colors, design).
                </p>
              </div>
            </DashboardCard>

            <DashboardCard title="Top Negative Phrases">
              <div className="space-y-3">
                {sentimentData.commonPhrases.negative.map((phrase, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <Badge className="bg-red-100 text-red-800 hover:bg-red-200 py-1.5 px-3">
                      "{phrase.phrase}"
                    </Badge>
                    <span className="text-sm font-medium">{phrase.count} mentions</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-red-50 rounded-lg">
                <h3 className="font-medium mb-2">Pain Points to Address</h3>
                <p className="text-sm">
                  Price sensitivity is the top concern, followed by specific product issues (cleaning difficulty,
                  durability of certain components). Addressing these in product development could create significant
                  competitive advantage.
                </p>
              </div>
            </DashboardCard>
          </div>

          {/* Market Opportunities */}
          <DashboardCard title="Sentiment-Based Market Opportunities">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-medium mb-2">Product Development Recommendations</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Focus on easier-to-clean designs (address top negative sentiment)</li>
                    <li>Improve durability of lids and paint (address reported weaknesses)</li>
                    <li>Maintain excellent insulation properties (leverage strength)</li>
                    <li>Expand color and design options (capitalize on positive sentiment)</li>
                  </ul>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium mb-2">Messaging Strategy</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Emphasize "keeps drinks cold/hot" in marketing materials</li>
                    <li>Highlight durability features and guarantees</li>
                    <li>Address price concerns by emphasizing long-term value and durability</li>
                    <li>Showcase easy-cleaning features if implementing improved design</li>
                  </ul>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-medium mb-2">Platform-Specific Engagement</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Amazon: Highlight positive reviews about insulation and durability</li>
                    <li>Twitter: Engage with environmental benefit conversations</li>
                    <li>Reddit: Address technical questions about materials and design</li>
                    <li>Facebook: Focus on lifestyle benefits and aesthetic appeal</li>
                  </ul>
                </div>
                <div className="p-4 bg-amber-50 rounded-lg">
                  <h3 className="font-medium mb-2">Competitive Positioning</h3>
                  <p className="text-sm mb-2">
                    Based on sentiment analysis, position as:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Premium but accessible (address price sensitivity)</li>
                    <li>Durable and reliable (address durability concerns)</li>
                    <li>Easy to maintain (address cleaning difficulties)</li>
                    <li>Environmentally responsible (leverage strong positive sentiment)</li>
                  </ul>
                </div>
              </div>
            </div>
          </DashboardCard>
        </main>
      </div>
    </div>
  );
};

export default SentimentAnalysis;
