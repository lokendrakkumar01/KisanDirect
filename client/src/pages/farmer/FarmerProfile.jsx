import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { BadgeCheck, Star, MapPin } from 'lucide-react';
export const FarmerProfile = () => {
    const { user } = useAuth();
    return (<div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <Button variant="outline">Edit Profile</Button>
      </div>

      <Card>
        <CardBody className="p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
            <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center text-green-700 text-4xl font-bold border-4 border-white shadow-lg">
              {user?.name?.charAt(0) || 'F'}
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4 mb-2">
                <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
                {user?.isVerified && (<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <BadgeCheck className="w-4 h-4 mr-1"/> Verified Farmer
                  </span>)}
              </div>
              
              <div className="flex items-center justify-center md:justify-start text-gray-500 mb-4">
                <MapPin className="w-4 h-4 mr-1"/>
                <span>{user?.location?.city || 'Pune'}, {user?.location?.state || 'Maharashtra'}</span>
              </div>
              
              <div className="flex justify-center md:justify-start space-x-6 text-sm">
                <div className="text-center md:text-left">
                  <p className="text-gray-500">Rating</p>
                  <p className="font-bold text-gray-900 flex items-center">4.8 <Star className="w-4 h-4 text-amber-400 ml-1 fill-current"/></p>
                </div>
                <div className="text-center md:text-left">
                  <p className="text-gray-500">Completed Orders</p>
                  <p className="font-bold text-gray-900">124</p>
                </div>
                <div className="text-center md:text-left">
                  <p className="text-gray-500">Farm Size</p>
                  <p className="font-bold text-gray-900">5 Acres</p>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-bold text-gray-900">Farm Details</h3>
        </CardHeader>
        <CardBody className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Farm Name</p>
              <p className="font-medium text-gray-900">Green Valley Farms</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Primary Crops</p>
              <div className="flex space-x-2">
                <span className="px-2 py-1 bg-gray-100 rounded text-sm">Tomato</span>
                <span className="px-2 py-1 bg-gray-100 rounded text-sm">Onion</span>
                <span className="px-2 py-1 bg-gray-100 rounded text-sm">Potato</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Farming Method</p>
              <p className="font-medium text-gray-900">Conventional &amp; Organic</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">FPO Affiliation</p>
              <p className="font-medium text-gray-900 text-blue-600 hover:underline cursor-pointer">MahaFarmers Cooperative</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Description</p>
            <p className="text-sm text-gray-700 leading-relaxed">
              Family-owned farm focusing on high-quality vegetable production. We implement drip irrigation and sustainable farming practices to ensure the best quality produce while conserving water.
            </p>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-bold text-gray-900">Bank &amp; Payment Details</h3>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                <span className="font-bold text-gray-500">SBI</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">State Bank of India</p>
                <p className="text-sm text-gray-500">A/C ending in 4021</p>
              </div>
            </div>
            <span className="text-sm text-green-600 font-medium bg-green-50 px-2 py-1 rounded">Primary</span>
          </div>
          <Button variant="outline" size="sm">Add New Account</Button>
        </CardBody>
      </Card>
    </div>);
};
export default FarmerProfile;
