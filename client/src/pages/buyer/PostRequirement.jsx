import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Bot, MapPin, Calendar, Scale, IndianRupee } from 'lucide-react';
export default function PostRequirement() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [matched, setMatched] = useState(false);
    const [formData, setFormData] = useState({
        product: 'Tomato',
        quantity: '500',
        unit: 'KG',
        maxBudget: '27',
        requiredDate: '2026-09-11',
        deliveryLocation: 'Pune, Maharashtra',
        qualityGrade: 'Grade A',
        notes: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call and AI matching engine
        setTimeout(() => {
            setLoading(false);
            setMatched(true);
            setTimeout(() => {
                navigate('/buyer/offers');
            }, 2000);
        }, 1500);
    };
    if (matched) {
        return (<div className="flex flex-col items-center justify-center h-[60vh] space-y-6">
        <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center animate-pulse">
          <Bot className="h-12 w-12 text-green-600"/>
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">Requirement Posted Successfully!</h2>
          <p className="text-gray-500">Prototype AI Prediction: Finding the best matches for your requirement...</p>
          <div className="flex items-center justify-center mt-4">
            <span className="flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-500"></span>
            </span>
            <span className="ml-2 text-sm text-primary-600 font-medium">Matching sellers... Redirecting</span>
          </div>
        </div>
      </div>);
    }
    return (<div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Post Bulk Requirement</h1>
        <p className="mt-1 text-sm text-gray-500">Broadcast your requirements to farmers and FPOs directly.</p>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Product */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Product</label>
                <select name="product" value={formData.product} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border" required>
                  <option value="Tomato">Tomato</option>
                  <option value="Potato">Potato</option>
                  <option value="Onion">Onion</option>
                  <option value="Wheat">Wheat</option>
                  <option value="Rice">Rice</option>
                </select>
              </div>

              {/* Quality */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Quality Requirement</label>
                <select name="qualityGrade" value={formData.qualityGrade} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border">
                  <option value="Grade A">Grade A (Premium)</option>
                  <option value="Grade B">Grade B (Standard)</option>
                  <option value="Grade C">Grade C (Processing)</option>
                  <option value="Any">Any Quality</option>
                </select>
              </div>

              {/* Quantity */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Required Quantity</label>
                <div className="flex mt-1 rounded-md shadow-sm">
                  <div className="relative flex-grow focus-within:z-10">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Scale className="h-4 w-4 text-gray-400"/>
                    </div>
                    <input type="number" name="quantity" min="1" value={formData.quantity} onChange={handleChange} className="block w-full rounded-none rounded-l-md border-gray-300 pl-10 focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border" placeholder="e.g. 500" required/>
                  </div>
                  <select name="unit" value={formData.unit} onChange={handleChange} className="relative -ml-px block w-24 rounded-none rounded-r-md border-gray-300 bg-gray-50 focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border">
                    <option value="KG">KG</option>
                    <option value="Quintal">Quintal</option>
                    <option value="Tonne">Tonne</option>
                  </select>
                </div>
              </div>

              {/* Budget */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Maximum Budget (per unit)</label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <IndianRupee className="h-4 w-4 text-gray-400"/>
                  </div>
                  <input type="number" name="maxBudget" min="1" value={formData.maxBudget} onChange={handleChange} className="block w-full rounded-md border-gray-300 pl-10 focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border" placeholder="e.g. 27" required/>
                </div>
              </div>

              {/* Required Date */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Required By Date</label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Calendar className="h-4 w-4 text-gray-400"/>
                  </div>
                  <input type="date" name="requiredDate" value={formData.requiredDate} onChange={handleChange} className="block w-full rounded-md border-gray-300 pl-10 focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border" required/>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Delivery Location</label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <MapPin className="h-4 w-4 text-gray-400"/>
                  </div>
                  <input type="text" name="deliveryLocation" value={formData.deliveryLocation} onChange={handleChange} className="block w-full rounded-md border-gray-300 pl-10 focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border" placeholder="City, State" required/>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-1 mt-6">
              <label className="block text-sm font-medium text-gray-700">Additional Notes</label>
              <textarea name="notes" rows={3} value={formData.notes} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border" placeholder="Any specific packaging or logistics requirements..."/>
            </div>
            
            <div className="bg-blue-50 border border-blue-100 rounded-md p-4 mt-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Bot className="h-5 w-5 text-blue-400"/>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">Smart Matching Enabled</h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>Once posted, our AI will automatically notify the best matching FPOs and Farmers based on your location, budget, and required volume.</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 flex justify-end space-x-3 px-6 py-4">
            <Button variant="outline" type="button" onClick={() => navigate('/buyer/dashboard')}>Cancel</Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Posting...' : 'Post Requirement'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>);
}
