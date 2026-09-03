import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Plus, TrendingUp, Users, Save, Share, CheckCircle, Trash2 } from 'lucide-react';
import { formatCurrency } from '../../utils/format';

const initialAggregations = [
    { id: 'AGG-001', crop: 'Tomato (Grade A)', target: 2000, current: 1500, price: 25, unit: 'KG', members: 12, status: 'In Progress' },
    { id: 'AGG-002', crop: 'Onion (Grade A)', target: 5000, current: 5000, price: 18, unit: 'KG', members: 28, status: 'Listed' },
    { id: 'AGG-003', crop: 'Potato (Grade B)', target: 3000, current: 3000, price: 15, unit: 'KG', members: 15, status: 'Completed' }
];

export default function AggregationPage() {
    const [aggregations, setAggregations] = useState(initialAggregations);
    const [isCreating, setIsCreating] = useState(false);
    const [activeTab, setActiveTab] = useState('active');
    const [toastMsg, setToastMsg] = useState('');
    const [deletingAgg, setDeletingAgg] = useState(null);

    const [formCrop, setFormCrop] = useState('Tomato');
    const [formGrade, setFormGrade] = useState('Grade A (Premium)');
    const [formTarget, setFormTarget] = useState(2000);
    const [formPrice, setFormPrice] = useState(25);

    const handleCreateSubmit = (statusType = 'Listed') => {
        const newAgg = {
            id: `AGG-00${aggregations.length + 1}`,
            crop: `${formCrop} (${formGrade.split(' ')[0]})`,
            target: Number(formTarget) || 2000,
            current: Number(formTarget) || 2000,
            price: Number(formPrice) || 25,
            unit: 'KG',
            members: 8,
            status: statusType
        };

        setAggregations(prev => [newAgg, ...prev]);
        setToastMsg(`Aggregation "${newAgg.crop}" ${statusType === 'Listed' ? 'published to marketplace' : 'saved'} successfully!`);
        setIsCreating(false);
        setTimeout(() => setToastMsg(''), 3500);
    };

    const handlePublish = (aggId) => {
        setAggregations(prev => prev.map(a => a.id === aggId ? { ...a, status: 'Listed', current: a.target } : a));
        setToastMsg(`Aggregation ${aggId} published to Marketplace!`);
        setTimeout(() => setToastMsg(''), 3500);
    };

    const handleDeleteConfirm = () => {
        if (!deletingAgg) return;
        const targetId = deletingAgg.id;
        setAggregations(prev => prev.filter(a => a.id !== targetId));
        setToastMsg(`Aggregation ${targetId} deleted.`);
        setDeletingAgg(null);
        setTimeout(() => setToastMsg(''), 3500);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Crop Aggregations</h1>
                    <p className="mt-1 text-sm text-gray-500">Pool produce from multiple farmers to fulfill bulk buyer requirements.</p>
                </div>
                {!isCreating && (
                    <Button onClick={() => setIsCreating(true)}>
                        <Plus className="mr-2 h-4 w-4"/> New Aggregation
                    </Button>
                )}
            </div>

            {toastMsg && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center shadow-sm">
                    <CheckCircle className="w-5 h-5 mr-2" /> {toastMsg}
                </div>
            )}

            {isCreating ? (
                <Card>
                    <CardHeader>
                        <CardTitle>Create New FPO Aggregation</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Aggregation Details</h3>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Crop to Aggregate</label>
                                    <select 
                                        value={formCrop}
                                        onChange={(e) => setFormCrop(e.target.value)}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2 border bg-white"
                                    >
                                        <option value="Tomato">Tomato</option>
                                        <option value="Onion">Onion</option>
                                        <option value="Potato">Potato</option>
                                        <option value="Wheat">Wheat</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Quality Grade</label>
                                    <select 
                                        value={formGrade}
                                        onChange={(e) => setFormGrade(e.target.value)}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2 border bg-white"
                                    >
                                        <option value="Grade A (Premium)">Grade A (Premium)</option>
                                        <option value="Grade B (Standard)">Grade B (Standard)</option>
                                        <option value="Grade C (Processing)">Grade C (Processing)</option>
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Target Qty (KG)</label>
                                        <Input 
                                            type="number" 
                                            value={formTarget}
                                            onChange={(e) => setFormTarget(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Selling Price (₹/KG)</label>
                                        <Input 
                                            type="number" 
                                            value={formPrice}
                                            onChange={(e) => setFormPrice(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-gray-900 border-b pb-2 flex justify-between items-center">
                                    Member Contributions Pooled
                                </h3>
                                
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-2 text-sm">
                                    <div className="flex justify-between bg-white p-2.5 rounded border">
                                        <span>Ramesh Patel</span>
                                        <span className="font-bold text-gray-900">800 KG</span>
                                    </div>
                                    <div className="flex justify-between bg-white p-2.5 rounded border">
                                        <span>Suresh Kumar</span>
                                        <span className="font-bold text-gray-900">700 KG</span>
                                    </div>
                                    <div className="flex justify-between bg-white p-2.5 rounded border">
                                        <span>Anita Desai</span>
                                        <span className="font-bold text-gray-900">500 KG</span>
                                    </div>

                                    <div className="mt-4 pt-3 border-t border-gray-200 flex justify-between items-center font-bold text-base">
                                        <span>Total Aggregated:</span>
                                        <span className="text-green-700">{formTarget} / {formTarget} KG</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                            <Button variant="outline" onClick={() => setIsCreating(false)}>Cancel</Button>
                            <Button variant="outline" onClick={() => handleCreateSubmit('In Progress')}>
                                <Save className="h-4 w-4 mr-2"/> Save Draft
                            </Button>
                            <Button onClick={() => handleCreateSubmit('Listed')}>
                                <Share className="h-4 w-4 mr-2"/> Create & Publish Listing
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <>
                    <div className="flex space-x-2 border-b border-gray-200">
                        {['Active', 'Completed'].map(status => (
                            <button
                                key={status}
                                onClick={() => setActiveTab(status.toLowerCase())}
                                className={`px-4 py-2 border-b-2 text-sm font-medium transition-colors ${
                                    activeTab === status.toLowerCase()
                                        ? 'border-green-600 text-green-700 font-bold'
                                        : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {aggregations
                            .filter(a => activeTab === 'active' ? a.status !== 'Completed' : a.status === 'Completed')
                            .map(agg => (
                                <Card key={agg.id} className="overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                                    <CardHeader className="pb-2 border-b">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <CardTitle className="text-lg">{agg.crop}</CardTitle>
                                                <p className="text-xs text-gray-500 mt-1">{agg.id}</p>
                                            </div>
                                            <Badge variant={
                                                agg.status === 'Listed' ? 'success' :
                                                agg.status === 'Completed' ? 'secondary' : 'primary'
                                            }>
                                                {agg.status}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-4 flex-grow">
                                        <div className="mb-4">
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="font-medium text-gray-700">Aggregation Progress</span>
                                                <span className="text-gray-600 font-bold">{agg.current} / {agg.target} {agg.unit}</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                <div 
                                                    className={`h-2.5 rounded-full ${agg.current >= agg.target ? 'bg-green-600' : 'bg-green-500'}`} 
                                                    style={{ width: `${Math.min((agg.current / agg.target) * 100, 100)}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                        
                                        <div className="grid grid-cols-2 gap-4 mt-4 bg-gray-50 p-3 rounded-lg">
                                            <div>
                                                <p className="text-xs text-gray-500 flex items-center"><TrendingUp className="h-3 w-3 mr-1"/> Price</p>
                                                <p className="font-semibold text-gray-900 mt-1">{formatCurrency(agg.price)}/{agg.unit}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 flex items-center"><Users className="h-3 w-3 mr-1"/> Farmers</p>
                                                <p className="font-semibold text-gray-900 mt-1">{agg.members} Members</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="bg-gray-50 border-t flex gap-2">
                                        {agg.status === 'In Progress' && (
                                            <Button className="flex-1 text-sm h-9" onClick={() => handlePublish(agg.id)}>
                                                Publish
                                            </Button>
                                        )}
                                        <Button 
                                            variant="outline" 
                                            className="text-red-600 hover:bg-red-50 text-sm h-9 p-2" 
                                            onClick={() => setDeletingAgg(agg)}
                                            title="Delete Aggregation"
                                        >
                                            <Trash2 className="h-4 w-4"/>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                    </div>
                </>
            )}

            {/* Delete Modal */}
            {deletingAgg && (
                <Modal isOpen={!!deletingAgg} onClose={() => setDeletingAgg(null)} title="Confirm Delete Aggregation">
                    <div className="space-y-4 py-2">
                        <p className="text-sm text-gray-700">
                            Are you sure you want to delete aggregation <strong className="text-gray-900">{deletingAgg.crop}</strong> ({deletingAgg.id})?
                        </p>
                        <div className="flex justify-end gap-3 pt-4 border-t">
                            <Button variant="outline" onClick={() => setDeletingAgg(null)}>Cancel</Button>
                            <Button variant="danger" onClick={handleDeleteConfirm}>Delete Aggregation</Button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export { AggregationPage };
