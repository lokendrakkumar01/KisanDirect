import React, { useState, useEffect } from 'react';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Plus, Edit2, Trash2, Eye } from 'lucide-react';
import { getListings, deleteListing } from '../../services/farmerService';
import { formatCurrency } from '../../utils/format';
export const MyListings = () => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    useEffect(() => {
        fetchListings();
    }, []);
    const fetchListings = async () => {
        try {
            setLoading(true);
            const res = await getListings();
            if (res.data) {
                setListings(res.data);
            }
        }
        catch (error) {
            console.error('Error fetching listings', error);
        }
        finally {
            setLoading(false);
        }
    };
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this listing?')) {
            try {
                await deleteListing(id);
                setListings(prev => prev.filter(l => l.id !== id));
            }
            catch (error) {
                console.error('Error deleting listing', error);
            }
        }
    };
    const filteredListings = listings.filter(l => filter === 'all' || l.status === filter);
    return (<div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Listings</h1>
          <p className="text-gray-500 mt-1">Manage your crop listings and inventory.</p>
        </div>
        <Button leftIcon={<Plus className="w-4 h-4"/>}>Add New Listing</Button>
      </div>

      <Card>
        <CardHeader className="flex justify-between items-center">
          <div className="flex space-x-2">
            <select className="form-select rounded-md border-gray-300 text-sm focus:ring-green-500 focus:border-green-500" value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="sold_out">Sold Out</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </CardHeader>
        
        {loading ? (<div className="p-8 text-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div></div>) : filteredListings.length === 0 ? (<div className="p-12 text-center text-gray-500">
            <p>No listings found.</p>
            <Button variant="outline" className="mt-4" onClick={() => { }}>Create your first listing</Button>
          </div>) : (<div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Available Qty</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quality</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredListings.map(listing => (<tr key={listing.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                          {listing.images && listing.images[0] && (<img src={listing.images[0]} alt="" className="h-full w-full object-cover"/>)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{listing.productName}</div>
                          <div className="text-sm text-gray-500 capitalize">{listing.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatCurrency(listing.price)}</div>
                      <div className="text-sm text-gray-500">per {listing.unit}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{listing.availableQuantity} / {listing.quantity} {listing.unit}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        Grade {listing.qualityGrade}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${listing.status === 'active' ? 'bg-green-100 text-green-800' :
                    listing.status === 'sold_out' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'}`}>
                        {listing.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button className="text-gray-400 hover:text-gray-600"><Eye className="w-4 h-4"/></button>
                        <button className="text-blue-400 hover:text-blue-600"><Edit2 className="w-4 h-4"/></button>
                        <button onClick={() => handleDelete(listing.id)} className="text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4"/></button>
                      </div>
                    </td>
                  </tr>))}
              </tbody>
            </table>
          </div>)}
      </Card>
    </div>);
};
export default MyListings;
