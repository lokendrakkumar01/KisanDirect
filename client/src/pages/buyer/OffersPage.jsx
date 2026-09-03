import React, { useState } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { MapPin, Clock, Check, X, MessageSquare } from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils/format';
export default function OffersPage() {
    const [filter, setFilter] = useState('Pending');
    const offers = [
        {
            id: 'OF-1001',
            reqId: 'REQ-001',
            product: 'Tomato',
            sellerName: 'Green Valley FPO',
            sellerType: 'FPO',
            price: 24,
            quantity: 500,
            unit: 'KG',
            distance: 12,
            estimatedDelivery: '2026-09-10',
            matchScore: 95,
            status: 'Pending',
            date: '2026-09-03'
        },
        {
            id: 'OF-1002',
            reqId: 'REQ-001',
            product: 'Tomato',
            sellerName: 'Ramesh Patel',
            sellerType: 'Farmer',
            price: 26,
            quantity: 500,
            unit: 'KG',
            distance: 8,
            estimatedDelivery: '2026-09-09',
            matchScore: 88,
            status: 'Pending',
            date: '2026-09-03'
        },
        {
            id: 'OF-0998',
            reqId: 'REQ-003',
            product: 'Onion',
            sellerName: 'Nashik Farmers Co-op',
            sellerType: 'FPO',
            price: 28,
            quantity: 2000,
            unit: 'KG',
            distance: 45,
            estimatedDelivery: '2026-09-05',
            matchScore: 98,
            status: 'Accepted',
            date: '2026-09-01'
        }
    ];
    const filteredOffers = offers.filter(o => o.status === filter);
    return (<div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Offers Received</h1>
          <p className="mt-1 text-sm text-gray-500">Review and manage offers from sellers for your requirements.</p>
        </div>
      </div>

      <div className="flex space-x-2 border-b border-gray-200">
        {['Pending', 'Accepted', 'Rejected'].map(status => (<button key={status} onClick={() => setFilter(status)} className={`px-4 py-2 border-b-2 text-sm font-medium ${filter === status
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
            {status}
          </button>))}
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredOffers.length === 0 ? (<Card>
            <CardContent className="flex flex-col items-center justify-center p-12 text-center">
              <div className="rounded-full bg-gray-100 p-3 mb-4">
                <Clock className="h-6 w-6 text-gray-400"/>
              </div>
              <h3 className="text-lg font-medium text-gray-900">No {filter.toLowerCase()} offers</h3>
              <p className="mt-1 text-gray-500">You don't have any offers in this status.</p>
            </CardContent>
          </Card>) : (filteredOffers.map((offer) => (<Card key={offer.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="flex-1 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm text-gray-500 font-medium">{offer.id}</span>
                        <span className="text-gray-300">&bull;</span>
                        <span className="text-sm text-gray-500">For {offer.reqId}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-gray-900">{offer.sellerName}</h3>
                        <Badge variant={offer.sellerType === 'FPO' ? 'primary' : 'secondary'}>{offer.sellerType}</Badge>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">{formatCurrency(offer.price)}<span className="text-sm font-normal text-gray-500">/{offer.unit}</span></div>
                      <div className="text-sm text-gray-500 mt-1">Total: {formatCurrency(offer.price * offer.quantity)}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Product</p>
                      <p className="font-medium">{offer.product}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Quantity</p>
                      <p className="font-medium">{offer.quantity} {offer.unit}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1 flex items-center gap-1"><MapPin className="h-3 w-3"/> Distance</p>
                      <p className="font-medium">{offer.distance} km</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1 flex items-center gap-1"><Clock className="h-3 w-3"/> Est. Delivery</p>
                      <p className="font-medium">{formatDate(offer.estimatedDelivery)}</p>
                    </div>
                  </div>
                </div>
                
                {offer.status === 'Pending' && (<div className="bg-gray-50 p-6 md:w-64 border-t md:border-t-0 md:border-l border-gray-200 flex flex-col justify-center gap-3">
                    <div className="mb-2 text-center">
                      <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-semibold">
                        {offer.matchScore}% AI Match
                      </span>
                    </div>
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      <Check className="mr-2 h-4 w-4"/> Accept Offer
                    </Button>
                    <Button variant="outline" className="w-full">
                      <MessageSquare className="mr-2 h-4 w-4"/> Negotiate
                    </Button>
                    <Button variant="outline" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200">
                      <X className="mr-2 h-4 w-4"/> Reject
                    </Button>
                  </div>)}
                
                {offer.status === 'Accepted' && (<div className="bg-green-50 p-6 md:w-64 border-t md:border-t-0 md:border-l border-green-200 flex flex-col items-center justify-center gap-3 text-center">
                    <Check className="h-10 w-10 text-green-600 mb-2"/>
                    <h4 className="font-semibold text-green-900">Offer Accepted</h4>
                    <p className="text-sm text-green-700 mb-2">Order #ORD-5092 created</p>
                    <Button variant="outline" size="sm" className="w-full bg-white">
                      View Order
                    </Button>
                  </div>)}
              </div>
            </Card>)))}
      </div>
    </div>);
}
