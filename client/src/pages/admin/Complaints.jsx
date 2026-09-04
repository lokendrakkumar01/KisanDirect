import React, { useState } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Search, ShieldAlert, CheckCircle, MessageSquare } from 'lucide-react';

const initialComplaints = [
    { id: 'TKT-001', user: 'Rajesh Patil (Farmer)', issue: 'Payment delayed for Order #ORD-5001', priority: 'High', status: 'Open', date: '2026-09-02', category: 'Payment' },
    { id: 'TKT-002', user: 'Fresh Mart (Bulk Buyer)', issue: 'Quality mismatch with Tomato shipment', priority: 'Medium', status: 'In Review', date: '2026-09-03', category: 'Quality' },
    { id: 'TKT-003', user: 'Sunil Kumar (Farmer)', issue: 'Pickup driver arrived 2 hours late', priority: 'Low', status: 'Resolved', date: '2026-09-01', category: 'Logistics' },
    { id: 'TKT-004', user: 'Nashik Organic FPO', issue: 'Bulk requirement price calculation discrepancy', priority: 'High', status: 'Open', date: '2026-09-03', category: 'Pricing' }
];

export default function Complaints() {
    const [tickets, setTickets] = useState(() => {
        const savedFeedbacks = JSON.parse(localStorage.getItem('agroconnect_feedbacks') || '[]');
        return [...savedFeedbacks, ...initialComplaints];
    });
    const [search, setSearch] = useState('');
    const [activeTab, setActiveTab] = useState('All');
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [resolutionText, setResolutionText] = useState('');
    const [toast, setToast] = useState('');

    const handleResolve = (ticketId, newStatus = 'Resolved') => {
        setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status: newStatus } : t));
        setToast(`Ticket ${ticketId} updated to ${newStatus}`);
        setSelectedTicket(null);
        setResolutionText('');
        setTimeout(() => setToast(''), 3000);
    };

    const filteredTickets = tickets.filter(t => {
        let matchTab = true;
        if (activeTab !== 'All') {
            matchTab = t.status.toLowerCase() === activeTab.toLowerCase();
        }
        let matchSearch = true;
        if (search.trim()) {
            const q = search.toLowerCase().trim();
            matchSearch = (
                t.id.toLowerCase().includes(q) ||
                t.user.toLowerCase().includes(q) ||
                t.issue.toLowerCase().includes(q)
            );
        }
        return matchTab && matchSearch;
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Grievance & Support Desk</h1>
                    <p className="text-sm text-gray-500 mt-1">SIH 2026 Department of Consumer Affairs Support Portal</p>
                </div>
                <Badge variant="primary" className="text-sm px-3 py-1">{tickets.length} Total Tickets</Badge>
            </div>

            {toast && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" /> {toast}
                </div>
            )}

            <div className="flex gap-4 border-b">
                {['All', 'Open', 'In Review', 'Resolved'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-2 px-3 text-sm font-medium transition-colors ${
                            activeTab === tab
                                ? 'border-b-2 border-green-600 text-green-600 font-bold'
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <Card>
                <CardContent className="p-4">
                    <div className="flex gap-4 mb-4">
                        <div className="flex-1 relative">
                            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                            <input 
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by Ticket ID, user name, or issue description..." 
                                className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="p-4 font-medium text-gray-600">Ticket ID</th>
                                    <th className="p-4 font-medium text-gray-600">User / Entity</th>
                                    <th className="p-4 font-medium text-gray-600">Issue Description</th>
                                    <th className="p-4 font-medium text-gray-600">Priority</th>
                                    <th className="p-4 font-medium text-gray-600">Status</th>
                                    <th className="p-4 font-medium text-gray-600">Date</th>
                                    <th className="p-4 font-medium text-gray-600">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {filteredTickets.map(t => (
                                    <tr key={t.id} className="hover:bg-gray-50">
                                        <td className="p-4 font-bold text-gray-900">{t.id}</td>
                                        <td className="p-4 text-gray-800 font-medium">{t.user}</td>
                                        <td className="p-4 text-gray-700">{t.issue}</td>
                                        <td className="p-4">
                                            <Badge variant={t.priority === 'High' ? 'destructive' : t.priority === 'Medium' ? 'warning' : 'outline'}>
                                                {t.priority}
                                            </Badge>
                                        </td>
                                        <td className="p-4">
                                            <Badge variant={t.status === 'Resolved' ? 'success' : t.status === 'Open' ? 'destructive' : 'warning'}>
                                                {t.status}
                                            </Badge>
                                        </td>
                                        <td className="p-4 text-gray-500">{t.date}</td>
                                        <td className="p-4">
                                            <Button variant="outline" size="sm" onClick={() => setSelectedTicket(t)}>
                                                {t.status === 'Resolved' ? 'View' : 'Manage'}
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Resolve Modal */}
            {selectedTicket && (
                <Modal 
                    isOpen={!!selectedTicket} 
                    onClose={() => setSelectedTicket(null)} 
                    title={`Manage Ticket: ${selectedTicket.id}`}
                >
                    <div className="space-y-4 text-sm">
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-xs text-gray-400 font-medium">USER</p>
                            <p className="font-bold text-gray-900 mb-2">{selectedTicket.user}</p>
                            <p className="text-xs text-gray-400 font-medium">ISSUE DESCRIPTION</p>
                            <p className="text-gray-800">{selectedTicket.issue}</p>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">ADMIN RESOLUTION NOTES</label>
                            <textarea 
                                value={resolutionText}
                                onChange={(e) => setResolutionText(e.target.value)}
                                rows={3}
                                placeholder="Enter resolution details, action taken, or response to user..."
                                className="w-full p-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                        <div className="pt-4 border-t flex justify-end gap-2">
                            {selectedTicket.status !== 'Resolved' && (
                                <>
                                    <Button 
                                        variant="outline" 
                                        onClick={() => handleResolve(selectedTicket.id, 'In Review')}
                                    >
                                        Mark In Review
                                    </Button>
                                    <Button 
                                        onClick={() => handleResolve(selectedTicket.id, 'Resolved')}
                                    >
                                        Mark Resolved
                                    </Button>
                                </>
                            )}
                            <Button variant="outline" onClick={() => setSelectedTicket(null)}>Close</Button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export { Complaints };
