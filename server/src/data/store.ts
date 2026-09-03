import { User, FarmerProfile, FPOProfile, BuyerProfile, CropListing, Order, BulkRequirement, Offer, Delivery, DemandRecord, PriceRecord, Notification, Review, Complaint } from '../types';
import * as seedData from './seed';

class DataStore {
  public users: User[] = [...seedData.users];
  public userPasswords: Record<string, string> = { ...seedData.userPasswords };
  public farmerProfiles: FarmerProfile[] = [...seedData.farmerProfiles];
  public fpoProfiles: FPOProfile[] = [...seedData.fpoProfiles];
  public buyerProfiles: BuyerProfile[] = [...seedData.buyerProfiles];
  public listings: CropListing[] = [...seedData.listings];
  public bulkRequirements: BulkRequirement[] = [...seedData.bulkRequirements];
  public offers: Offer[] = [...seedData.offers];
  public orders: Order[] = [...seedData.orders];
  public deliveries: Delivery[] = [...seedData.deliveries];
  public demandRecords: DemandRecord[] = [...seedData.demandRecords];
  public priceRecords: PriceRecord[] = [...seedData.priceRecords];
  public notifications: Notification[] = [...seedData.notifications];
  public reviews: Review[] = [...seedData.reviews];
  public complaints: Complaint[] = [...seedData.complaints];

  // Users
  getUsers() { return this.users; }
  getUserById(id: string) { return this.users.find(u => u.id === id); }
  getUserByEmail(email: string) { return this.users.find(u => u.email === email); }
  createUser(user: User, passwordHash: string) {
    this.users.push(user);
    this.userPasswords[user.email] = passwordHash;
    return user;
  }
  
  // Listings
  getListings() { return this.listings; }
  getListingById(id: string) { return this.listings.find(l => l.id === id); }
  createListing(listing: CropListing) {
    this.listings.push(listing);
    return listing;
  }
  updateListing(id: string, updates: Partial<CropListing>) {
    const idx = this.listings.findIndex(l => l.id === id);
    if (idx !== -1) {
      this.listings[idx] = { ...this.listings[idx], ...updates, updatedAt: new Date().toISOString() };
      return this.listings[idx];
    }
    return null;
  }
  deleteListing(id: string) {
    const idx = this.listings.findIndex(l => l.id === id);
    if (idx !== -1) {
      this.listings.splice(idx, 1);
      return true;
    }
    return false;
  }

  // Orders
  getOrders() { return this.orders; }
  getOrderById(id: string) { return this.orders.find(o => o.id === id); }
  getOrdersByUser(userId: string) { return this.orders.filter(o => o.buyerId === userId); }
  createOrder(order: Order) {
    this.orders.push(order);
    return order;
  }
  updateOrderStatus(id: string, status: any) {
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
  createBulkRequirement(req: BulkRequirement) {
    this.bulkRequirements.push(req);
    return req;
  }
  getOffers() { return this.offers; }
  createOffer(offer: Offer) {
    this.offers.push(offer);
    return offer;
  }
  updateOfferStatus(id: string, status: any) {
    const offer = this.offers.find(o => o.id === id);
    if (offer) offer.status = status;
    return offer;
  }

  // FPO
  getFPOMembers() { return []; }
  getInventory() { return []; }
  createAggregation(agg: any) { return agg; }

  // Deliveries
  getDeliveries() { return this.deliveries; }
  updateDeliveryStatus(id: string, status: any) {
    const d = this.deliveries.find(d => d.id === id);
    if (d) {
      d.status = status;
      d.statusHistory.push({ status, timestamp: new Date().toISOString() });
    }
    return d;
  }

  // Notifications
  getNotifications() { return this.notifications; }
  markNotificationRead(id: string) {
    const n = this.notifications.find(n => n.id === id);
    if (n) n.isRead = true;
    return n;
  }

  // Reviews & Complaints
  getReviews() { return this.reviews; }
  createReview(r: Review) {
    this.reviews.push(r);
    return r;
  }
  getComplaints() { return this.complaints; }
  createComplaint(c: Complaint) {
    this.complaints.push(c);
    return c;
  }
  updateComplaintStatus(id: string, status: any) {
    const c = this.complaints.find(c => c.id === id);
    if (c) c.status = status;
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
