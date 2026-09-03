import React from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

export default function Complaints() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Support & Complaints</h1>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-4 font-medium text-gray-600">Ticket ID</th>
                  <th className="p-4 font-medium text-gray-600">User</th>
                  <th className="p-4 font-medium text-gray-600">Issue</th>
                  <th className="p-4 font-medium text-gray-600">Priority</th>
                  <th className="p-4 font-medium text-gray-600">Status</th>
                  <th className="p-4 font-medium text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr className="hover:bg-gray-50">
                  <td className="p-4 font-medium">TKT-001</td>
                  <td className="p-4">Rajesh (Farmer)</td>
                  <td className="p-4">Payment delayed for ORD-5001</td>
                  <td className="p-4"><Badge variant="destructive">High</Badge></td>
                  <td className="p-4"><Badge variant="warning">Open</Badge></td>
                  <td className="p-4"><Button variant="outline" size="sm">Resolve</Button></td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-4 font-medium">TKT-002</td>
                  <td className="p-4">Fresh Mart</td>
                  <td className="p-4">Quality issue with Tomatoes</td>
                  <td className="p-4"><Badge variant="warning">Medium</Badge></td>
                  <td className="p-4"><Badge variant="default">In Review</Badge></td>
                  <td className="p-4"><Button variant="outline" size="sm">Resolve</Button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
