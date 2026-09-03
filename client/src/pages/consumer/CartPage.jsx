import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { Card, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight } from 'lucide-react';
import { formatCurrency } from '../../utils/format';

export const CartPage = () => {
    const { items, updateQuantity, removeFromCart, subtotal, logisticsEstimate, platformFee, total } = useCart();
    const navigate = useNavigate();

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <ShoppingCart className="w-12 h-12 text-gray-400"/>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                <p className="text-gray-500 mb-8 text-center max-w-md">Looks like you haven't added any farm-fresh produce to your cart yet.</p>
                <Button onClick={() => navigate('/marketplace')}>Continue Shopping</Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    {items.map(item => (
                        <Card key={item.listingId} className="overflow-hidden">
                            <CardBody className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center">
                                <div className="w-full sm:w-24 h-24 bg-green-50 rounded-lg overflow-hidden flex-shrink-0 mb-4 sm:mb-0 mr-0 sm:mr-6 flex items-center justify-center font-bold text-green-700 text-2xl">
                                    {item.listing?.productName ? item.listing.productName.charAt(0) : 'P'}
                                </div>
                                
                                <div className="flex-1 w-full">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">{item.listing?.productName || 'Produce'}</h3>
                                            <p className="text-sm text-gray-500">Sold by: {item.listing?.farmerName || 'Farmer'}</p>
                                        </div>
                                        <p className="font-bold text-green-700">{formatCurrency((item.listing?.price || 0) * item.quantity)}</p>
                                    </div>
                                    
                                    <div className="flex justify-between items-end mt-4">
                                        <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-1 border border-gray-200">
                                            <button 
                                                onClick={() => updateQuantity(item.listingId, Math.max(1, item.quantity - 1))} 
                                                disabled={item.quantity <= 1} 
                                                className="p-1 rounded text-gray-500 hover:bg-gray-200 disabled:opacity-50"
                                            >
                                                <Minus className="w-4 h-4"/>
                                            </button>
                                            <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                                            <button 
                                                onClick={() => updateQuantity(item.listingId, item.quantity + 1)} 
                                                className="p-1 rounded text-gray-500 hover:bg-gray-200"
                                            >
                                                <Plus className="w-4 h-4"/>
                                            </button>
                                            <span className="text-xs text-gray-500 ml-2 border-l pl-2">{item.listing?.unit || 'KG'}</span>
                                        </div>
                                        
                                        <button 
                                            onClick={() => removeFromCart(item.listingId)} 
                                            className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center p-1 hover:bg-red-50 rounded"
                                            title="Remove item"
                                        >
                                            <Trash2 className="w-4 h-4 mr-1"/> Remove
                                        </button>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </div>

                <div>
                    <Card className="sticky top-6">
                        <CardBody className="p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h2>
                            
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Subtotal ({items.length} items)</span>
                                    <span className="font-medium text-gray-900">{formatCurrency(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Estimated Logistics</span>
                                    <span className="font-medium text-gray-900">{formatCurrency(logisticsEstimate)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Platform Fee (2%)</span>
                                    <span className="font-medium text-gray-900">{formatCurrency(platformFee)}</span>
                                </div>
                            </div>
                            
                            <div className="border-t border-gray-200 pt-4 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-base font-bold text-gray-900">Total</span>
                                    <span className="text-xl font-bold text-green-600">{formatCurrency(total)}</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1 text-right">Includes all taxes</p>
                            </div>
                            
                            <Button 
                                fullWidth 
                                size="lg" 
                                rightIcon={<ArrowRight className="w-4 h-4"/>} 
                                onClick={() => navigate('/consumer/checkout')}
                            >
                                Proceed to Checkout
                            </Button>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
