
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

interface CompetitorCardProps {
  competitor: {
    id: number;
    name: string;
    logo: string;
    website: string;
    foundedYear: number;
    priceRange: string;
    marketShare: number;
    strengths: string[];
    weaknesses: string[];
    productRating: number;
    reviews: {
      positive: number;
      neutral: number;
      negative: number;
    };
  };
}

const CompetitorCard: React.FC<CompetitorCardProps> = ({ competitor }) => {
  return (
    <Card className="shadow-sm card-hover">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">{competitor.name}</CardTitle>
        <a 
          href={competitor.website} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary hover:text-primary/80 flex items-center gap-1"
        >
          <span className="text-xs">Website</span>
          <ExternalLink size={14} />
        </a>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Founded: {competitor.foundedYear}</span>
          <span className="text-sm text-muted-foreground">Price: {competitor.priceRange}</span>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm">Market Share</span>
            <span className="text-sm font-medium">{competitor.marketShare}%</span>
          </div>
          <Progress value={competitor.marketShare} className="h-2" />
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm">Product Rating</span>
            <span className="text-sm font-medium">{competitor.productRating}/5</span>
          </div>
          <Progress value={competitor.productRating * 20} className="h-2" />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Strengths:</p>
          <div className="flex flex-wrap gap-1">
            {competitor.strengths.map((strength, index) => (
              <Badge key={index} variant="outline" className="bg-green-50 text-green-600 hover:bg-green-100 border-green-200">
                {strength}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Weaknesses:</p>
          <div className="flex flex-wrap gap-1">
            {competitor.weaknesses.map((weakness, index) => (
              <Badge key={index} variant="outline" className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200">
                {weakness}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-2">
          <div className="flex flex-col items-center p-2 bg-green-50 rounded-lg">
            <span className="text-xs text-muted-foreground">Positive</span>
            <span className="font-semibold text-green-600">{competitor.reviews.positive}%</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-yellow-50 rounded-lg">
            <span className="text-xs text-muted-foreground">Neutral</span>
            <span className="font-semibold text-yellow-600">{competitor.reviews.neutral}%</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-red-50 rounded-lg">
            <span className="text-xs text-muted-foreground">Negative</span>
            <span className="font-semibold text-red-600">{competitor.reviews.negative}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompetitorCard;
