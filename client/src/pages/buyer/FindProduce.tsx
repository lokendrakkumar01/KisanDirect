import React, { useState } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Search, MapPin, Filter, CheckCircle2, ChevronRight, Scale, IndianRupee } from 'lucide-react';

export default function FindProduce() {
  const [searchQuery, setSearchQuery] = useState('Tomato');
  
  const matches = [
    {
      id: 'S-001',
      name: 'Pune District FPO',
      type: 'FPO',
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
      name: 'Ramesh Patel',
      type: 'Farmer',
      matchScore: 85,
      price: 22,
      availableQty: 400,
      unit: 'KG',
      distance: 8,
      location: 'Khed, Maharashtra',
      reasons: ['Product available', 'Within buyer budget', 'Nearby', 'Required quality'],
      missing: ['Partial quantity (400/500 KG)']
    },
    {
      id: 'S-003',
      name: 'Sahyadri Farms',
      type: 'FPO',
      matchScore: 78,
      price: 28,
      availableQty: 5000,
      unit: 'KG',
      distance: 45,
      location: 'Nashik, Maharashtra',
      reasons: ['Product available', 'Quantity sufficient', 'Required quality'],
      missing: ['Price slightly high', 'Further away']
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Find Produce</h1>
          <p className="mt-1 text-sm text-gray-500">Discover bulk suppliers and aggregators near you.</p>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  placeholder="Search by crop, FPO name, or location..."
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select className="rounded-md border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 border">
                <option>All Types</option>
                <option>FPO Only</option>
                <option>Farmer Only</option>
              </select>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" /> Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium text-gray-900">
          Top Matches for "{searchQuery}"
        </h2>
        
        <div className="grid grid-cols-1 gap-6">
          {matches.map((match) => (
            <Card key={match.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row">
                <div className="flex-1 p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-semibold text-gray-900">{match.name}</h3>
                        <Badge variant={match.type === 'FPO' ? 'primary' : 'secondary'}>{match.type}</Badge>
                      </div>
                      <div className="flex items-center text-gray-500 text-sm mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {match.location} ({match.distance} km away)
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="inline-flex items-center justify-center rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
                        {match.matchScore}% Match
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                        <div className="bg-green-600 h-1.5 rounded-full" style={{ width: `${match.matchScore}%` }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500 flex items-center">
                        <Scale className="h-4 w-4 mr-1" /> Available
                      </p>
                      <p className="mt-1 text-lg font-semibold text-gray-900">{match.availableQty} {match.unit}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 flex items-center">
                        <IndianRupee className="h-4 w-4 mr-1" /> Price
                      </p>
                      <p className="mt-1 text-lg font-semibold text-gray-900">₹{match.price}/{match.unit}</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Match Reasons (Prototype AI)</h4>
                    <div className="flex flex-wrap gap-2">
                      {match.reasons.map((reason, i) => (
                        <span key={i} className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          {reason}
                        </span>
                      ))}
                      {match.missing && match.missing.map((miss, i) => (
                        <span key={i} className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                          {miss}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 md:w-64 border-t md:border-t-0 md:border-l border-gray-200 flex flex-col justify-center gap-3">
                  <Button className="w-full">
                    Request Offer
                  </Button>
                  <Button variant="outline" className="w-full">
                    View Profile
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
