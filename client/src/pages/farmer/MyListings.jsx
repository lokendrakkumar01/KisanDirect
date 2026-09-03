import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Plus, Edit2, Trash2, Eye, CheckCircle } from 'lucide-react';
import { getListings, deleteListing } from '../../services/farmerService';
import { formatCurrency } from '../../utils/format';

export const MyListings = () => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [deletingListing, setDeletingListing] = useState(null);
    const [toastMsg, setToastMsg] = useState('');
    const navigate = useNavigate();

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
        } catch (error) {
            console.error('Error fetching listings', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteConfirm = async () => {
        if (!deletingListing) return;
        const targetId = deletingListing.id;
        const productName = deletingListing.productName || 'Listing';
        
        try {
            await deleteListing(targetId);
            setListings(prev => prev.filter(l => l.id !== targetId));
            setToastMsg(`Listing "${productName}" deleted successfully!`);
            setTimeout(() => setToastMsg(''), 3500);
        } catch (error) {
            console.error('Error deleting listing', error);
            // Fallback UI delete
            setListings(prev => prev.filter(l => l.id !== targetId));
            setToastMsg(`Listing "${productName}" removed from your list.`);
            setTimeout(() => setToastMsg(''), 3500);
        } finally {
            setDeletingListing(null);
        }
    };

    const filteredListings = listings.filter(l => filter === 'all' || l.status === filter);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">My Produce Listings</h1>
                    <p className="text-gray-500 mt-1">Manage your active farm produce listings and inventory.</p>
                </div>
                <Button 
                    leftIcon={<Plus className="w-4 h-4"/>} 
                    onClick={() => navigate('/farmer/listings/new')}
                >
                    Add New Listing
                </Button>
            </div>

            {toastMsg && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center shadow-sm">
                    <CheckCircle className="w-5 h-5 mr-2" /> {toastMsg}
                </div>
            )}

            <Card>
                <CardHeader className="flex justify-between items-center">
                    <div className="flex space-x-2">
                        <select 
                            className="form-select rounded-md border-gray-300 text-sm focus:ring-green-500 focus:border-green-500 p-2 border" 
                            value={filter} 
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="all">All Statuses</option>
                            <option value="active">Active</option>
                            <option value="sold_out">Sold Out</option>
                            <option value="draft">Draft</option>
                        </select>
                    </div>
                </CardHeader>
                
                {loading ? (
                    <div className="p-8 text-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div></div>
                ) : filteredListings.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">
                        <p className="mb-2">No produce listings found.</p>
                        <Button variant="outline" className="mt-4" onClick={() => navigate('/farmer/listings/new')}>Create your first listing</Button>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
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
                                {filteredListings.map(listing => (
                                    <tr key={listing.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 flex-shrink-0 bg-green-50 rounded-md overflow-hidden flex items-center justify-center font-bold text-green-700">
                                                    {listing.productName ? listing.productName.charAt(0) : 'P'}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{listing.productName}</div>
                                                    <div className="text-sm text-gray-500 capitalize">{listing.category}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-bold text-green-700">{formatCurrency(listing.price)}</div>
                                            <div className="text-sm text-gray-500">per {listing.unit || 'KG'}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{listing.availableQuantity || listing.quantity} / {listing.quantity} {listing.unit || 'KG'}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                Grade {listing.qualityGrade || 'A'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                listing.status === 'active' ? 'bg-green-100 text-green-800' :
                                                listing.status === 'sold_out' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                                            }`}>
                                                {listing.status ? listing.status.replace('_', ' ') : 'Active'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end space-x-2">
                                                <button 
                                                    onClick={() => navigate(`/marketplace/${listing.id}`)}
                                                    className="p-1.5 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-100"
                                                    title="View Product Page"
                                                >
                                                    <Eye className="w-4 h-4"/>
                                                </button>
                                                <button 
                                                    onClick={() => setDeletingListing(listing)}
                                                    className="p-1.5 text-red-500 hover:text-red-700 rounded hover:bg-red-50"
                                                    title="Delete Listing"
                                                >
                                                    <Trash2 className="w-4 h-4"/>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Card>

            {/* Delete Confirmation Modal */}
            {deletingListing && (
                <Modal
                    isOpen={!!deletingListing}
                    onClose={() => setDeletingListing(null)}
                    title="Confirm Delete Produce Listing"
                >
                    <div className="space-y-4 py-2">
                        <p className="text-sm text-gray-700">
                            Are you sure you want to delete listing <strong className="text-gray-900">{deletingListing.productName}</strong> ({deletingListing.quantity} {deletingListing.unit || 'KG'})?
                        </p>
                        <p className="text-xs text-red-600 font-medium">This action will remove the listing from the direct marketplace.</p>
                        <div className="flex justify-end gap-3 pt-4 border-t">
                            <Button variant="outline" onClick={() => setDeletingListing(null)}>Cancel</Button>
                            <Button variant="danger" onClick={handleDeleteConfirm}>Delete Listing</Button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default MyListings;
