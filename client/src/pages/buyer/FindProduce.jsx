import React, { useState } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Search, MapPin, Filter, CheckCircle2, Scale, IndianRupee } from 'lucide-react';

export default function FindProduce() {
    const [searchQuery, setSearchQuery] = useState('');
    const [typeFilter, setTypeFilter] = useState('All');

    const ALL_MATCHES = [
        {
            id: 'S-001',
            name: 'Pune District FPO',
            type: 'FPO',
            crop: 'Tomato',
            matchScore: 92,
            price: 24,
            availableQty: 1500,
            unit: 'KG',
            distance: 12,
            location: 'Pune, Maharashtra',
            reasons: ['Product available', 'Quantity sufficient', 'Within buyer budget', 'Nearby', 'Required quality']
        },
        {
            id: 'S-002',
            name: 'Ramesh Patil',
            type: 'Farmer',
            crop: 'Tomato',
            matchScore: 85,
            price: 22,
            availableQty: 400,
            unit: 'KG',
            distance: 8,
            location: 'Nashik, Maharashtra',
            reasons: ['Product available', 'Within buyer budget', 'Nearby', 'Required quality'],
            missing: ['Partial quantity (400/500 KG)']
        },
        {
            id: 'S-003',
            name: 'Sahyadri Farmers FPO',
            type: 'FPO',
            crop: 'Onion',
            matchScore: 89,
            price: 28,
            availableQty: 5000,
            unit: 'KG',
            distance: 25,
            location: 'Nashik, Maharashtra',
            reasons: ['Product available', 'Quantity sufficient', 'Required quality']
        },
        {
            id: 'S-004',
            name: 'Sunil Shinde Vineyards',
            type: 'Farmer',
            crop: 'Grapes',
            matchScore: 95,
            price: 75,
            availableQty: 800,
            unit: 'KG',
            distance: 15,
            location: 'Niphad, Maharashtra',
            reasons: ['Export quality', 'Organic certified', 'Direct farmgate rate']
        }
    ];

    const filteredMatches = ALL_MATCHES.filter(match => {
        let matchSearch = true;
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase().trim();
            matchSearch = (
                match.name.toLowerCase().includes(q) ||
                match.crop.toLowerCase().includes(q) ||
                match.location.toLowerCase().includes(q) ||
                match.type.toLowerCase().includes(q)
            );
        }

        let matchType = true;
        if (typeFilter === 'FPO Only') matchType = match.type === 'FPO';
        if (typeFilter === 'Farmer Only') matchType = match.type === 'Farmer';

        return matchSearch && matchType;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Find Produce &amp; B2B Sellers</h1>
                    <p className="mt-1 text-sm text-gray-500">Discover bulk suppliers, farmers, and FPO aggregators near you.</p>
                </div>
            </div>

            {/* Search and Filters */}
            <Card className="shadow-sm">
                <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"/>
                            <Input 
                                value={searchQuery} 
                                onChange={(e) => setSearchQuery(e.target.value)} 
                                className="pl-10 text-sm font-medium" 
                                placeholder="Search by crop (Tomato, Onion, Grapes), farmer/FPO name, or location..."
                            />
                            {searchQuery && (
                                <button 
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 hover:text-gray-600 bg-gray-100 px-2 py-0.5 rounded"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                        <div className="flex gap-2">
                            <select 
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value)}
                                className="rounded-lg border-gray-300 py-2 pl-3 pr-8 text-sm font-semibold focus:ring-2 focus:ring-green-500 border bg-white cursor-pointer"
                            >
                                <option value="All">All Seller Types</option>
                                <option value="FPO Only">FPO Only 🏭</option>
                                <option value="Farmer Only">Farmer Only 👨‍🌾</option>
                            </select>
                            {(searchQuery || typeFilter !== 'All') && (
                                <Button 
                                    variant="outline" 
                                    onClick={() => { setSearchQuery(''); setTypeFilter('All'); }}
                                    className="text-xs font-bold"
                                >
                                    Reset
                                </Button>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Results */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-base font-bold text-gray-900">
                        {searchQuery ? `Matching Suppliers for "${searchQuery}" (${filteredMatches.length})` : `All Verified B2B Suppliers (${filteredMatches.length})`}
                    </h2>
                </div>
                
                {filteredMatches.length === 0 ? (
                    <Card className="p-8 text-center text-gray-500">
                        <p className="font-bold text-base">No suppliers found matching "{searchQuery}".</p>
                        <p className="text-xs mt-1">Try searching for "Tomato", "Onion", "Grapes", "Pune", or "Nashik"</p>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {filteredMatches.map((match) => (
                            <Card key={match.id} className="overflow-hidden hover:shadow-md transition-shadow">
                                <div className="flex flex-col md:flex-row">
                                    <div className="flex-1 p-6">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h3 className="text-xl font-bold text-gray-900">{match.name}</h3>
                                                    <Badge variant={match.type === 'FPO' ? 'primary' : 'secondary'}>{match.type}</Badge>
                                                    <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-0.5 rounded">
                                                        {match.crop}
                                                    </span>
                                                </div>
                                                <div className="flex items-center text-gray-500 text-sm mt-1 font-medium">
                                                    <MapPin className="h-4 w-4 mr-1 text-gray-400"/>
                                                    {match.location} ({match.distance} km away)
                                                </div>
                                            </div>
                                            
                                            <div className="text-right">
                                                <div className="inline-flex items-center justify-center rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                                                    {match.matchScore}% AI Match
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                                                    <div className="bg-green-600 h-1.5 rounded-full" style={{ width: `${match.matchScore}%` }}></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                                            <div>
                                                <p className="text-xs font-bold text-gray-500 uppercase flex items-center">
                                                    <Scale className="h-3.5 w-3.5 mr-1 text-green-600"/> Available Stock
                                                </p>
                                                <p className="mt-1 text-lg font-bold text-gray-900">{match.availableQty} {match.unit}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-gray-500 uppercase flex items-center">
                                                    <IndianRupee className="h-3.5 w-3.5 mr-1 text-green-600"/> Price Rate
                                                </p>
                                                <p className="mt-1 text-lg font-bold text-green-700">₹{match.price}/{match.unit}</p>
                                            </div>
                                        </div>

                                        <div className="mt-6">
                                            <h4 className="text-xs font-bold text-gray-700 uppercase mb-2">AI Matching Reasons</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {match.reasons.map((reason, i) => (
                                                    <span key={i} className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-bold text-green-700 ring-1 ring-inset ring-green-600/20">
                                                        <CheckCircle2 className="h-3.5 w-3.5 mr-1 text-green-600"/>
                                                        {reason}
                                                    </span>
                                                ))}
                                                {match.missing && match.missing.map((miss, i) => (
                                                    <span key={i} className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-bold text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                                                        {miss}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-gray-50 p-6 md:w-64 border-t md:border-t-0 md:border-l border-gray-200 flex flex-col justify-center gap-3">
                                        <Button className="w-full bg-green-600 hover:bg-green-700 font-bold">
                                            Request B2B Offer 🏢
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
