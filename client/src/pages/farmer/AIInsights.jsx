import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { BrainCircuit, BellRing, TrendingUp, AlertTriangle, Sparkles, Send, Loader2 } from 'lucide-react';
import { DemandChart } from '../../components/charts/DemandChart';
import { askGeminiAI } from '../../services/geminiAiService';

export const AIInsights = () => {
    const [selectedCrop, setSelectedCrop] = useState('Tomato');
    const [loading, setLoading] = useState(true);
    const [aiAnalysis, setAiAnalysis] = useState('');
    const [customQuery, setCustomQuery] = useState('');
    const [queryResult, setQueryResult] = useState('');
    const [isQuerying, setIsQuerying] = useState(false);

    useEffect(() => {
        const fetchAI = async () => {
            setLoading(true);
            try {
                const res = await askGeminiAI(`Provide a comprehensive market insight for ${selectedCrop} in Maharashtra (Nashik/Pune/Ahmednagar mandis). Include 7-day demand trend, price forecast per KG, and advisory for farmers.`, 'farmer');
                setAiAnalysis(res);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchAI();
    }, [selectedCrop]);

    const handleCustomAsk = async (e) => {
        e.preventDefault();
        if (!customQuery.trim() || isQuerying) return;

        setIsQuerying(true);
        try {
            const res = await askGeminiAI(customQuery, 'farmer');
            setQueryResult(res);
        } catch (err) {
            setQueryResult('Failed to query AI Assistant. Please try again.');
        } finally {
            setIsQuerying(false);
        }
    };

    const mockDemandSeries = [
        { day: 'Mon', predictedDemand: 1200 },
        { day: 'Tue', predictedDemand: 1350 },
        { day: 'Wed', predictedDemand: 1400 },
        { day: 'Thu', predictedDemand: 1800 },
        { day: 'Fri', predictedDemand: 2200 },
        { day: 'Sat', predictedDemand: 2500 },
        { day: 'Sun', predictedDemand: 2800 },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">AgroConnect AI Market Insights</h1>
                    <p className="text-gray-500 mt-1">Real-time AI Powered market forecasts, price trends, and crop advisory.</p>
                </div>
                <div className="flex items-center space-x-2 bg-purple-50 text-purple-700 px-3.5 py-1.5 rounded-full border border-purple-200 shadow-sm font-bold text-xs">
                    <BrainCircuit className="w-4 h-4 text-purple-600 animate-pulse"/>
                    <span className="flex items-center gap-1">Gemini 1.5 Flash API Connected <Sparkles className="w-3 h-3 text-amber-500 fill-current"/></span>
                </div>
            </div>

            <div className="flex space-x-4 mb-6">
                <select 
                    className="form-select rounded-xl border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 font-bold text-sm" 
                    value={selectedCrop} 
                    onChange={(e) => setSelectedCrop(e.target.value)}
                >
                    <option value="Tomato">Fresh Red Tomato</option>
                    <option value="Onion">Export Red Onion</option>
                    <option value="Potato">Organic Potato</option>
                    <option value="Grapes">Seedless Green Grapes</option>
                    <option value="Wheat">Sharbati Wheat</option>
                </select>
                <select className="form-select rounded-xl border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 font-medium text-sm">
                    <option value="15km">Within 15 km Mandis</option>
                    <option value="50km">Within 50 km Mandis</option>
                    <option value="state">All Maharashtra Mandis</option>
                </select>
            </div>

            {/* Interactive Custom Gemini AI Query Bar */}
            <Card className="border-purple-200 bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 shadow-sm">
                <CardBody className="p-5">
                    <form onSubmit={handleCustomAsk} className="space-y-3">
                        <label className="block text-xs font-extrabold text-purple-900 uppercase tracking-wider flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4 text-amber-500 fill-current"/> Ask Gemini AI Any Agricultural Query:
                        </label>
                        <div className="flex gap-2">
                            <input 
                                type="text"
                                value={customQuery}
                                onChange={(e) => setCustomQuery(e.target.value)}
                                placeholder="e.g. What is the current mandi price of Grade A tomatoes in Nashik today?"
                                className="flex-1 border border-purple-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 outline-none bg-white"
                            />
                            <Button type="submit" isLoading={isQuerying} className="bg-purple-600 hover:bg-purple-700 font-bold text-sm px-6">
                                <Send className="w-4 h-4 mr-1"/> Ask AI
                            </Button>
                        </div>
                        {queryResult && (
                            <div className="mt-3 p-4 bg-white rounded-xl border border-purple-200 shadow-sm text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                                {queryResult}
                            </div>
                        )}
                    </form>
                </CardBody>
            </Card>

            {loading ? (
                <div className="py-16 flex flex-col items-center justify-center">
                    <Loader2 className="w-10 h-10 text-purple-600 animate-spin mb-3"/>
                    <p className="text-gray-500 text-sm font-semibold">Gemini AI is analyzing market trends for {selectedCrop}...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="shadow-sm">
                            <CardHeader className="flex justify-between items-center">
                                <h2 className="text-lg font-bold text-gray-900">7-Day Demand Forecast ({selectedCrop})</h2>
                                <span className="text-xs bg-purple-100 text-purple-800 px-2.5 py-1 rounded-full font-bold">
                                    Gemini AI Predictive Model
                                </span>
                            </CardHeader>
                            <CardBody>
                                <DemandChart data={mockDemandSeries} isPrototype={false}/>
                                <div className="mt-6 p-4 bg-purple-50 rounded-xl flex items-start border border-purple-100">
                                    <TrendingUp className="w-5 h-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0"/>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-purple-900 text-sm">Gemini AI Market Advisory ({selectedCrop})</h4>
                                        <p className="text-sm text-purple-800 mt-1.5 leading-relaxed whitespace-pre-wrap">{geminiAnalysis}</p>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                        <Card className="shadow-sm">
                            <CardHeader>
                                <h2 className="text-lg font-bold text-gray-900">Smart Alerts</h2>
                            </CardHeader>
                            <CardBody className="space-y-4">
                                <div className="flex items-start p-4 border-l-4 border-amber-500 bg-amber-50 rounded-r-xl">
                                    <AlertTriangle className="w-5 h-5 text-amber-600 mr-3 mt-0.5 flex-shrink-0"/>
                                    <div>
                                        <h4 className="font-bold text-amber-900 text-sm">Peak Demand Alert</h4>
                                        <p className="text-sm text-amber-800 mt-0.5">High B2B restaurant demand for {selectedCrop} detected in Pune. Current buyer budget is ₹25-30 / KG.</p>
                                    </div>
                                </div>
                                <div className="flex items-start p-4 border-l-4 border-green-500 bg-green-50 rounded-r-xl">
                                    <BellRing className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0"/>
                                    <div>
                                        <h4 className="font-bold text-green-900 text-sm">Bulk Buyer Opportunity</h4>
                                        <p className="text-sm text-green-800 mt-0.5">Pune Fresh Restaurant posted a bulk requirement for 500 KG {selectedCrop}. Your farm profile matches 94%.</p>
                                        <Button variant="outline" size="sm" className="mt-2 text-green-700 border-green-300 hover:bg-green-100 font-bold">
                                            View Requirement &amp; Submit Offer
                                        </Button>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card className="border-purple-200 bg-purple-50/50 shadow-sm">
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <h2 className="text-lg font-bold text-gray-900">Price Intelligence</h2>
                                    <BrainCircuit className="w-5 h-5 text-purple-600"/>
                                </div>
                            </CardHeader>
                            <CardBody className="space-y-6">
                                <div className="text-center bg-white p-4 rounded-xl border border-purple-100 shadow-sm">
                                    <p className="text-xs text-gray-500 font-bold uppercase mb-1">Suggested Farmgate Reference Price</p>
                                    <p className="text-3xl font-extrabold text-gray-900">₹26.00 <span className="text-sm font-normal text-gray-500">/ KG</span></p>
                                    <p className="text-xs text-gray-500 font-medium mt-1">Recommended Range: ₹24.00 - ₹28.00</p>
                                </div>
                                
                                <div className="space-y-3 pt-2">
                                    <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Price Factors</h3>
                                    <div className="flex justify-between items-center text-xs bg-white p-2.5 rounded-lg border border-gray-100">
                                        <span className="text-gray-600 font-medium">Local Mandi Demand</span>
                                        <span className="font-bold text-green-600">High (+18%) ↑</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs bg-white p-2.5 rounded-lg border border-gray-100">
                                        <span className="text-gray-600 font-medium">Shared Route Transport</span>
                                        <span className="font-bold text-blue-600">Low Cost (-12%) ↓</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs bg-white p-2.5 rounded-lg border border-gray-100">
                                        <span className="text-gray-600 font-medium">Quality Grade</span>
                                        <span className="font-bold text-amber-600">Grade A (Premium)</span>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                        <Card className="shadow-sm">
                            <CardHeader>
                                <h2 className="text-lg font-bold text-gray-900">Supply-Demand Gap</h2>
                            </CardHeader>
                            <CardBody>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-xs font-bold mb-1">
                                            <span className="text-gray-600">Market Demand</span>
                                            <span className="text-gray-900">4,500 KG</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-xs font-bold mb-1">
                                            <span className="text-gray-600">Listed Supply</span>
                                            <span className="text-gray-900">3,200 KG</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-amber-500 h-2 rounded-full" style={{ width: '71%' }}></div>
                                        </div>
                                    </div>
                                    <div className="pt-2 text-xs text-gray-600 bg-amber-50 p-3 rounded-lg border border-amber-100">
                                        Shortage of <span className="font-bold text-red-600">1,300 KG</span> in district. Excellent opportunity to list produce now.
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AIInsights;
