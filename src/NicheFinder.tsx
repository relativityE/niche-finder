import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, ScatterChart, Scatter } from 'recharts';
import { TrendingUp, Search, MessageCircle, Video, DollarSign, Target, CheckCircle, Star, ArrowUp, ArrowDown, Minus } from 'lucide-react';

// Define types for better TypeScript support
interface NicheData {
  id: number;
  name: string;
  category: string;
  profitability: number;
  competition: 'Low' | 'Medium' | 'High';
  trendDirection: 'up' | 'down' | 'stable';
  keywords: string[];
  platforms: {
    tiktok: { engagement: number; mentions: number; growth: number };
    reddit: { posts: number; upvotes: number; sentiment: number };
    google: { volume: number; trend: number; cpc: number };
  };
  revenue_potential: number;
  difficulty: number;
  opportunity_score: number;
}

const NicheFinder = () => {
  const [selectedNiche, setSelectedNiche] = useState<NicheData | null>(null);
  const [timeRange, setTimeRange] = useState('30d');
  const [analysisType, setAnalysisType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - in real app, this would come from APIs
  const niches: NicheData[] = [
    {
      id: 1,
      name: "AI Writing Tools",
      category: "Productivity",
      profitability: 92,
      competition: 'Medium',
      trendDirection: 'up',
      keywords: ["ai writing", "content generator", "copywriting ai"],
      platforms: {
        tiktok: { engagement: 2.3, mentions: 15400, growth: 23 },
        reddit: { posts: 890, upvotes: 12500, sentiment: 0.75 },
        google: { volume: 89000, trend: 15, cpc: 3.2 }
      },
      revenue_potential: 850000,
      difficulty: 65,
      opportunity_score: 87
    },
    {
      id: 2,
      name: "Meditation Apps",
      category: "Health & Wellness",
      profitability: 78,
      competition: 'High',
      trendDirection: 'up',
      keywords: ["meditation app", "mindfulness", "mental health"],
      platforms: {
        tiktok: { engagement: 1.8, mentions: 9200, growth: 12 },
        reddit: { posts: 1250, upvotes: 18700, sentiment: 0.82 },
        google: { volume: 156000, trend: 8, cpc: 2.1 }
      },
      revenue_potential: 720000,
      difficulty: 78,
      opportunity_score: 73
    },
    {
      id: 3,
      name: "NFT Analytics",
      category: "Crypto/Web3",
      profitability: 68,
      competition: 'Low',
      trendDirection: 'down',
      keywords: ["nft analytics", "crypto tracking", "nft tools"],
      platforms: {
        tiktok: { engagement: 0.9, mentions: 3400, growth: -15 },
        reddit: { posts: 567, upvotes: 4200, sentiment: 0.45 },
        google: { volume: 34000, trend: -22, cpc: 4.5 }
      },
      revenue_potential: 420000,
      difficulty: 45,
      opportunity_score: 61
    },
    {
      id: 4,
      name: "Language Learning Games",
      category: "Education",
      profitability: 85,
      competition: 'Medium',
      trendDirection: 'up',
      keywords: ["language learning", "educational games", "learn languages"],
      platforms: {
        tiktok: { engagement: 3.1, mentions: 22100, growth: 35 },
        reddit: { posts: 743, upvotes: 9800, sentiment: 0.71 },
        google: { volume: 198000, trend: 28, cpc: 1.8 }
      },
      revenue_potential: 1200000,
      difficulty: 72,
      opportunity_score: 82
    },
    {
      id: 5,
      name: "Personal Finance Dashboards",
      category: "Finance",
      profitability: 89,
      competition: 'Medium',
      trendDirection: 'up',
      keywords: ["budget tracker", "expense manager", "financial planning"],
      platforms: {
        tiktok: { engagement: 2.7, mentions: 18600, growth: 31 },
        reddit: { posts: 1890, upvotes: 28400, sentiment: 0.68 },
        google: { volume: 267000, trend: 19, cpc: 2.9 }
      },
      revenue_potential: 980000,
      difficulty: 69,
      opportunity_score: 85
    },
    {
      id: 6,
      name: "Workout Plan Generators",
      category: "Fitness",
      profitability: 76,
      competition: 'High',
      trendDirection: 'stable',
      keywords: ["workout planner", "fitness app", "exercise generator"],
      platforms: {
        tiktok: { engagement: 4.2, mentions: 31500, growth: 5 },
        reddit: { posts: 654, upvotes: 8900, sentiment: 0.79 },
        google: { volume: 145000, trend: 2, cpc: 1.4 }
      },
      revenue_potential: 650000,
      difficulty: 81,
      opportunity_score: 69
    }
  ];

  const trendData = [
    { month: 'Jan', searches: 45000, mentions: 1200, engagement: 2.1 },
    { month: 'Feb', searches: 52000, mentions: 1450, engagement: 2.3 },
    { month: 'Mar', searches: 48000, mentions: 1380, engagement: 2.5 },
    { month: 'Apr', searches: 61000, mentions: 1650, engagement: 2.8 },
    { month: 'May', searches: 58000, mentions: 1590, engagement: 3.1 },
    { month: 'Jun', searches: 67000, mentions: 1820, engagement: 3.4 }
  ];

  const categoryData = [
    { name: 'Productivity', value: 25, color: '#8884d8' },
    { name: 'Health & Wellness', value: 20, color: '#82ca9d' },
    { name: 'Education', value: 18, color: '#ffc658' },
    { name: 'Finance', value: 15, color: '#ff7300' },
    { name: 'Entertainment', value: 12, color: '#00ff88' },
    { name: 'Other', value: 10, color: '#0088fe' }
  ];

  const competitionData = niches.map(niche => ({
    name: niche.name.split(' ')[0],
    difficulty: niche.difficulty,
    opportunity: niche.opportunity_score,
    revenue: niche.revenue_potential / 10000
  }));

  const getTrendIcon = (direction: 'up' | 'down' | 'stable') => {
    switch(direction) {
      case 'up': return <ArrowUp className="w-4 h-4 text-green-500" />;
      case 'down': return <ArrowDown className="w-4 h-4 text-red-500" />;
      default: return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getCompetitionColor = (competition: 'Low' | 'Medium' | 'High') => {
    switch(competition) {
      case 'Low': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'High': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredNiches = niches.filter(niche => 
    niche.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    niche.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    niche.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
            <Target className="w-10 h-10 text-indigo-600" />
            AI Niche Finder Dashboard
          </h1>
          <p className="text-gray-600 text-lg">Discover profitable digital product opportunities using AI-powered trend analysis</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Niches</label>
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, category, or keyword..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Range</label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Analysis Type</label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                value={analysisType}
                onChange={(e) => setAnalysisType(e.target.value)}
              >
                <option value="all">All Platforms</option>
                <option value="tiktok">TikTok Focus</option>
                <option value="reddit">Reddit Focus</option>
                <option value="google">Google Trends</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Analyze Trends
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Niches</p>
                <p className="text-2xl font-bold text-gray-800">{filteredNiches.length}</p>
              </div>
              <Target className="w-8 h-8 text-indigo-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Revenue Potential</p>
                <p className="text-2xl font-bold text-green-600">
                  ${Math.round(filteredNiches.reduce((acc, n) => acc + n.revenue_potential, 0) / filteredNiches.length / 1000)}K
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">High Opportunity</p>
                <p className="text-2xl font-bold text-purple-600">
                  {filteredNiches.filter(n => n.opportunity_score > 80).length}
                </p>
              </div>
              <Star className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Low Competition</p>
                <p className="text-2xl font-bold text-blue-600">
                  {filteredNiches.filter(n => n.competition === 'Low').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Trend Analysis */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              Search & Engagement Trends
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="searches" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="mentions" stroke="#82ca9d" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Category Distribution */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Niche Categories</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, value}) => `${name}: ${value}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Competition vs Opportunity */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Opportunity vs Competition Analysis</h3>
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart data={competitionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="difficulty" name="Competition Level" />
              <YAxis dataKey="opportunity" name="Opportunity Score" />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white p-3 border rounded shadow">
                        <p className="font-semibold">{data.name}</p>
                        <p>Competition: {data.difficulty}%</p>
                        <p>Opportunity: {data.opportunity}%</p>
                        <p>Revenue: ${data.revenue}K</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Scatter dataKey="opportunity" fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        {/* Niche List */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Top Digital Product Niches</h3>
          <div className="space-y-4">
            {filteredNiches
              .sort((a, b) => b.opportunity_score - a.opportunity_score)
              .map((niche) => (
              <div 
                key={niche.id} 
                className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                  selectedNiche?.id === niche.id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'
                }`}
                onClick={() => setSelectedNiche(selectedNiche?.id === niche.id ? null : niche)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h4 className="text-lg font-semibold text-gray-800">{niche.name}</h4>
                    {getTrendIcon(niche.trendDirection)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCompetitionColor(niche.competition)}`}>
                      {niche.competition} Competition
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Opportunity Score</p>
                      <p className="text-xl font-bold text-indigo-600">{niche.opportunity_score}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Video className="w-4 h-4 text-pink-500" />
                    <span>TikTok: {niche.platforms.tiktok.mentions.toLocaleString()} mentions</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MessageCircle className="w-4 h-4 text-orange-500" />
                    <span>Reddit: {niche.platforms.reddit.posts} posts</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Search className="w-4 h-4 text-blue-500" />
                    <span>Google: {niche.platforms.google.volume.toLocaleString()} searches</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <DollarSign className="w-4 h-4 text-green-500" />
                    <span>Revenue: ${Math.round(niche.revenue_potential / 1000)}K</span>
                  </div>
                </div>

                {selectedNiche?.id === niche.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <h5 className="font-semibold text-gray-800 mb-2">Platform Details</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>TikTok Growth:</span>
                            <span className={niche.platforms.tiktok.growth > 0 ? 'text-green-600' : 'text-red-600'}>
                              {niche.platforms.tiktok.growth > 0 ? '+' : ''}{niche.platforms.tiktok.growth}%
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Reddit Sentiment:</span>
                            <span className="text-blue-600">{Math.round(niche.platforms.reddit.sentiment * 100)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Google CPC:</span>
                            <span className="text-green-600">${niche.platforms.google.cpc}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-800 mb-2">Key Metrics</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Profitability:</span>
                            <span className="text-green-600">{niche.profitability}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Difficulty:</span>
                            <span className="text-orange-600">{niche.difficulty}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Category:</span>
                            <span className="text-gray-600">{niche.category}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-800 mb-2">Top Keywords</h5>
                        <div className="flex flex-wrap gap-2">
                          {niche.keywords.map((keyword, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Data updated every 24 hours • Powered by AI trend analysis across TikTok, Reddit, and Google</p>
        </div>
      </div>
    </div>
  );
};

export default NicheFinder;
