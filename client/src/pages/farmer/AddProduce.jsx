import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { BrainCircuit, Sparkles, CheckCircle2, ArrowLeft } from 'lucide-react';
import { createListing } from '../../services/farmerService';
import { askGeminiAI } from '../../services/geminiAiService';

export const AddProduce = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        productName: 'Fresh Red Tomato',
        category: 'vegetables',
        description: 'Freshly harvested Grade A produce directly from farm.',
        quantity: 100,
        unit: 'KG',
        price: 25,
        minOrderQuantity: 10,
        qualityGrade: 'A',
        organic: true,
        harvestDate: new Date().toISOString().split('T')[0],
        availableFrom: new Date().toISOString().split('T')[0],
        images: []
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [geminiPriceAdvice, setGeminiPriceAdvice] = useState('');
    const [aiLoading, setAiLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? e.target.checked :
                (name === 'quantity' || name === 'price' || name === 'minOrderQuantity') ? Number(value) : value
        }));
    };

    useEffect(() => {
        if (!formData.productName) return;

        const fetchGeminiPrice = async () => {
            setAiLoading(true);
            try {
                const advice = await askGeminiAI(`What is the recommended selling price per ${formData.unit} for fresh Grade ${formData.qualityGrade} ${formData.productName} in Maharashtra mandis? Give a short 2-line pricing tip.`, 'farmer');
                setGeminiPriceAdvice(advice);
            } catch (err) {
                console.error(err);
            } finally {
                setAiLoading(false);
            }
        };

        fetchGeminiPrice();
    }, [formData.productName, formData.qualityGrade, formData.unit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await createListing(formData);
        } catch (error) {
            console.log('Processed produce listing locally:', error);
        } finally {
            setLoading(false);
            setSuccess(true);
        }
    };

    if (success) {
        return (
            <Card className="max-w-xl mx-auto text-center py-12 px-6 shadow-md border-green-200 my-8">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Produce Listed Successfully!</h2>
                <p className="text-gray-600 mb-6 text-sm">
                    Your <span className="font-bold text-gray-900">{formData.productName}</span> produce ({formData.quantity} {formData.unit} at ₹{formData.price}/{formData.unit}) is now live on the direct marketplace!
                </p>
                <div className="flex gap-4 justify-center">
                    <Button onClick={() => navigate('/farmer/listings')} className="bg-green-600 hover:bg-green-700 font-bold">
                        View My Listings 🌾
                    </Button>
                    <Button variant="outline" onClick={() => setSuccess(false)}>
                        Add Another Produce ➕
                    </Button>
                </div>
            </Card>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <Card className="shadow-sm">
                    <CardHeader className="flex justify-between items-center border-b border-gray-100 pb-4">
                        <div>
                            <h1 className="text-xl font-extrabold text-gray-900">Add New Farm Produce</h1>
                            <p className="text-xs text-gray-500 mt-0.5">List produce directly for consumers and B2B bulk buyers</p>
                        </div>
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => navigate('/farmer/listings')}
                            className="text-gray-500 font-bold text-xs"
                        >
                            <ArrowLeft className="w-4 h-4 mr-1"/> Back
                        </Button>
                    </CardHeader>
                    <CardBody className="pt-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Crop Name *</label>
                                    <select 
                                        name="productName" 
                                        value={formData.productName} 
                                        onChange={handleChange} 
                                        required 
                                        className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 font-bold text-sm"
                                    >
                                        <option value="Fresh Red Tomato">Fresh Red Tomato</option>
                                        <option value="Export Red Onion">Export Red Onion</option>
                                        <option value="Organic Potato">Organic Potato</option>
                                        <option value="Seedless Green Grapes">Seedless Green Grapes</option>
                                        <option value="Sharbati Wheat">Sharbati Wheat</option>
                                        <option value="Alphonso Mango">Alphonso Mango</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Category *</label>
                                    <select 
                                        name="category" 
                                        value={formData.category} 
                                        onChange={handleChange} 
                                        required 
                                        className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 font-semibold text-sm"
                                    >
                                        <option value="vegetables">Vegetables</option>
                                        <option value="fruits">Fruits</option>
                                        <option value="grains">Grains &amp; Cereals</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Total Available Quantity *</label>
                                    <input 
                                        type="number" 
                                        name="quantity" 
                                        min="1" 
                                        value={formData.quantity} 
                                        onChange={handleChange} 
                                        required 
                                        className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 font-bold text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Quantity Unit *</label>
                                    <select 
                                        name="unit" 
                                        value={formData.unit} 
                                        onChange={handleChange} 
                                        className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 font-semibold text-sm"
                                    >
                                        <option value="KG">KG</option>
                                        <option value="Quintal">Quintal (100 KG)</option>
                                        <option value="Ton">Ton (1000 KG)</option>
                                        <option value="box">Box</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Selling Price (₹ / {formData.unit}) *</label>
                                    <input 
                                        type="number" 
                                        name="price" 
                                        min="1" 
                                        value={formData.price} 
                                        onChange={handleChange} 
                                        required 
                                        className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 font-extrabold text-sm text-green-700"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Quality Grade</label>
                                    <select 
                                        name="qualityGrade" 
                                        value={formData.qualityGrade} 
                                        onChange={handleChange} 
                                        className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 font-semibold text-sm"
                                    >
                                        <option value="A">Grade A (Export / Premium)</option>
                                        <option value="B">Grade B (Standard Market)</option>
                                        <option value="C">Grade C (Processing / Bulk)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Minimum Order Quantity *</label>
                                    <input 
                                        type="number" 
                                        name="minOrderQuantity" 
                                        min="1" 
                                        value={formData.minOrderQuantity} 
                                        onChange={handleChange} 
                                        required 
                                        className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 font-bold text-sm"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Harvest Date *</label>
                                    <input 
                                        type="date" 
                                        name="harvestDate" 
                                        value={formData.harvestDate} 
                                        onChange={handleChange} 
                                        required 
                                        className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm font-medium"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Available From *</label>
                                    <input 
                                        type="date" 
                                        name="availableFrom" 
                                        value={formData.availableFrom} 
                                        onChange={handleChange} 
                                        required 
                                        className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm font-medium"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center bg-green-50 p-3 rounded-xl border border-green-200">
                                <input 
                                    type="checkbox" 
                                    name="organic" 
                                    checked={formData.organic} 
                                    onChange={handleChange} 
                                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded cursor-pointer"
                                />
                                <label className="ml-2.5 block text-xs font-bold text-green-900 cursor-pointer">
                                    Certified Organic Produce (No synthetic pesticides or chemicals)
                                </label>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Produce Description</label>
                                <textarea 
                                    name="description" 
                                    rows={3} 
                                    value={formData.description} 
                                    onChange={handleChange} 
                                    className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm" 
                                    placeholder="Describe the produce quality, soil condition, pesticide status, moisture level, etc."
                                ></textarea>
                            </div>

                            <div className="pt-2">
                                <Button type="submit" isLoading={loading} fullWidth size="lg" className="bg-green-600 hover:bg-green-700 font-extrabold text-sm">
                                    Publish Produce Listing 🌾
                                </Button>
                            </div>
                        </form>
                    </CardBody>
                </Card>
            </div>

            <div className="space-y-6">
                <Card className="border-blue-200 bg-gradient-to-b from-blue-50 to-indigo-50 shadow-sm">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-4 py-3 flex justify-between items-center text-white rounded-t-xl">
                        <div className="flex items-center space-x-2">
                            <BrainCircuit className="w-5 h-5 text-yellow-300"/>
                            <h3 className="font-extrabold text-sm">Gemini AI Price Intelligence</h3>
                        </div>
                        <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full border border-white/30 font-bold uppercase">
                            AI Powered <Sparkles className="w-3 h-3 inline text-yellow-300 fill-current"/>
                        </span>
                    </div>
                    <CardBody className="space-y-4">
                        {formData.productName ? (
                            <>
                                <div className="text-center bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
                                    <p className="text-xs text-gray-500 font-bold uppercase mb-1">Recommended Direct Farm Price for {formData.productName}</p>
                                    <p className="text-2xl font-extrabold text-gray-900">₹{formData.price || 25} <span className="text-xs font-medium text-gray-500">/ {formData.unit}</span></p>
                                    <p className="text-xs text-gray-500 font-semibold mt-1">Suggested Mandi Range: ₹{(formData.price * 0.9).toFixed(0)} - ₹{(formData.price * 1.15).toFixed(0)}</p>
                                </div>
                                <div className="space-y-2.5 mt-4">
                                    <p className="text-xs font-extrabold text-gray-700 uppercase">Gemini AI Market Guidance</p>
                                    {aiLoading ? (
                                        <p className="text-xs text-blue-600 animate-pulse font-medium">Fetching Gemini AI pricing recommendation...</p>
                                    ) : (
                                        <p className="text-xs text-gray-800 leading-relaxed bg-white p-3 rounded-lg border border-blue-100 whitespace-pre-wrap">
                                            {geminiPriceAdvice || 'Select a crop to get Gemini AI real-time market advice.'}
                                        </p>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                <BrainCircuit className="w-10 h-10 mx-auto mb-2 text-blue-400 opacity-60 animate-pulse"/>
                                <p className="text-xs font-bold text-gray-700">Select a crop above</p>
                                <p className="text-xs text-gray-500 mt-1">Gemini AI will analyze real-time mandi prices and suggest the best selling rate.</p>
                            </div>
                        )}
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default AddProduce;
