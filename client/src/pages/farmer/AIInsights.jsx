import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { BrainCircuit, BellRing, TrendingUp, AlertTriangle } from 'lucide-react';
import { DemandChart } from '../../components/charts/DemandChart';
import { getDemandForecast, getPriceIntelligence } from '../../services/aiService';
export const AIInsights = () => {
    const [selectedCrop, setSelectedCrop] = useState('Tomato');
    const [demandData, setDemandData] = useState(null);
    const [priceData, setPriceData] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchAI = async () => {
            setLoading(true);
            try {
                const [demand, price] = await Promise.all([
                    getDemandForecast(selectedCrop, 'Local'),
                    getPriceIntelligence(selectedCrop, 'Local')
                ]);
                setDemandData(demand.data);
                setPriceData(price.data);
            }
            catch (err) {
                console.error(err);
            }
            finally {
                setLoading(false);
            }
        };
        fetchAI();
    }, [selectedCrop]);
    const mockDemandSeries = [
        { day: 'Mon', predictedDemand: 1200 },
        { day: 'Tue', predictedDemand: 1350 },
        { day: 'Wed', predictedDemand: 1400 },
        { day: 'Thu', predictedDemand: 1800 },
        { day: 'Fri', predictedDemand: 2200 },
        { day: 'Sat', predictedDemand: 2500 },
        { day: 'Sun', predictedDemand: 2800 },
    ];
    return (<div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI Market Insights</h1>
          <p className="text-gray-500 mt-1">Prototype AI Predictions to help you make better farming and pricing decisions.</p>
        </div>
        <div className="flex items-center space-x-2 bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full border border-purple-200">
          <BrainCircuit className="w-4 h-4"/>
          <span className="text-sm font-medium">AI Powered</span>
        </div>
      </div>

      <div className="flex space-x-4 mb-6">
        <select className="form-select rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 font-medium" value={selectedCrop} onChange={(e) => setSelectedCrop(e.target.value)}>
          <option value="Tomato">Tomato</option>
          <option value="Onion">Onion</option>
          <option value="Potato">Potato</option>
        </select>
        <select className="form-select rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500">
          <option value="15km">Within 15 km</option>
          <option value="50km">Within 50 km</option>
          <option value="state">Whole State</option>
        </select>
      </div>

      {loading ? (<div className="py-12 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div></div>) : (<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-900">7-Day Demand Forecast</h2>
                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded font-medium">Prototype AI Prediction</span>
              </CardHeader>
              <CardBody>
                <DemandChart data={demandData?.predictions || mockDemandSeries} isPrototype={false}/>
                <div className="mt-6 p-4 bg-purple-50 rounded-lg flex items-start">
                  <TrendingUp className="w-5 h-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0"/>
                  <div>
                    <h4 className="font-medium text-purple-900">Demand Trend: {demandData?.trend || 'Increasing'}</h4>
                    <p className="text-sm text-purple-700 mt-1">{demandData?.recommendation || 'Consider harvesting soon to meet peak weekend demand.'}</p>
                    <p className="text-xs text-purple-500 mt-2">Confidence Score: {demandData?.confidence || 85}%</p>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="text-lg font-bold text-gray-900">Smart Alerts</h2>
              </CardHeader>
              <CardBody className="space-y-4">
                <div className="flex items-start p-3 border-l-4 border-red-500 bg-red-50 rounded-r-md">
                  <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5"/>
                  <div>
                    <h4 className="font-medium text-red-900">Price Drop Warning</h4>
                    <p className="text-sm text-red-700">Incoming heavy supply of {selectedCrop} from neighboring districts detected. Prices may drop by 10-15% in the next 3 days.</p>
                  </div>
                </div>
                <div className="flex items-start p-3 border-l-4 border-green-500 bg-green-50 rounded-r-md">
                  <BellRing className="w-5 h-5 text-green-500 mr-3 mt-0.5"/>
                  <div>
                    <h4 className="font-medium text-green-900">Bulk Buyer Opportunity</h4>
                    <p className="text-sm text-green-700">A new restaurant chain is looking for 500 KG of Grade A {selectedCrop} weekly. Your profile matches their criteria.</p>
                    <Button variant="outline" size="sm" className="mt-2 text-green-700 border-green-200">View Requirement</Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-purple-200 bg-purple-50/50">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-bold text-gray-900">Price Intelligence</h2>
                  <BrainCircuit className="w-5 h-5 text-purple-500"/>
                </div>
              </CardHeader>
              <CardBody className="space-y-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Suggested Reference Price</p>
                  <p className="text-3xl font-bold text-gray-900">₹{priceData?.recommendedReference || 35} <span className="text-sm font-normal text-gray-500">/ KG</span></p>
                  <p className="text-sm text-gray-500 mt-1">Range: ₹{priceData?.suggestedMin || 32} - ₹{priceData?.suggestedMax || 38}</p>
                </div>
                
                <div className="space-y-3 pt-4 border-t border-purple-100">
                  <h3 className="text-sm font-semibold text-gray-900">Price Factors</h3>
                  {(priceData?.factors || [
                { name: 'Local Supply', impact: 'negative', value: 'High' },
                { name: 'Festival Demand', impact: 'positive', value: 'Upcoming' },
                { name: 'Weather', impact: 'neutral', value: 'Clear' }
            ]).map((factor, i) => (<div key={i} className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">{factor.name} ({factor.value})</span>
                      <span className={factor.impact === 'positive' ? 'text-green-600' : factor.impact === 'negative' ? 'text-red-600' : 'text-gray-500'}>
                        {factor.impact === 'positive' ? '↑' : factor.impact === 'negative' ? '↓' : '-'}
                      </span>
                    </div>))}
                </div>

                <div className="pt-4 text-center">
                  <span className="inline-block text-xs bg-white text-purple-600 px-3 py-1 rounded-full border border-purple-200 shadow-sm">
                    Prototype AI Prediction
                  </span>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="text-lg font-bold text-gray-900">Supply-Demand Gap</h2>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Current Market Demand</span>
                      <span className="font-medium text-gray-900">4,500 KG</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Available Supply</span>
                      <span className="font-medium text-gray-900">3,200 KG</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-amber-500 h-2 rounded-full" style={{ width: '71%' }}></div>
                    </div>
                  </div>
                  <div className="pt-2">
                    <p className="text-sm text-gray-600">Shortage of <span className="font-bold text-red-600">1,300 KG</span>. Excellent opportunity to list available stock.</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>)}
    </div>);
};
export default AIInsights;
