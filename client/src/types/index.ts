// ============================================================
// KisanDirect — Shared Type Definitions
// ============================================================

// --- User & Auth ---
export type UserRole = 'farmer' | 'fpo' | 'consumer' | 'bulk_buyer' | 'logistics' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  isVerified: boolean;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  location?: Location;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
  location?: Location;
}

// --- Location ---
export interface Location {
  address: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  lat: number;
  lng: number;
}

// --- Farmer ---
export interface FarmerProfile {
  id: string;
  userId: string;
  farmName: string;
  farmSize: string;
  farmSizeUnit: string;
  crops: string[];
  organic: boolean;
  description?: string;
  rating: number;
  totalReviews: number;
  completedOrders: number;
  totalEarnings: number;
  location: Location;
}

export interface Harvest {
  id: string;
  crop: string;
  expectedDate: string;
  estimatedQuantity: number;
  unit: string;
  status: 'upcoming' | 'ready' | 'harvested';
}

// --- Products / Listings ---
export type ProductCategory = 'vegetables' | 'fruits' | 'grains' | 'pulses' | 'spices' | 'dairy' | 'other';
export type QualityGrade = 'A' | 'B' | 'C';

export interface CropListing {
  id: string;
  farmerId: string;
  farmerName: string;
  farmName: string;
  fpoId?: string;
  fpoName?: string;
  productName: string;
  category: ProductCategory;
  description: string;
  quantity: number;
  availableQuantity: number;
  unit: string;
  price: number;
  minOrderQuantity: number;
  qualityGrade: QualityGrade;
  organic: boolean;
  harvestDate: string;
  availableFrom: string;
  images: string[];
  location: Location;
  rating: number;
  totalReviews: number;
  sellerType: 'farmer' | 'fpo';
  status: 'active' | 'sold_out' | 'expired' | 'draft';
  createdAt: string;
  updatedAt: string;
}

export interface CreateListingRequest {
  productName: string;
  category: ProductCategory;
  description: string;
  quantity: number;
  unit: string;
  price: number;
  minOrderQuantity: number;
  qualityGrade: QualityGrade;
  organic: boolean;
  harvestDate: string;
  availableFrom: string;
  images: string[];
}

// --- Orders ---
export type OrderStatus = 'confirmed' | 'pickup_scheduled' | 'picked_up' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'processing' | 'successful' | 'failed' | 'refunded';

export interface Order {
  id: string;
  orderNumber: string;
  buyerId: string;
  buyerName: string;
  buyerType: 'consumer' | 'bulk_buyer';
  items: OrderItem[];
  subtotal: number;
  logisticsCost: number;
  platformFee: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  deliveryAddress: Location;
  estimatedDelivery?: string;
  actualDelivery?: string;
  deliveryId?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  listingId: string;
  productName: string;
  sellerId: string;
  sellerName: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  subtotal: number;
}

// --- Cart ---
export interface CartItem {
  listingId: string;
  listing: CropListing;
  quantity: number;
}

// --- Bulk Buyer ---
export interface BuyerProfile {
  id: string;
  userId: string;
  businessName: string;
  businessType: 'restaurant' | 'hotel' | 'supermarket' | 'retailer' | 'food_processor' | 'institution';
  gstNumber?: string;
  rating: number;
  totalReviews: number;
  completedOrders: number;
  totalSpend: number;
  location: Location;
}

export interface BulkRequirement {
  id: string;
  buyerId: string;
  buyerName: string;
  businessName: string;
  productName: string;
  category: ProductCategory;
  requiredQuantity: number;
  unit: string;
  maxBudget: number;
  requiredDate: string;
  deliveryLocation: Location;
  qualityRequirement: QualityGrade;
  notes?: string;
  status: 'active' | 'matched' | 'fulfilled' | 'expired' | 'cancelled';
  matchedOffers: number;
  createdAt: string;
}

export interface Offer {
  id: string;
  offerNumber: string;
  requirementId: string;
  sellerId: string;
  sellerName: string;
  sellerType: 'farmer' | 'fpo';
  productName: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  totalPrice: number;
  distance: number;
  estimatedDelivery: string;
  matchScore: number;
  matchReasons: MatchReason[];
  status: 'pending' | 'accepted' | 'rejected' | 'negotiating' | 'expired';
  createdAt: string;
}

export interface MatchReason {
  factor: string;
  status: 'pass' | 'partial' | 'fail';
  detail: string;
}

// --- FPO ---
export interface FPOProfile {
  id: string;
  userId: string;
  fpoName: string;
  registrationNumber: string;
  totalMembers: number;
  rating: number;
  totalReviews: number;
  completedOrders: number;
  totalRevenue: number;
  location: Location;
}

export interface FPOMember {
  id: string;
  fpoId: string;
  farmerId: string;
  farmerName: string;
  location: Location;
  crops: string[];
  joinedDate: string;
  status: 'active' | 'inactive';
  contributedQuantity: number;
}

export interface AggregatedListing {
  id: string;
  fpoId: string;
  fpoName: string;
  productName: string;
  contributions: AggregationContribution[];
  totalQuantity: number;
  unit: string;
  price: number;
  qualityGrade: QualityGrade;
  status: 'aggregating' | 'listed' | 'sold';
}

export interface AggregationContribution {
  farmerId: string;
  farmerName: string;
  quantity: number;
}

// --- Logistics ---
export interface Delivery {
  id: string;
  orderId: string;
  orderNumber: string;
  pickupLocation: Location;
  deliveryLocation: Location;
  productName: string;
  quantity: number;
  unit: string;
  vehicleId?: string;
  vehicleName?: string;
  driverId?: string;
  driverName?: string;
  distance: number;
  estimatedTime: string;
  estimatedCost: number;
  status: OrderStatus;
  statusHistory: StatusUpdate[];
  createdAt: string;
}

export interface StatusUpdate {
  status: OrderStatus;
  timestamp: string;
  note?: string;
}

export interface Vehicle {
  id: string;
  name: string;
  type: 'mini_truck' | 'truck' | 'van' | 'tempo';
  capacity: number;
  capacityUnit: string;
  registrationNumber: string;
  status: 'available' | 'in_use' | 'maintenance';
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  licenseNumber: string;
  vehicleId?: string;
  status: 'available' | 'on_delivery' | 'off_duty';
  rating: number;
  completedDeliveries: number;
}

// --- Route Optimization ---
export interface RoutePoint {
  id: string;
  name: string;
  type: 'pickup' | 'delivery' | 'depot';
  lat: number;
  lng: number;
  quantity: number;
  orderId?: string;
}

export interface OptimizedRoute {
  id: string;
  stops: RouteStop[];
  totalDistance: number;
  estimatedTime: number;
  estimatedCost: number;
  distanceSaved: number;
  distanceBefore: number;
  vehicleCapacity: number;
}

export interface RouteStop {
  index: number;
  point: RoutePoint;
  arrivalDistance: number;
  cumulativeDistance: number;
  loadAfterStop: number;
}

// --- AI ---
export interface DemandForecast {
  crop: string;
  location: string;
  predictions: DailyPrediction[];
  trend: 'increasing' | 'stable' | 'decreasing';
  confidence: number;
  recommendation: string;
  isPrototype: boolean;
}

export interface DailyPrediction {
  date: string;
  day: string;
  predictedDemand: number;
  unit: string;
}

export interface PriceIntelligence {
  crop: string;
  location: string;
  suggestedMin: number;
  suggestedMax: number;
  recommendedReference: number;
  factors: PriceFactor[];
  isPrototype: boolean;
}

export interface PriceFactor {
  name: string;
  value: string;
  impact: 'positive' | 'negative' | 'neutral';
}

export interface MarketInsight {
  crop: string;
  expectedDemand: number;
  currentSupply: number;
  demandSupplyGap: number;
  trend: string;
  trendPercentage: number;
  recommendation: string;
  isPrototype: boolean;
}

// --- Notifications ---
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'order' | 'delivery' | 'price' | 'demand' | 'match' | 'review' | 'system' | 'alert';
  isRead: boolean;
  link?: string;
  createdAt: string;
}

// --- Reviews ---
export interface Review {
  id: string;
  orderId: string;
  reviewerId: string;
  reviewerName: string;
  revieweeId: string;
  revieweeName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// --- Complaints ---
export type ComplaintStatus = 'open' | 'in_review' | 'resolved' | 'closed';
export type ComplaintPriority = 'low' | 'medium' | 'high' | 'critical';

export interface Complaint {
  id: string;
  complaintNumber: string;
  userId: string;
  userName: string;
  orderId?: string;
  category: string;
  description: string;
  priority: ComplaintPriority;
  status: ComplaintStatus;
  resolution?: string;
  createdAt: string;
  updatedAt: string;
}

// --- Payments ---
export interface Payment {
  id: string;
  transactionId: string;
  orderId: string;
  amount: number;
  method: 'demo_payment' | 'cash_offline' | 'upi' | 'bank_transfer';
  status: PaymentStatus;
  paidAt?: string;
  createdAt: string;
}

// --- Analytics ---
export interface PlatformAnalytics {
  totalFarmers: number;
  totalFPOs: number;
  totalConsumers: number;
  totalBulkBuyers: number;
  activeListings: number;
  activeOrders: number;
  completedDeliveries: number;
  totalTransactions: number;
  totalProduceSold: number;
  avgFarmerRealization: number;
  avgOrderValue: number;
  avgLogisticsCost: number;
  avgDeliveryDistance: number;
  fpoParticipation: number;
}

export interface ImpactMetrics {
  directTransactions: number;
  produceTraded: number;
  produceTradedUnit: string;
  logisticsDistanceSaved: number;
  deliveryCostReduction: number;
  fpoParticipation: number;
  isPrototypeSimulation: boolean;
}

// --- Demand Data ---
export interface DemandRecord {
  id: string;
  date: string;
  crop: string;
  location: string;
  quantitySold: number;
  price: number;
  season: string;
  month: number;
  day: number;
  supply: number;
}

// --- Price Data ---
export interface PriceRecord {
  id: string;
  date: string;
  crop: string;
  location: string;
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
  volume: number;
}

// --- API Response ---
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// --- Search / Filter ---
export interface MarketplaceFilters {
  search?: string;
  category?: ProductCategory;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  minQuantity?: number;
  qualityGrade?: QualityGrade;
  sellerType?: 'farmer' | 'fpo';
  organic?: boolean;
  sortBy?: 'price_asc' | 'price_desc' | 'nearest' | 'rating' | 'recent';
  page?: number;
  limit?: number;
}
