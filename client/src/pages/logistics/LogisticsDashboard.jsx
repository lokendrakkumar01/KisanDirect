import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Truck, Map, Navigation, Clock, Package, CheckCircle, AlertTriangle } from 'lucide-react';
import { AnalyticsChart } from '../../components/charts/AnalyticsChart';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

export default function LogisticsDashboard() {
    const { c } = useLanguage();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => setLoading(false), 500);
    }, []);
    if (loading) {
        return <div className="p-8 text-center text-gray-500">{c('Loading dashboard...', 'डैशबोर्ड लोड हो रहा है...', 'डॅशबोर्ड लोड होत आहे...')}</div>;
    }
    return (<div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">{c('Logistics Dashboard', 'परिवहन डैशबोर्ड', 'वाहतूक डॅशबोर्ड')}</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Map className="w-4 h-4"/> {c('View Map', 'नक्शा देखें', 'नकाशा पहा')}
          </Button>
          <Link to="/logistics/optimize">
            <Button className="flex items-center gap-2">
              <Navigation className="w-4 h-4"/> {c('Optimize Routes', 'रूट अनुकूलित करें', 'मार्ग सुलभ करा')}
            </Button>
          </Link>
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-md flex items-start gap-3">
        <AlertTriangle className="text-amber-500 w-5 h-5 mt-0.5"/>
        <div>
          <h3 className="text-sm font-medium text-amber-800">{c('Route Consolidation Opportunity', 'रूट एकीकरण का अवसर', 'मार्ग एकत्रीकरणाची संधी')}</h3>
          <p className="text-sm text-amber-700 mt-1">{c('Two deliveries in Nashik region can be consolidated to save 45 km.', 'नासिक क्षेत्र में दो डिलीवरी को 45 किमी बचाने के लिए एकीकृत किया जा सकता है।', 'नाशिक भागातील दोन डिलिव्हरी ४५ किमी वाचवण्यासाठी एकत्र करता येतील.')} <Link to="/logistics/optimize" className="underline font-medium hover:text-amber-900">{c('View optimization', 'अनुकूलन देखें', 'अनुकूलन पहा')}</Link></p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-full mb-2">
              <Package className="w-6 h-6"/>
            </div>
            <p className="text-sm text-gray-500 font-medium">{c('Total Deliveries', 'कुल डिलीवरी', 'एकूण डिलिव्हरी')}</p>
            <p className="text-2xl font-bold text-gray-800">142</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <div className="p-3 bg-yellow-100 text-yellow-600 rounded-full mb-2">
              <Truck className="w-6 h-6"/>
            </div>
            <p className="text-sm text-gray-500 font-medium">{c('In Transit', 'रास्ते में', 'प्रवासात')}</p>
            <p className="text-2xl font-bold text-gray-800">38</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <div className="p-3 bg-green-100 text-green-600 rounded-full mb-2">
              <CheckCircle className="w-6 h-6"/>
            </div>
            <p className="text-sm text-gray-500 font-medium">{c('Completed', 'पूर्ण हुई', 'पूर्ण झाले')}</p>
            <p className="text-2xl font-bold text-gray-800">84</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <div className="p-3 bg-orange-100 text-orange-600 rounded-full mb-2">
              <Clock className="w-6 h-6"/>
            </div>
            <p className="text-sm text-gray-500 font-medium">{c('Pending Pickup', 'पेंडिंग पिकअप', 'पेंडिंग पिकअप')}</p>
            <p className="text-2xl font-bold text-gray-800">20</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-full mb-2">
              <Truck className="w-6 h-6"/>
            </div>
            <p className="text-sm text-gray-500 font-medium">{c('Available Vehicles', 'उपलब्ध वाहन', 'उपलब्ध वाहने')}</p>
            <p className="text-2xl font-bold text-gray-800">12</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <div className="p-3 bg-teal-100 text-teal-600 rounded-full mb-2">
              <Navigation className="w-6 h-6"/>
            </div>
            <p className="text-sm text-gray-500 font-medium">{c('Active Drivers', 'सक्रिय चालक', 'सक्रिय ड्रायव्हर्स')}</p>
            <p className="text-2xl font-bold text-gray-800">45</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{c('Delivery Status Distribution', 'डिलीवरी स्थिति विवरण', 'डिलिव्हरी स्थिती वितरण')}</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <AnalyticsChart type="pie" data={[
            { name: c('Completed', 'पूर्ण हुई', 'पूर्ण झाले'), value: 84 },
            { name: c('In Transit', 'रास्ते में', 'प्रवासात'), value: 38 },
            { name: c('Pending', 'पेंडिंग', 'पेंडिंग'), value: 20 }
        ]}/>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{c('Recent Route Optimizations', 'हाल के मार्ग अनुकूलन', 'अलीकडील मार्ग अनुकूलन')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (<div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">Nashik → Pune Hub</p>
                    <p className="text-sm text-gray-500">{c('Saved: 42km • Cost reduced: ₹850', 'बचत: 42किमी • लागत घटी: ₹850', 'बचत: 42किमी • खर्च कमी: ₹850')}</p>
                  </div>
                  <Button variant="outline" size="sm">{c('View', 'देखें', 'पहा')}</Button>
                </div>))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>);
}

