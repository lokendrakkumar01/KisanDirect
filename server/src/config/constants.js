export const APP_NAME = 'AgroConnect';
export const JWT_SECRET = process.env.JWT_SECRET || 'kisan-direct-super-secret-key-2026';
export const JWT_EXPIRES_IN = '7d';
export const ROLES = {
    FARMER: 'farmer',
    FPO: 'fpo',
    CONSUMER: 'consumer',
    BULK_BUYER: 'bulk_buyer',
    LOGISTICS: 'logistics',
    ADMIN: 'admin',
};
export const ORDER_STATUS = {
    CONFIRMED: 'confirmed',
    PICKUP_SCHEDULED: 'pickup_scheduled',
    PICKED_UP: 'picked_up',
    IN_TRANSIT: 'in_transit',
    OUT_FOR_DELIVERY: 'out_for_delivery',
    DELIVERED: 'delivered',
    CANCELLED: 'cancelled',
};
export const PAYMENT_STATUS = {
    PENDING: 'pending',
    PROCESSING: 'processing',
    SUCCESSFUL: 'successful',
    FAILED: 'failed',
    REFUNDED: 'refunded',
};
export const COMPLAINT_STATUS = {
    OPEN: 'open',
    IN_REVIEW: 'in_review',
    RESOLVED: 'resolved',
    CLOSED: 'closed',
};
export const QUALITY_GRADES = {
    A: 'A',
    B: 'B',
    C: 'C',
};
export const PRODUCT_CATEGORIES = [
    'vegetables',
    'fruits',
    'grains',
    'pulses',
    'spices',
    'dairy',
    'other',
];
