import api from './api';

export const MOCK_ADMIN_USERS = [
    { id: 'usr-001', name: 'Ramesh Patil', email: 'farmer@demo.com', phone: '+91 98765 43210', role: 'farmer', isVerified: true, verificationStatus: 'verified', status: 'active', location: 'Nashik, Maharashtra', createdAt: '2026-08-15' },
    { id: 'usr-002', name: 'Sunil Shinde', email: 'sunil@example.com', phone: '+91 98765 43211', role: 'farmer', isVerified: true, verificationStatus: 'verified', status: 'active', location: 'Niphad, Maharashtra', createdAt: '2026-08-18' },
    { id: 'usr-003', name: 'Priya Deshmukh', email: 'priya@example.com', phone: '+91 98765 43212', role: 'farmer', isVerified: true, verificationStatus: 'verified', status: 'active', location: 'Pune, Maharashtra', createdAt: '2026-08-20' },
    { id: 'usr-004', name: 'Deepak Pawar', email: 'deepak@example.com', phone: '+91 98765 43213', role: 'farmer', isVerified: false, verificationStatus: 'pending', status: 'active', location: 'Ahmednagar, Maharashtra', createdAt: '2026-09-01' },
    { id: 'usr-005', name: 'Nashik Fresh Farmers FPO', email: 'fpo@demo.com', phone: '+91 98765 43220', role: 'fpo', isVerified: true, verificationStatus: 'verified', status: 'active', location: 'Nashik, Maharashtra', createdAt: '2026-07-10' },
    { id: 'usr-006', name: 'Pune Organic Collective FPO', email: 'punefpo@example.com', phone: '+91 98765 43221', role: 'fpo', isVerified: true, verificationStatus: 'verified', status: 'active', location: 'Pune, Maharashtra', createdAt: '2026-07-25' },
    { id: 'usr-007', name: 'Pune Fresh Restaurant', email: 'buyer@demo.com', phone: '+91 98765 43240', role: 'bulk_buyer', isVerified: true, verificationStatus: 'verified', status: 'active', location: 'Pune, Maharashtra', createdAt: '2026-08-01' },
    { id: 'usr-008', name: 'Mumbai Grand Hotel', email: 'mumbaihotel@example.com', phone: '+91 98765 43241', role: 'bulk_buyer', isVerified: true, verificationStatus: 'verified', status: 'active', location: 'Mumbai, Maharashtra', createdAt: '2026-08-05' },
    { id: 'usr-009', name: 'FreshMart Supermarket', email: 'freshmart@example.com', phone: '+91 98765 43242', role: 'bulk_buyer', isVerified: false, verificationStatus: 'pending', status: 'active', location: 'Mumbai, Maharashtra', createdAt: '2026-08-28' },
    { id: 'usr-010', name: 'Amit Kumar', email: 'consumer@demo.com', phone: '+91 98765 43230', role: 'consumer', isVerified: true, verificationStatus: 'verified', status: 'active', location: 'Pune, Maharashtra', createdAt: '2026-08-12' },
    { id: 'usr-011', name: 'Sneha Joshi', email: 'sneha@example.com', phone: '+91 98765 43231', role: 'consumer', isVerified: true, verificationStatus: 'verified', status: 'active', location: 'Mumbai, Maharashtra', createdAt: '2026-08-14' },
    { id: 'usr-012', name: 'Rajesh Sharma', email: 'rajesh@example.com', phone: '+91 98765 43232', role: 'consumer', isVerified: true, verificationStatus: 'verified', status: 'active', location: 'Nagpur, Maharashtra', createdAt: '2026-08-22' },
    { id: 'usr-013', name: 'Speedy Logistics', email: 'logistics@demo.com', phone: '+91 98765 43250', role: 'logistics', isVerified: true, verificationStatus: 'verified', status: 'active', location: 'Sinnar, Maharashtra', createdAt: '2026-07-01' },
    { id: 'usr-014', name: 'Platform Admin (DoCA)', email: 'admin@demo.com', phone: '+91 99999 99999', role: 'admin', isVerified: true, verificationStatus: 'verified', status: 'active', location: 'New Delhi, India', createdAt: '2026-06-01' }
];

export const getDashboard = async () => {
    try {
        const response = await api.get('/admin/dashboard');
        if (response.data && response.data.success && response.data.data) {
            return response.data;
        }
    } catch (e) {}
    return {
        success: true,
        data: {
            totalFarmers: 450,
            totalFPOs: 42,
            totalConsumers: 1280,
            totalBulkBuyers: 85,
            activeListings: 320,
            activeOrders: 48,
            completedDeliveries: 940,
            platformTransactions: 12500000
        }
    };
};

export const getUsers = async () => {
    try {
        const response = await api.get('/admin/users');
        if (response.data && response.data.success && Array.isArray(response.data.data) && response.data.data.length > 0) {
            return response.data;
        }
    } catch (e) {}
    return { success: true, data: MOCK_ADMIN_USERS };
};

export const verifyUser = async (id, status) => {
    try {
        const response = await api.post(`/admin/users/${id}/verify`, { status });
        if (response.data && response.data.success) return response.data;
    } catch (e) {}
    const target = MOCK_ADMIN_USERS.find(u => u.id === id);
    if (target) {
        target.isVerified = true;
        target.verificationStatus = 'verified';
    }
    return { success: true, data: target || { id, isVerified: true } };
};

export const updateUserRole = async (id, role) => {
    try {
        const response = await api.post(`/admin/users/${id}/role`, { role });
        if (response.data && response.data.success) return response.data;
    } catch (e) {}
    const target = MOCK_ADMIN_USERS.find(u => u.id === id);
    if (target) {
        target.role = role;
    }
    return { success: true, data: target || { id, role } };
};

export const createUserAdmin = async (userData) => {
    const newUser = {
        id: 'usr-' + Math.floor(1000 + Math.random() * 9000),
        name: userData.name || 'New User',
        email: userData.email || 'user@example.com',
        phone: userData.phone || '+91 98765 00000',
        role: userData.role || 'farmer',
        isVerified: true,
        verificationStatus: 'verified',
        status: 'active',
        location: userData.location || 'Maharashtra, India',
        createdAt: new Date().toISOString().split('T')[0]
    };
    MOCK_ADMIN_USERS.unshift(newUser);
    return { success: true, data: newUser };
};

export const getAnalytics = async () => {
    try {
        const response = await api.get('/admin/analytics');
        if (response.data && response.data.success) return response.data;
    } catch (e) {}
    return { success: true, data: {} };
};
