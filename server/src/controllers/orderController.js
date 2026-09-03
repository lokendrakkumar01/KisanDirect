import { store } from '../data/store.js';
import { v4 as uuidv4 } from 'uuid';
import { calculatePriceBreakdown } from '../services/pricingService.js';
import { updateInventory } from '../services/inventoryService.js';
export const createOrder = (req, res) => {
    const { items, deliveryAddress } = req.body;
    let subtotal = 0;
    const orderItems = items.map((item) => {
        const listing = store.getListingById(item.listingId);
        if (!listing)
            throw new Error(`Listing ${item.listingId} not found`);
        // Update inventory
        updateInventory(item.listingId, item.quantity);
        const itemSubtotal = listing.price * item.quantity;
        subtotal += itemSubtotal;
        return {
            id: uuidv4(),
            listingId: listing.id,
            productName: listing.productName,
            sellerId: listing.farmerId || listing.fpoId,
            sellerName: listing.farmerName || listing.fpoName,
            quantity: item.quantity,
            unit: listing.unit,
            unitPrice: listing.price,
            subtotal: itemSubtotal
        };
    });
    const pricing = calculatePriceBreakdown(subtotal, 50); // 50km mock distance
    const order = store.createOrder({
        id: uuidv4(),
        orderNumber: `ORD-${Date.now()}`,
        buyerId: req.user.id,
        buyerName: req.user.name,
        buyerType: req.user.role === 'bulk_buyer' ? 'bulk_buyer' : 'consumer',
        items: orderItems,
        ...pricing,
        status: 'confirmed',
        paymentStatus: 'successful',
        deliveryAddress,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    });
    // Create delivery task
    store.deliveries.push({
        id: uuidv4(),
        orderId: order.id,
        orderNumber: order.orderNumber,
        pickupLocation: store.getListings().find(l => l.id === orderItems[0].listingId)?.location || deliveryAddress,
        deliveryLocation: deliveryAddress,
        productName: orderItems[0].productName + (orderItems.length > 1 ? ` +${orderItems.length - 1} more` : ''),
        quantity: orderItems.reduce((sum, i) => sum + i.quantity, 0),
        unit: orderItems[0].unit,
        distance: 50,
        estimatedTime: '2 hours',
        estimatedCost: pricing.logisticsCost,
        status: 'confirmed',
        statusHistory: [{ status: 'confirmed', timestamp: new Date().toISOString() }],
        createdAt: new Date().toISOString()
    });
    res.status(201).json({ success: true, data: order });
};
export const getOrders = (req, res) => {
    const orders = store.getOrdersByUser(req.user.id);
    res.json({ success: true, data: orders });
};
