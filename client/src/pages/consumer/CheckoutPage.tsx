import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { PriceBreakdown } from '../../components/ui/PriceBreakdown';
import { createOrder } from '../../services/orderService';
import { CheckCircle, Truck, CreditCard, MapPin } from 'lucide-react';
import { formatCurrency } from '../../utils/format';

export const CheckoutPage: React.FC = () => {
  const { items, subtotal, logisticsEstimate, platformFee, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('demo_payment');
  
  const [address, setAddress] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      // Mock placing order
      setTimeout(() => {
        setOrderNumber(`ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`);
        setSuccess(true);
        clearCart();
        setLoading(false);
      }, 1500);
      
      // In real app:
      // const res = await createOrder({ items, deliveryAddress: address, paymentMethod });
      // setOrderNumber(res.data.orderNumber);
    } catch (error) {
      console.error('Checkout failed', error);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Card className="max-w-2xl mx-auto text-center py-12 px-6">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h2>
        <p className="text-gray-600 mb-2">Your order <span className="font-bold text-gray-900">{orderNumber}</span> has been confirmed.</p>
        <p className="text-gray-500 mb-8">You will receive updates on your delivery shortly.</p>
        <div className="flex justify-center space-x-4">
          <Button variant="outline" onClick={() => window.location.href = '/'}>Back to Home</Button>
          <Button onClick={() => window.location.href = '/consumer/orders'}>Track Order</Button>
        </div>
      </Card>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">No items to checkout</h2>
        <Button onClick={() => window.history.back()}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-gray-500" />
              <h2 className="text-lg font-bold text-gray-900">Delivery Address</h2>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" name="name" value={address.name} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input type="tel" name="phone" value={address.phone} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" required />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Complete Address</label>
                  <input type="text" name="address" value={address.address} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input type="text" name="city" value={address.city} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <input type="text" name="state" value={address.state} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                    <input type="text" name="pincode" value={address.pincode} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" required />
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader className="flex items-center space-x-2">
              <CreditCard className="w-5 h-5 text-gray-500" />
              <h2 className="text-lg font-bold text-gray-900">Payment Method</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-3">
                <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'demo_payment' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                  <input type="radio" name="payment" value="demo_payment" checked={paymentMethod === 'demo_payment'} onChange={() => setPaymentMethod('demo_payment')} className="w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300" />
                  <span className="ml-3 font-medium text-gray-900">Online Payment (UPI/Cards)</span>
                </label>
                <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'cash' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                  <input type="radio" name="payment" value="cash" checked={paymentMethod === 'cash'} onChange={() => setPaymentMethod('cash')} className="w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300" />
                  <span className="ml-3 font-medium text-gray-900">Cash on Delivery</span>
                </label>
              </div>
            </CardBody>
          </Card>
        </div>

        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>
            </CardHeader>
            <CardBody className="p-6">
              <div className="space-y-4 mb-6">
                {items.map(item => (
                  <div key={item.listingId} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.quantity}x {item.listing.productName}</span>
                    <span className="font-medium text-gray-900">{formatCurrency(item.listing.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              
              <div className="py-4 border-t border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Cost Breakdown</h3>
                <PriceBreakdown 
                  farmerRealization={subtotal} 
                  logistics={logisticsEstimate} 
                  platformFee={platformFee} 
                  total={total} 
                />
              </div>

              <div className="py-4 border-t border-gray-100 bg-blue-50 -mx-6 px-6 mt-4 flex items-start">
                <Truck className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-800">Estimated Delivery: <strong>Tomorrow, 2PM - 6PM</strong></p>
              </div>
              
              <div className="mt-6">
                <Button 
                  fullWidth 
                  size="lg" 
                  onClick={handlePlaceOrder}
                  isLoading={loading}
                  disabled={!address.name || !address.phone || !address.address}
                >
                  Place Order - {formatCurrency(total)}
                </Button>
                <p className="text-xs text-center text-gray-500 mt-3">
                  By placing your order, you agree to KisanDirect's Terms of Service and Privacy Policy.
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
