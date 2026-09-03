import api from './api';

export const MOCK_ORDERS = [
    { id: 'ORD-9012', orderNumber: 'ORD-9012', buyerName: 'Pune Fresh Restaurant', buyerType: 'bulk_buyer', sellerName: 'Nashik Fresh Farmers FPO', productName: 'Red Tomato (Grade A)', quantity: 500, unit: 'kg', unitPrice: 25, total: 12500, status: 'in_transit', paymentStatus: 'successful', deliveryAddress: 'Pune, Maharashtra', createdAt: '2026-09-03' },
    { id: 'ORD-9011', orderNumber: 'ORD-9011', buyerName: 'Mumbai Grand Hotel', buyerType: 'bulk_buyer', sellerName: 'Ramesh Patil', productName: 'Nashik Red Onion', quantity: 1000, unit: 'kg', unitPrice: 30, total: 30000, status: 'confirmed', paymentStatus: 'successful', deliveryAddress: 'Mumbai, Maharashtra', createdAt: '2026-09-02' },
    { id: 'ORD-9010', orderNumber: 'ORD-9010', buyerName: 'Amit Kumar', buyerType: 'consumer', sellerName: 'Priya Deshmukh', productName: 'Organic Potato', quantity: 20, unit: 'kg', unitPrice: 22, total: 440, status: 'delivered', paymentStatus: 'successful', deliveryAddress: 'Pune, Maharashtra', createdAt: '2026-09-01' },
    { id: 'ORD-9009', orderNumber: 'ORD-9009', buyerName: 'FreshMart Supermarket', buyerType: 'bulk_buyer', sellerName: 'Sunil Shinde', productName: 'Seedless Grapes', quantity: 250, unit: 'kg', unitPrice: 80, total: 20000, status: 'pending', paymentStatus: 'pending', deliveryAddress: 'Mumbai, Maharashtra', createdAt: '2026-08-30' },
    { id: 'ORD-9008', orderNumber: 'ORD-9008', buyerName: 'Sneha Joshi', buyerType: 'consumer', sellerName: 'Ramesh Patil', productName: 'Red Tomato (Grade A)', quantity: 15, unit: 'kg', unitPrice: 25, total: 375, status: 'delivered', paymentStatus: 'successful', deliveryAddress: 'Mumbai, Maharashtra', createdAt: '2026-08-28' },
    { id: 'ORD-9007', orderNumber: 'ORD-9007', buyerName: 'Pune Fresh Restaurant', buyerType: 'bulk_buyer', sellerName: 'Pune Organic Collective FPO', productName: 'Organic Wheat', quantity: 300, unit: 'kg', unitPrice: 28, total: 8400, status: 'delivered', paymentStatus: 'successful', deliveryAddress: 'Pune, Maharashtra', createdAt: '2026-08-25' }
];

export const createOrder = async (data) => {
    try {
        const response = await api.post('/orders', data);
        return response.data;
    } catch (e) {
        const newOrder = {
            id: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
            orderNumber: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
            buyerName: data.buyerName || 'Demo Buyer',
            buyerType: 'consumer',
            sellerName: 'Ramesh Patil',
            productName: data.productName || 'Fresh Red Tomatoes',
            quantity: data.quantity || 10,
            unit: 'kg',
            unitPrice: 25,
            total: (data.quantity || 10) * 25 + 50,
            status: 'confirmed',
            paymentStatus: 'successful',
            deliveryAddress: data.deliveryAddress || 'Pune, Maharashtra',
            createdAt: new Date().toISOString().split('T')[0]
        };
        MOCK_ORDERS.unshift(newOrder);
        return { success: true, data: newOrder };
    }
};

export const getOrders = async () => {
    try {
        const response = await api.get('/orders');
        if (response.data && response.data.success && Array.isArray(response.data.data) && response.data.data.length > 0) {
            return response.data;
        }
    } catch (e) {
        // Fallback to MOCK_ORDERS
    }
    return { success: true, data: MOCK_ORDERS };
};

export const getOrderById = async (id) => {
    try {
        const response = await api.get(`/orders/${id}`);
        if (response.data && response.data.success) return response.data;
    } catch (e) {}
    const found = MOCK_ORDERS.find(o => o.id === id || o.orderNumber === id);
    return { success: true, data: found || MOCK_ORDERS[0] };
};

export const updateOrderStatus = async (id, status) => {
    try {
        const response = await api.patch(`/orders/${id}/status`, { status });
        if (response.data && response.data.success) return response.data;
    } catch (e) {}
    const order = MOCK_ORDERS.find(o => o.id === id || o.orderNumber === id);
    if (order) {
        order.status = status;
        return { success: true, data: order };
    }
    return { success: true, data: { id, status } };
};
