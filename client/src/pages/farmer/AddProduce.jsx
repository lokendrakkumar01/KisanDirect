import React, { useState } from 'react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { BrainCircuit, Info } from 'lucide-react';
import { createListing } from '../../services/farmerService';
export const AddProduce = () => {
    const [formData, setFormData] = useState({
        productName: '',
        category: 'vegetables',
        description: '',
        quantity: 0,
        unit: 'KG',
        price: 0,
        minOrderQuantity: 1,
        qualityGrade: 'A',
        organic: false,
        harvestDate: '',
        availableFrom: '',
        images: []
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? e.target.checked :
                (name === 'quantity' || name === 'price' || name === 'minOrderQuantity') ? Number(value) : value
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createListing(formData);
            setSuccess(true);
        }
        catch (error) {
            console.error('Failed to create listing', error);
        }
        finally {
            setLoading(false);
        }
    };
    if (success) {
        return (<Card className="max-w-2xl mx-auto text-center py-12">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Success!</h2>
        <p className="text-gray-600 mb-6">Your produce has been listed successfully.</p>
        <Button onClick={() => window.history.back()}>Go to My Listings</Button>
      </Card>);
    }
    return (<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <h1 className="text-xl font-bold text-gray-900">Add New Produce</h1>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Product Name</label>
                  <select name="productName" value={formData.productName} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500">
                    <option value="">Select Crop</option>
                    <option value="Tomato">Tomato</option>
                    <option value="Onion">Onion</option>
                    <option value="Potato">Potato</option>
                    <option value="Wheat">Wheat</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select name="category" value={formData.category} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500">
                    <option value="vegetables">Vegetables</option>
                    <option value="fruits">Fruits</option>
                    <option value="grains">Grains</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Quantity</label>
                  <input type="number" name="quantity" min="1" value={formData.quantity} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Unit</label>
                  <select name="unit" value={formData.unit} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500">
                    <option value="KG">KG</option>
                    <option value="Quintal">Quintal</option>
                    <option value="Ton">Ton</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price (₹ per unit)</label>
                  <input type="number" name="price" min="1" value={formData.price} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"/>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Quality Grade</label>
                  <select name="qualityGrade" value={formData.qualityGrade} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500">
                    <option value="A">Grade A (Premium)</option>
                    <option value="B">Grade B (Standard)</option>
                    <option value="C">Grade C (Processing)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Min Order Quantity</label>
                  <input type="number" name="minOrderQuantity" min="1" value={formData.minOrderQuantity} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"/>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Harvest Date</label>
                  <input type="date" name="harvestDate" value={formData.harvestDate} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Available From</label>
                  <input type="date" name="availableFrom" value={formData.availableFrom} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"/>
                </div>
              </div>

              <div className="flex items-center">
                <input type="checkbox" name="organic" checked={formData.organic} onChange={handleChange} className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"/>
                <label className="ml-2 block text-sm text-gray-900">This is certified organic produce</label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea name="description" rows={3} value={formData.description} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" placeholder="Describe the produce quality, specific variety, etc."></textarea>
              </div>

              <div className="pt-4">
                <Button type="submit" isLoading={loading} fullWidth>List Produce</Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="border-blue-200 bg-blue-50">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 flex justify-between items-center text-white rounded-t-xl">
            <div className="flex items-center space-x-2">
              <BrainCircuit className="w-4 h-4"/>
              <h3 className="font-semibold text-sm">AI Suggested Price</h3>
            </div>
            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full border border-white/30">
              Prototype AI Prediction
            </span>
          </div>
          <CardBody className="space-y-4">
            {formData.productName ? (<>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Recommended Range for {formData.productName}</p>
                  <p className="text-2xl font-bold text-gray-900">₹32 - ₹38 <span className="text-sm font-normal text-gray-500">/ {formData.unit}</span></p>
                </div>
                <div className="space-y-2 mt-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase">Factors</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 flex items-center"><Info className="w-3 h-3 mr-1 text-gray-400"/> Historical Trend</span>
                    <span className="text-green-600">Positive (+5%)</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 flex items-center"><Info className="w-3 h-3 mr-1 text-gray-400"/> Current Demand</span>
                    <span className="text-green-600">High</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 flex items-center"><Info className="w-3 h-3 mr-1 text-gray-400"/> Local Supply</span>
                    <span className="text-amber-600">Moderate</span>
                  </div>
                </div>
              </>) : (<div className="text-center py-6 text-gray-500">
                <BrainCircuit className="w-8 h-8 mx-auto mb-2 text-gray-400 opacity-50"/>
                <p className="text-sm">Select a product to see AI price suggestions based on real-time market data.</p>
              </div>)}
          </CardBody>
        </Card>
      </div>
    </div>);
};
export default AddProduce;
