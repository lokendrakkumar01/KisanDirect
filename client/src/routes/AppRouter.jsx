import React, { Suspense } from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { LoadingPage } from '../components/ui/LoadingSpinner';
import { useAuth, getRoleDashboardPath } from '../contexts/AuthContext';
// Public & Auth Pages
import { LandingPage } from '../pages/public/LandingPage';
import { MarketplacePage } from '../pages/public/MarketplacePage';
import { ProductDetailPage } from '../pages/public/ProductDetailPage';
import { HowItWorksPage } from '../pages/public/HowItWorksPage';
import { AboutPage } from '../pages/public/AboutPage';
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';
// Farmer Pages
import { FarmerDashboard } from '../pages/farmer/FarmerDashboard';
import { MyListings } from '../pages/farmer/MyListings';
import { AddProduce } from '../pages/farmer/AddProduce';
import { FarmerOrders } from '../pages/farmer/FarmerOrders';
import { FarmerEarnings } from '../pages/farmer/FarmerEarnings';
import { AIInsights } from '../pages/farmer/AIInsights';
import { FarmerProfile } from '../pages/farmer/FarmerProfile';
// Consumer Pages
import { ConsumerDashboard } from '../pages/consumer/ConsumerDashboard';
import { CartPage } from '../pages/consumer/CartPage';
import { CheckoutPage } from '../pages/consumer/CheckoutPage';
import { ConsumerOrders } from '../pages/consumer/ConsumerOrders';
import { TrackingPage } from '../pages/consumer/TrackingPage';
// Bulk Buyer Pages
import BuyerDashboard from '../pages/buyer/BuyerDashboard';
import FindProduce from '../pages/buyer/FindProduce';
import PostRequirement from '../pages/buyer/PostRequirement';
import OffersPage from '../pages/buyer/OffersPage';
import BulkOrders from '../pages/buyer/BulkOrders';
import BuyerAnalytics from '../pages/buyer/BuyerAnalytics';
// FPO Pages
import FPODashboard from '../pages/fpo/FPODashboard';
import MembersPage from '../pages/fpo/MembersPage';
import AggregationPage from '../pages/fpo/AggregationPage';
import FPOInventory from '../pages/fpo/FPOInventory';
import FPOOrders from '../pages/fpo/FPOOrders';
import FPOAnalytics from '../pages/fpo/FPOAnalytics';
// Logistics Pages
import LogisticsDashboard from '../pages/logistics/LogisticsDashboard';
import DeliveriesPage from '../pages/logistics/DeliveriesPage';
import RouteOptimization from '../pages/logistics/RouteOptimization';
import LogisticsMap from '../pages/logistics/LogisticsMap';
import VehiclesPage from '../pages/logistics/VehiclesPage';
import DriversPage from '../pages/logistics/DriversPage';
// Admin Pages
import AdminDashboard from '../pages/admin/AdminDashboard';
import UserManagement from '../pages/admin/UserManagement';
import AdminOrders from '../pages/admin/AdminOrders';
import AdminAnalytics from '../pages/admin/AdminAnalytics';
import Complaints from '../pages/admin/Complaints';
import ImpactDashboard from '../pages/admin/ImpactDashboard';
// Shared Pages
import NotificationsPage from '../pages/shared/NotificationsPage';
import ReviewsPage from '../pages/shared/ReviewsPage';
const PublicLayoutWrapper = () => (<Outlet />);
const DashboardLayoutWrapper = () => (<DashboardLayout>
    <Outlet />
  </DashboardLayout>);
const DashboardRedirect = () => {
    const { user } = useAuth();
    return <Navigate to={getRoleDashboardPath(user?.role)} replace/>;
};
export const AppRouter = () => {
    return (<Suspense fallback={<LoadingPage />}>
      <Routes>
        {/* Dashboard Redirect */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardRedirect /></ProtectedRoute>}/>

        {/* Public Routes */}
        <Route element={<PublicLayoutWrapper />}>
          <Route path="/" element={<LandingPage />}/>
          <Route path="/marketplace" element={<MarketplacePage />}/>
          <Route path="/marketplace/:id" element={<ProductDetailPage />}/>
          <Route path="/how-it-works" element={<HowItWorksPage />}/>
          <Route path="/about" element={<AboutPage />}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/register" element={<RegisterPage />}/>
        </Route>

        {/* Farmer Routes */}
        <Route element={<ProtectedRoute allowedRoles={['farmer']}><DashboardLayoutWrapper /></ProtectedRoute>}>
          <Route path="/farmer/dashboard" element={<FarmerDashboard />}/>
          <Route path="/farmer/listings" element={<MyListings />}/>
          <Route path="/farmer/listings/new" element={<AddProduce />}/>
          <Route path="/farmer/orders" element={<FarmerOrders />}/>
          <Route path="/farmer/earnings" element={<FarmerEarnings />}/>
          <Route path="/farmer/insights" element={<AIInsights />}/>
          <Route path="/farmer/profile" element={<FarmerProfile />}/>
        </Route>

        {/* Consumer Routes */}
        <Route element={<ProtectedRoute allowedRoles={['consumer']}><DashboardLayoutWrapper /></ProtectedRoute>}>
          <Route path="/consumer/dashboard" element={<ConsumerDashboard />}/>
          <Route path="/consumer/cart" element={<CartPage />}/>
          <Route path="/consumer/checkout" element={<CheckoutPage />}/>
          <Route path="/consumer/orders" element={<ConsumerOrders />}/>
          <Route path="/consumer/orders/:id" element={<ConsumerOrders />}/>
          <Route path="/consumer/tracking/:id" element={<TrackingPage />}/>
        </Route>

        {/* Bulk Buyer Routes */}
        <Route element={<ProtectedRoute allowedRoles={['bulk_buyer']}><DashboardLayoutWrapper /></ProtectedRoute>}>
          <Route path="/buyer/dashboard" element={<BuyerDashboard />}/>
          <Route path="/buyer/find" element={<FindProduce />}/>
          <Route path="/buyer/requirements/new" element={<PostRequirement />}/>
          <Route path="/buyer/offers" element={<OffersPage />}/>
          <Route path="/buyer/orders" element={<BulkOrders />}/>
          <Route path="/buyer/analytics" element={<BuyerAnalytics />}/>
        </Route>

        {/* FPO Routes */}
        <Route element={<ProtectedRoute allowedRoles={['fpo']}><DashboardLayoutWrapper /></ProtectedRoute>}>
          <Route path="/fpo/dashboard" element={<FPODashboard />}/>
          <Route path="/fpo/members" element={<MembersPage />}/>
          <Route path="/fpo/aggregation" element={<AggregationPage />}/>
          <Route path="/fpo/inventory" element={<FPOInventory />}/>
          <Route path="/fpo/orders" element={<FPOOrders />}/>
          <Route path="/fpo/analytics" element={<FPOAnalytics />}/>
        </Route>

        {/* Logistics Routes */}
        <Route element={<ProtectedRoute allowedRoles={['logistics']}><DashboardLayoutWrapper /></ProtectedRoute>}>
          <Route path="/logistics/dashboard" element={<LogisticsDashboard />}/>
          <Route path="/logistics/deliveries" element={<DeliveriesPage />}/>
          <Route path="/logistics/routes" element={<RouteOptimization />}/>
          <Route path="/logistics/map" element={<LogisticsMap />}/>
          <Route path="/logistics/vehicles" element={<VehiclesPage />}/>
          <Route path="/logistics/drivers" element={<DriversPage />}/>
        </Route>

        {/* Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']}><DashboardLayoutWrapper /></ProtectedRoute>}>
          <Route path="/admin/dashboard" element={<AdminDashboard />}/>
          <Route path="/admin/users" element={<UserManagement />}/>
          <Route path="/admin/orders" element={<AdminOrders />}/>
          <Route path="/admin/analytics" element={<AdminAnalytics />}/>
          <Route path="/admin/complaints" element={<Complaints />}/>
          <Route path="/admin/impact" element={<ImpactDashboard />}/>
        </Route>

        {/* Shared Routes */}
        <Route element={<ProtectedRoute><DashboardLayoutWrapper /></ProtectedRoute>}>
          <Route path="/notifications" element={<NotificationsPage />}/>
          <Route path="/reviews" element={<ReviewsPage />}/>
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
              <p className="text-xl text-gray-600 mb-8">Page not found</p>
              <a href="/" className="btn-primary">Go Home</a>
            </div>
          </div>}/>
      </Routes>
    </Suspense>);
};
