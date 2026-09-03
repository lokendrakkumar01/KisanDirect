import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { MAHARASHTRA_LOCATIONS } from './locations.js';
const hashPassword = (password) => bcrypt.hashSync(password, 10);
const DEFAULT_PASSWORD = hashPassword('demo123');
const NOW = new Date().toISOString();
// Users
export const users = [
    { id: uuidv4(), name: 'Ramesh Patil', email: 'ramesh@example.com', phone: '9876543210', role: 'farmer', isVerified: true, verificationStatus: 'verified', createdAt: NOW, updatedAt: NOW },
    { id: uuidv4(), name: 'Sunil Shinde', email: 'sunil@example.com', phone: '9876543211', role: 'farmer', isVerified: true, verificationStatus: 'verified', createdAt: NOW, updatedAt: NOW },
    { id: uuidv4(), name: 'Priya Deshmukh', email: 'priya@example.com', phone: '9876543212', role: 'farmer', isVerified: true, verificationStatus: 'verified', createdAt: NOW, updatedAt: NOW },
    { id: uuidv4(), name: 'Deepak Pawar', email: 'deepak@example.com', phone: '9876543213', role: 'farmer', isVerified: true, verificationStatus: 'verified', createdAt: NOW, updatedAt: NOW },
    { id: uuidv4(), name: 'Nashik Fresh Farmers FPO', email: 'nashikfpo@example.com', phone: '9876543220', role: 'fpo', isVerified: true, verificationStatus: 'verified', createdAt: NOW, updatedAt: NOW },
    { id: uuidv4(), name: 'Pune Organic Collective', email: 'punefpo@example.com', phone: '9876543221', role: 'fpo', isVerified: true, verificationStatus: 'verified', createdAt: NOW, updatedAt: NOW },
    { id: uuidv4(), name: 'Amit Kumar', email: 'amit@example.com', phone: '9876543230', role: 'consumer', isVerified: true, verificationStatus: 'verified', createdAt: NOW, updatedAt: NOW },
    { id: uuidv4(), name: 'Sneha Joshi', email: 'sneha@example.com', phone: '9876543231', role: 'consumer', isVerified: true, verificationStatus: 'verified', createdAt: NOW, updatedAt: NOW },
    { id: uuidv4(), name: 'Rajesh Sharma', email: 'rajesh@example.com', phone: '9876543232', role: 'consumer', isVerified: true, verificationStatus: 'verified', createdAt: NOW, updatedAt: NOW },
    { id: uuidv4(), name: 'Kavita Singh', email: 'kavita@example.com', phone: '9876543233', role: 'consumer', isVerified: true, verificationStatus: 'verified', createdAt: NOW, updatedAt: NOW },
    { id: uuidv4(), name: 'Pune Fresh Restaurant', email: 'punerestaurant@example.com', phone: '9876543240', role: 'bulk_buyer', isVerified: true, verificationStatus: 'verified', createdAt: NOW, updatedAt: NOW },
    { id: uuidv4(), name: 'Mumbai Grand Hotel', email: 'mumbaihotel@example.com', phone: '9876543241', role: 'bulk_buyer', isVerified: true, verificationStatus: 'verified', createdAt: NOW, updatedAt: NOW },
    { id: uuidv4(), name: 'FreshMart Supermarket', email: 'freshmart@example.com', phone: '9876543242', role: 'bulk_buyer', isVerified: true, verificationStatus: 'verified', createdAt: NOW, updatedAt: NOW },
    { id: uuidv4(), name: 'Speedy Logistics', email: 'speedy@example.com', phone: '9876543250', role: 'logistics', isVerified: true, verificationStatus: 'verified', createdAt: NOW, updatedAt: NOW },
    { id: uuidv4(), name: 'Platform Admin (DoCA)', email: 'admin@demo.com', phone: '9999999999', role: 'admin', isVerified: true, verificationStatus: 'verified', createdAt: NOW, updatedAt: NOW },
    { id: uuidv4(), name: 'Platform Admin', email: 'admin@kisandirect.com', phone: '9999999999', role: 'admin', isVerified: true, verificationStatus: 'verified', createdAt: NOW, updatedAt: NOW },
    { id: uuidv4(), name: 'Platform Admin', email: 'admin@agroconnect.com', phone: '9999999999', role: 'admin', isVerified: true, verificationStatus: 'verified', createdAt: NOW, updatedAt: NOW },
    { id: uuidv4(), name: 'Ramesh Patil (Farmer)', email: 'farmer@demo.com', phone: '9876543210', role: 'farmer', isVerified: true, verificationStatus: 'verified', createdAt: NOW, updatedAt: NOW },
    { id: uuidv4(), name: 'Nashik Fresh Farmers FPO', email: 'fpo@demo.com', phone: '9876543220', role: 'fpo', isVerified: true, verificationStatus: 'verified', createdAt: NOW, updatedAt: NOW },
    { id: uuidv4(), name: 'Pune Fresh Restaurant', email: 'buyer@demo.com', phone: '9876543240', role: 'bulk_buyer', isVerified: true, verificationStatus: 'verified', createdAt: NOW, updatedAt: NOW },
    { id: uuidv4(), name: 'Amit Kumar (Consumer)', email: 'consumer@demo.com', phone: '9876543230', role: 'consumer', isVerified: true, verificationStatus: 'verified', createdAt: NOW, updatedAt: NOW },
    { id: uuidv4(), name: 'Speedy Logistics Operator', email: 'logistics@demo.com', phone: '9876543250', role: 'logistics', isVerified: true, verificationStatus: 'verified', createdAt: NOW, updatedAt: NOW }
];
export const userPasswords = {};
users.forEach(u => userPasswords[u.email] = DEFAULT_PASSWORD);
// Profiles
export const farmerProfiles = [
    { id: uuidv4(), userId: users[0].id, farmName: 'Ramesh Farms', farmSize: '5', farmSizeUnit: 'Acre', crops: ['Tomato', 'Onion'], organic: true, rating: 4.5, totalReviews: 24, completedOrders: 50, totalEarnings: 150000, location: MAHARASHTRA_LOCATIONS.NASHIK },
    { id: uuidv4(), userId: users[1].id, farmName: 'Sunil Orchards', farmSize: '10', farmSizeUnit: 'Acre', crops: ['Grapes', 'Pomegranate'], organic: false, rating: 4.2, totalReviews: 15, completedOrders: 30, totalEarnings: 400000, location: MAHARASHTRA_LOCATIONS.NIPHAD },
    { id: uuidv4(), userId: users[2].id, farmName: 'Priya Organics', farmSize: '3', farmSizeUnit: 'Acre', crops: ['Potato', 'Wheat'], organic: true, rating: 4.8, totalReviews: 40, completedOrders: 80, totalEarnings: 250000, location: MAHARASHTRA_LOCATIONS.PUNE },
    { id: uuidv4(), userId: users[3].id, farmName: 'Deepak Fields', farmSize: '15', farmSizeUnit: 'Acre', crops: ['Rice', 'Banana'], organic: false, rating: 4.0, totalReviews: 10, completedOrders: 20, totalEarnings: 300000, location: MAHARASHTRA_LOCATIONS.AHMEDNAGAR },
];
export const fpoProfiles = [
    { id: uuidv4(), userId: users[4].id, fpoName: 'Nashik Fresh Farmers FPO', registrationNumber: 'FPO-NSK-001', totalMembers: 150, rating: 4.6, totalReviews: 100, completedOrders: 500, totalRevenue: 5000000, location: MAHARASHTRA_LOCATIONS.NASHIK },
    { id: uuidv4(), userId: users[5].id, fpoName: 'Pune Organic Collective', registrationNumber: 'FPO-PUN-002', totalMembers: 80, rating: 4.7, totalReviews: 60, completedOrders: 300, totalRevenue: 2500000, location: MAHARASHTRA_LOCATIONS.PUNE },
];
export const buyerProfiles = [
    { id: uuidv4(), userId: users[10].id, businessName: 'Pune Fresh Restaurant', businessType: 'restaurant', rating: 4.9, totalReviews: 150, completedOrders: 200, totalSpend: 1000000, location: MAHARASHTRA_LOCATIONS.PUNE },
    { id: uuidv4(), userId: users[11].id, businessName: 'Mumbai Grand Hotel', businessType: 'hotel', rating: 4.8, totalReviews: 300, completedOrders: 500, totalSpend: 5000000, location: MAHARASHTRA_LOCATIONS.MUMBAI },
    { id: uuidv4(), userId: users[12].id, businessName: 'FreshMart Supermarket', businessType: 'supermarket', rating: 4.5, totalReviews: 80, completedOrders: 150, totalSpend: 2000000, location: MAHARASHTRA_LOCATIONS.MUMBAI },
];
// Listings
export const listings = [
    { id: uuidv4(), farmerId: users[0].id, farmerName: 'Ramesh Patil', farmName: 'Ramesh Farms', productName: 'Fresh Red Tomatoes', category: 'vegetables', description: 'Freshly picked red tomatoes', quantity: 500, availableQuantity: 500, unit: 'kg', price: 25, minOrderQuantity: 10, qualityGrade: 'A', organic: true, harvestDate: NOW, availableFrom: NOW, images: ['/images/tomato.jpg'], location: MAHARASHTRA_LOCATIONS.NASHIK, rating: 4.5, totalReviews: 20, sellerType: 'farmer', status: 'active', createdAt: NOW, updatedAt: NOW },
    { id: uuidv4(), farmerId: users[0].id, farmerName: 'Ramesh Patil', farmName: 'Ramesh Farms', productName: 'Nashik Red Onions', category: 'vegetables', description: 'Export quality red onions', quantity: 1000, availableQuantity: 800, unit: 'kg', price: 30, minOrderQuantity: 50, qualityGrade: 'A', organic: false, harvestDate: NOW, availableFrom: NOW, images: ['/images/onion.jpg'], location: MAHARASHTRA_LOCATIONS.NASHIK, rating: 4.6, totalReviews: 35, sellerType: 'farmer', status: 'active', createdAt: NOW, updatedAt: NOW },
    { id: uuidv4(), farmerId: users[1].id, farmerName: 'Sunil Shinde', farmName: 'Sunil Orchards', productName: 'Seedless Grapes', category: 'fruits', description: 'Sweet seedless green grapes', quantity: 200, availableQuantity: 150, unit: 'kg', price: 80, minOrderQuantity: 5, qualityGrade: 'A', organic: false, harvestDate: NOW, availableFrom: NOW, images: ['/images/grapes.jpg'], location: MAHARASHTRA_LOCATIONS.NIPHAD, rating: 4.8, totalReviews: 12, sellerType: 'farmer', status: 'active', createdAt: NOW, updatedAt: NOW },
];
// Bulk Requirements
export const bulkRequirements = [
    { id: uuidv4(), buyerId: users[10].id, buyerName: 'Pune Fresh Restaurant', businessName: 'Pune Fresh Restaurant', productName: 'Onion', category: 'vegetables', requiredQuantity: 500, unit: 'kg', maxBudget: 35, requiredDate: new Date(Date.now() + 86400000 * 5).toISOString(), deliveryLocation: MAHARASHTRA_LOCATIONS.PUNE, qualityRequirement: 'A', status: 'active', matchedOffers: 2, createdAt: NOW },
    { id: uuidv4(), buyerId: users[11].id, buyerName: 'Mumbai Grand Hotel', businessName: 'Mumbai Grand Hotel', productName: 'Tomato', category: 'vegetables', requiredQuantity: 1000, unit: 'kg', maxBudget: 30, requiredDate: new Date(Date.now() + 86400000 * 3).toISOString(), deliveryLocation: MAHARASHTRA_LOCATIONS.MUMBAI, qualityRequirement: 'A', status: 'active', matchedOffers: 1, createdAt: NOW },
];
// Offers
export const offers = [
    { id: uuidv4(), offerNumber: 'OFF-001', requirementId: bulkRequirements[0].id, sellerId: users[0].id, sellerName: 'Ramesh Patil', sellerType: 'farmer', productName: 'Nashik Red Onions', quantity: 500, unit: 'kg', pricePerUnit: 32, totalPrice: 16000, distance: 210, estimatedDelivery: new Date(Date.now() + 86400000 * 2).toISOString(), matchScore: 85, matchReasons: [], status: 'pending', createdAt: NOW },
];
// Orders
export const orders = [
    { id: uuidv4(), orderNumber: 'ORD-001', buyerId: users[6].id, buyerName: 'Amit Kumar', buyerType: 'consumer', items: [{ id: uuidv4(), listingId: listings[0].id, productName: listings[0].productName, sellerId: users[0].id, sellerName: 'Ramesh Patil', quantity: 10, unit: 'kg', unitPrice: 25, subtotal: 250 }], subtotal: 250, logisticsCost: 50, platformFee: 12.5, total: 312.5, status: 'confirmed', paymentStatus: 'successful', deliveryAddress: MAHARASHTRA_LOCATIONS.PUNE, createdAt: NOW, updatedAt: NOW },
];
// Deliveries
export const deliveries = [
    { id: uuidv4(), orderId: orders[0].id, orderNumber: orders[0].orderNumber, pickupLocation: MAHARASHTRA_LOCATIONS.NASHIK, deliveryLocation: MAHARASHTRA_LOCATIONS.PUNE, productName: 'Fresh Red Tomatoes', quantity: 10, unit: 'kg', distance: 210, estimatedTime: '4 hours', estimatedCost: 50, status: 'confirmed', statusHistory: [{ status: 'confirmed', timestamp: NOW }], createdAt: NOW },
];
export const demandRecords = [];
export const priceRecords = [];
export const notifications = [];
export const reviews = [];
export const complaints = [];
