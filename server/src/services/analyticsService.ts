import { store } from '../data/store';

export const getDashboardAnalytics = (userId: string, role: string) => {
  if (role === 'admin') {
    return store.getAnalytics();
  }
  
  // Mock individual analytics based on role
  if (role === 'farmer') {
    const orders = store.getOrders().filter(o => o.items.some(i => i.sellerId === userId));
    return {
      activeListings: store.getListings().filter(l => l.farmerId === userId && l.status === 'active').length,
      totalOrders: orders.length,
      totalRevenue: orders.reduce((sum, o) => sum + o.subtotal, 0)
    };
  }
  
  return {};
};
