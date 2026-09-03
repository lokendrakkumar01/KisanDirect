import React from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Bell, Package, Info, AlertTriangle } from 'lucide-react';

const notifications = [
  { id: 1, type: 'order', title: 'New Order Received', msg: 'You have a new order for 50kg Tomatoes.', time: '10 mins ago', read: false },
  { id: 2, type: 'alert', title: 'Price Alert', msg: 'Onion prices in your region have increased by 5%.', time: '2 hours ago', read: false },
  { id: 3, type: 'system', title: 'Profile Verified', msg: 'Your farmer profile has been verified successfully.', time: '1 day ago', read: true },
];

export default function NotificationsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
          <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full">2 New</span>
        </div>
        <Button variant="outline" size="sm">Mark all as read</Button>
      </div>

      <Card>
        <CardContent className="p-0 divide-y">
          {notifications.map(n => (
            <div key={n.id} className={`p-4 flex gap-4 hover:bg-gray-50 transition-colors ${!n.read ? 'bg-blue-50/50' : ''}`}>
              <div className="mt-1">
                {n.type === 'order' && <div className="p-2 bg-green-100 text-green-600 rounded-full"><Package className="w-5 h-5" /></div>}
                {n.type === 'alert' && <div className="p-2 bg-amber-100 text-amber-600 rounded-full"><AlertTriangle className="w-5 h-5" /></div>}
                {n.type === 'system' && <div className="p-2 bg-blue-100 text-blue-600 rounded-full"><Info className="w-5 h-5" /></div>}
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className={`text-sm ${!n.read ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>{n.title}</h4>
                  <span className="text-xs text-gray-500">{n.time}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{n.msg}</p>
              </div>
              {!n.read && (
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
