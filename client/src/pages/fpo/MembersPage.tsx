import React, { useState } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { Search, UserPlus, MapPin, Edit, Trash2 } from 'lucide-react';
import { formatDate } from '../../utils/format';

export default function MembersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const members = [
    { id: 'M-001', name: 'Ramesh Patel', location: 'Village A', crops: 'Tomato, Onion', contributed: 2400, status: 'Active', joinDate: '2025-01-15' },
    { id: 'M-002', name: 'Suresh Kumar', location: 'Village B', crops: 'Wheat, Potato', contributed: 5600, status: 'Active', joinDate: '2025-02-20' },
    { id: 'M-003', name: 'Anita Desai', location: 'Village A', crops: 'Onion, Garlic', contributed: 1200, status: 'Active', joinDate: '2025-04-10' },
    { id: 'M-004', name: 'Vijay Singh', location: 'Village C', crops: 'Tomato', contributed: 0, status: 'Inactive', joinDate: '2026-01-05' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">FPO Members</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your farmer members and their contributions.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" /> Add Member
        </Button>
      </div>

      <Card>
        <CardContent className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative w-full max-w-md">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                className="pl-10"
                placeholder="Search members by name or village..."
              />
            </div>
            <select className="rounded-md border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 border">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farmer Details</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crops Grown</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Contributed</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {members.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                        {member.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{member.name}</div>
                        <div className="text-sm text-gray-500 flex items-center mt-1">
                          <MapPin className="h-3 w-3 mr-1" /> {member.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{member.crops}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-medium">{member.contributed} KG</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={member.status === 'Active' ? 'success' : 'secondary'}>
                      {member.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-900 p-2">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-900 p-2">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Member">
        <div className="space-y-4 py-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <Input placeholder="Enter farmer's name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <Input placeholder="+91" type="tel" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Village/Location</label>
            <Input placeholder="Enter village name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Primary Crops (comma separated)</label>
            <Input placeholder="e.g. Tomato, Onion, Wheat" />
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsModalOpen(false)}>Add Member</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
