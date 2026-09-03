import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Search, MapPin, ShoppingBag, Clock, Star } from 'lucide-react';
import { formatCurrency } from '../../utils/format';
export const ConsumerDashboard = () => {
    const { user } = useAuth();
    const recommendedProduce = [
        { id: '1', name: 'Fresh Tomatoes', seller: 'Ramesh Farm', price: 35, unit: 'KG', rating: 4.8, distance: '5 km', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300&q=80' },
        { id: '2', name: 'Organic Onions', seller: 'Green Valley FPO', price: 28, unit: 'KG', rating: 4.5, distance: '12 km', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&q=80' },
        { id: '3', name: 'Potatoes (Grade A)', seller: 'Suresh Patil', price: 25, unit: 'KG', rating: 4.9, distance: '8 km', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&q=80' },
        { id: '4', name: 'Wheat (Sharbati)', seller: 'Kisan Cooperative', price: 3200, unit: 'Quintal', rating: 4.7, distance: '25 km', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&q=80' },
    ];
    return (<div className="space-y-8">
      <div className="bg-green-600 rounded-2xl p-8 text-white flex flex-col md:flex-row justify-between items-center shadow-lg">
        <div className="mb-6 md:mb-0">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-green-100 text-lg mb-6">Discover farm-fresh produce directly from local farmers.</p>
          <div className="relative max-w-md">
            <input type="text" placeholder="Search for tomatoes, onions, wheat..." className="w-full pl-12 pr-4 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-300 shadow-sm"/>
            <Search className="w-6 h-6 text-gray-400 absolute left-4 top-3"/>
          </div>
        </div>
        <div className="hidden md:block">
          <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80" alt="Fresh Produce" className="w-48 h-48 rounded-full border-4 border-green-500 object-cover shadow-xl"/>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-green-500">
          <CardBody className="flex items-center p-6">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-4">
              <ShoppingBag className="w-6 h-6"/>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Browse Marketplace</h3>
              <p className="text-sm text-gray-500">Explore all produce</p>
            </div>
          </CardBody>
        </Card>
        <Card className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-blue-500">
          <CardBody className="flex items-center p-6">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-4">
              <Clock className="w-6 h-6"/>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Track Orders</h3>
              <p className="text-sm text-gray-500">2 active deliveries</p>
            </div>
          </CardBody>
        </Card>
        <Card className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-amber-500">
          <CardBody className="flex items-center p-6">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mr-4">
              <MapPin className="w-6 h-6"/>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Nearby Farmers</h3>
              <p className="text-sm text-gray-500">15+ farms in 20km</p>
            </div>
          </CardBody>
        </Card>
      </div>

      <div>
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Recommended For You</h2>
            <p className="text-gray-500 mt-1">Top-rated produce from nearby verified farmers</p>
          </div>
          <Button variant="ghost">View All</Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedProduce.map(product => (<Card key={product.id} hoverable className="overflow-hidden flex flex-col">
              <div className="h-48 bg-gray-200 relative">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover"/>
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-gray-900 shadow-sm flex items-center">
                  <Star className="w-3 h-3 text-amber-400 mr-1 fill-current"/> {product.rating}
                </div>
              </div>
              <CardBody className="flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-900 text-lg">{product.name}</h3>
                </div>
                <p className="text-sm text-gray-500 mb-4">{product.seller} • {product.distance}</p>
                <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-100">
                  <div>
                    <span className="font-bold text-lg text-gray-900">{formatCurrency(product.price)}</span>
                    <span className="text-xs text-gray-500">/{product.unit}</span>
                  </div>
                  <Button size="sm">Add</Button>
                </div>
              </CardBody>
            </Card>))}
        </div>
      </div>
    </div>);
};
export default ConsumerDashboard;
