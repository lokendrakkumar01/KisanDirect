import React, { useState } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Search, Filter } from 'lucide-react';

const mockUsers = [
  { id: 'USR-01', name: 'Ramesh Patil', email: 'ramesh@farm.com', role: 'Farmer', status: 'Active', verification: 'Verified', date: '2026-08-10' },
  { id: 'USR-02', name: 'Nashik FPO', email: 'contact@nashikfpo.org', role: 'FPO', status: 'Active', verification: 'Pending', date: '2026-09-01' },
  { id: 'USR-03', name: 'Fresh Mart', email: 'buy@freshmart.in', role: 'Bulk Buyer', status: 'Suspended', verification: 'Rejected', date: '2026-07-22' },
];

export default function UserManagement() {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
        <Button>Export Data</Button>
      </div>

      <div className="flex gap-4 border-b">
        {['All', 'Farmers', 'FPOs', 'Consumers', 'Bulk Buyers'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 px-1 text-sm font-medium ${activeTab === tab ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search users by name, email, or ID..." className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm" />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" /> Filters
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-4 font-medium text-gray-600">User</th>
                  <th className="p-4 font-medium text-gray-600">Role</th>
                  <th className="p-4 font-medium text-gray-600">Status</th>
                  <th className="p-4 font-medium text-gray-600">Verification</th>
                  <th className="p-4 font-medium text-gray-600">Joined</th>
                  <th className="p-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {mockUsers.map(u => (
                  <tr key={u.id} className="hover:bg-gray-50">
                    <td className="p-4">
                      <div className="font-medium text-gray-900">{u.name}</div>
                      <div className="text-xs text-gray-500">{u.email}</div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline">{u.role}</Badge>
                    </td>
                    <td className="p-4">
                      <Badge variant={u.status === 'Active' ? 'success' : 'destructive'}>{u.status}</Badge>
                    </td>
                    <td className="p-4">
                      <Badge variant={
                        u.verification === 'Verified' ? 'success' : 
                        u.verification === 'Pending' ? 'warning' : 'destructive'
                      }>{u.verification}</Badge>
                    </td>
                    <td className="p-4 text-gray-500">{u.date}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">View</Button>
                        {u.verification === 'Pending' && <Button size="sm">Verify</Button>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
