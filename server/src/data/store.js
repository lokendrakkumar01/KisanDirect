import * as seedData from './seed.js';
class DataStore {
    users = [...seedData.users];
    userPasswords = { ...seedData.userPasswords };
    farmerProfiles = [...seedData.farmerProfiles];
    fpoProfiles = [...seedData.fpoProfiles];
    buyerProfiles = [...seedData.buyerProfiles];
    listings = [...seedData.listings];
    bulkRequirements = [...seedData.bulkRequirements];
    offers = [...seedData.offers];
    orders = [...seedData.orders];
    deliveries = [...seedData.deliveries];
    demandRecords = [...seedData.demandRecords];
    priceRecords = [...seedData.priceRecords];
    notifications = [...seedData.notifications];
    reviews = [...seedData.reviews];
    complaints = [...seedData.complaints];
    // Users
    getUsers() { return this.users; }
    getUserById(id) { return this.users.find(u => u.id === id); }
    getUserByEmail(email) { return this.users.find(u => u.email === email); }
    createUser(user, passwordHash) {
        this.users.push(user);
        this.userPasswords[user.email] = passwordHash;
        return user;
    }
    // Listings
    getListings() { return this.listings; }
    getListingById(id) { return this.listings.find(l => l.id === id); }
    createListing(listing) {
        this.listings.push(listing);
        return listing;
    }
    updateListing(id, updates) {
        const idx = this.listings.findIndex(l => l.id === id);
        if (idx !== -1) {
            this.listings[idx] = { ...this.listings[idx], ...updates, updatedAt: new Date().toISOString() };
            return this.listings[idx];
        }
        return null;
    }
    deleteListing(id) {
        const idx = this.listings.findIndex(l => l.id === id);
        if (idx !== -1) {
            this.listings.splice(idx, 1);
            return true;
        }
        return false;
    }
    // Orders
    getOrders() { return this.orders; }
    getOrderById(id) { return this.orders.find(o => o.id === id); }
    getOrdersByUser(userId) { return this.orders.filter(o => o.buyerId === userId); }
    createOrder(order) {
        this.orders.push(order);
        return order;
    }
    updateOrderStatus(id, status) {
        const order = this.getOrderById(id);
        if (order) {
            order.status = status;
            order.updatedAt = new Date().toISOString();
            return order;
        }
        return null;
    }
    // Bulk Requirements & Offers
    getBulkRequirements() { return this.bulkRequirements; }
    createBulkRequirement(req) {
        this.bulkRequirements.push(req);
        return req;
    }
    getOffers() { return this.offers; }
    createOffer(offer) {
        this.offers.push(offer);
        return offer;
    }
    updateOfferStatus(id, status) {
        const offer = this.offers.find(o => o.id === id);
        if (offer)
            offer.status = status;
        return offer;
    }
    // FPO
    getFPOMembers() { return []; }
    getInventory() { return []; }
    createAggregation(agg) { return agg; }
    // Deliveries
    getDeliveries() { return this.deliveries; }
    updateDeliveryStatus(id, status) {
        const d = this.deliveries.find(d => d.id === id);
        if (d) {
            d.status = status;
            d.statusHistory.push({ status, timestamp: new Date().toISOString() });
        }
        return d;
    }
    // Notifications
    getNotifications() { return this.notifications; }
    markNotificationRead(id) {
        const n = this.notifications.find(n => n.id === id);
        if (n)
            n.isRead = true;
        return n;
    }
    // Reviews & Complaints
    getReviews() { return this.reviews; }
    createReview(r) {
        this.reviews.push(r);
        return r;
    }
    getComplaints() { return this.complaints; }
    createComplaint(c) {
        this.complaints.push(c);
        return c;
    }
    updateComplaintStatus(id, status) {
        const c = this.complaints.find(c => c.id === id);
        if (c)
            c.status = status;
        return c;
    }
    // Data
    getDemandData() { return this.demandRecords; }
    getPriceData() { return this.priceRecords; }
    // Analytics
    getAnalytics() {
        return {
            totalFarmers: this.users.filter(u => u.role === 'farmer').length,
            totalFPOs: this.users.filter(u => u.role === 'fpo').length,
            totalConsumers: this.users.filter(u => u.role === 'consumer').length,
            totalBulkBuyers: this.users.filter(u => u.role === 'bulk_buyer').length,
            activeListings: this.listings.filter(l => l.status === 'active').length,
            activeOrders: this.orders.filter(o => !['delivered', 'cancelled'].includes(o.status)).length,
            completedDeliveries: this.deliveries.filter(d => d.status === 'delivered').length,
            totalTransactions: this.orders.length,
            totalProduceSold: 15000,
            avgFarmerRealization: 85,
            avgOrderValue: 2500,
            avgLogisticsCost: 150,
            avgDeliveryDistance: 45,
            fpoParticipation: 12,
        };
    }
}
export const store = new DataStore();
