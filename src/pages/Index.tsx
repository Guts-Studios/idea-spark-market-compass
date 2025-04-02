
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import IdeaForm from "@/components/IdeaForm";
import { BarChart2, TrendingUp, MessageSquare, Users, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto py-4 px-4 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold text-primary">MarketCompass</h1>
          <div className="flex gap-2">
            {user ? (
              <Link to="/dashboard">
                <Button>Dashboard</Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button className="flex items-center gap-2">
                  <LogIn size={18} />
                  <span>Sign In</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 lg:px-8">
        <section className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
              Turn Your Business Ideas into Market Opportunities
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Our AI-powered market research platform helps you validate your business ideas with
              real-time data analysis, competitor insights, and sentiment analysis.
            </p>
            <div className="flex flex-wrap gap-4">
              {user ? (
                <>
                  <Button size="lg" className="gap-2" asChild>
                    <Link to="/dashboard">
                      <span>Go to Dashboard</span>
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href="#start">
                      <span>Start Analysis</span>
                    </a>
                  </Button>
                </>
              ) : (
                <>
                  <Button size="lg" className="gap-2" asChild>
                    <Link to="/auth">
                      <LogIn className="h-5 w-5" />
                      <span>Sign In / Register</span>
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href="#start">
                      <span>Try Without Account</span>
                    </a>
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Market Analysis"
              className="w-full h-auto"
            />
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Insights That Power Your Business Decisions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="card-hover">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">Market Trend Analysis</h3>
                <p className="text-gray-600">
                  Track market trends, keyword volumes, and seasonal patterns to identify the perfect
                  market timing.
                </p>
              </CardContent>
            </Card>
            <Card className="card-hover">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">Competitor Intelligence</h3>
                <p className="text-gray-600">
                  Analyze competitor strengths, weaknesses, pricing, and market positioning to find your edge.
                </p>
              </CardContent>
            </Card>
            <Card className="card-hover">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">Sentiment Analysis</h3>
                <p className="text-gray-600">
                  Understand how consumers feel about products and services in your target market.
                </p>
              </CardContent>
            </Card>
            <Card className="card-hover">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <BarChart2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">Demand Forecasting</h3>
                <p className="text-gray-600">
                  Predictive analysis to estimate market demand and identify growth opportunities.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="start" className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-6 text-center">
                Submit Your Business Idea
              </h2>
              <IdeaForm />
              {!user && (
                <div className="mt-6 pt-4 border-t text-center">
                  <p className="text-muted-foreground mb-2">Create an account to save your results</p>
                  <Link to="/auth">
                    <Button variant="outline" className="gap-2">
                      <LogIn size={16} />
                      <span>Sign In or Register</span>
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="bg-gray-50 border-t mt-20 py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">© 2023 MarketCompass. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
