import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, ShoppingBag, List, ClipboardList, PieChart, User, Settings, Users, Truck, MessageSquare, Map } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
export const Sidebar = ({ isOpen, onClose }) => {
    const { user } = useAuth();
    if (!user)
        return null;
    const roleMenus = {
        farmer: [
            { name: 'Dashboard', path: '/farmer/dashboard', icon: Home },
            { name: 'My Listings', path: '/farmer/listings', icon: List },
            { name: 'Orders', path: '/farmer/orders', icon: ClipboardList },
            { name: 'Earnings', path: '/farmer/earnings', icon: PieChart },
            { name: 'AI Insights', path: '/farmer/insights', icon: TrendingUpIcon },
            { name: 'Profile', path: '/farmer/profile', icon: User },
        ],
        consumer: [
            { name: 'Dashboard', path: '/consumer/dashboard', icon: Home },
            { name: 'My Orders', path: '/consumer/orders', icon: ShoppingBag },
        ],
        bulk_buyer: [
            { name: 'Dashboard', path: '/buyer/dashboard', icon: Home },
            { name: 'Find Produce', path: '/buyer/find', icon: SearchIcon },
            { name: 'My Offers', path: '/buyer/offers', icon: MessageSquare },
            { name: 'Orders', path: '/buyer/orders', icon: ClipboardList },
            { name: 'Analytics', path: '/buyer/analytics', icon: PieChart },
        ],
        fpo: [
            { name: 'Dashboard', path: '/fpo/dashboard', icon: Home },
            { name: 'Members', path: '/fpo/members', icon: Users },
            { name: 'Aggregation', path: '/fpo/aggregation', icon: List },
            { name: 'Inventory', path: '/fpo/inventory', icon: ClipboardList },
            { name: 'Orders', path: '/fpo/orders', icon: ShoppingBag },
            { name: 'Analytics', path: '/fpo/analytics', icon: PieChart },
        ],
        logistics: [
            { name: 'Dashboard', path: '/logistics/dashboard', icon: Home },
            { name: 'Driver Partner Portal 🚚', path: '/logistics/driver-partner', icon: Truck },
            { name: 'Deliveries', path: '/logistics/deliveries', icon: ClipboardList },
            { name: 'Routes Map', path: '/logistics/map', icon: Map },
            { name: 'Vehicles', path: '/logistics/vehicles', icon: Settings },
            { name: 'Drivers Roster', path: '/logistics/drivers', icon: Users },
        ],
        admin: [
            { name: 'Dashboard', path: '/admin/dashboard', icon: Home },
            { name: 'Users', path: '/admin/users', icon: Users },
            { name: 'Orders', path: '/admin/orders', icon: ClipboardList },
            { name: 'Analytics', path: '/admin/analytics', icon: PieChart },
            { name: 'Complaints', path: '/admin/complaints', icon: MessageSquare },
            { name: 'Impact', path: '/admin/impact', icon: TrendingUpIcon },
        ],
    };
    const menuItems = roleMenus[user.role] || [];
    return (<>
      <div className={`fixed inset-0 bg-gray-900 bg-opacity-50 z-20 lg:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose}/>
      <aside className={`fixed inset-y-0 left-0 bg-white dark:bg-emerald-950/95 w-64 border-r border-gray-200 dark:border-emerald-800/80 z-30 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col">
          <div className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
            const Icon = item.icon;
            return (<NavLink key={item.path} to={item.path} className={({ isActive }) => `flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-150 ${isActive
                    ? 'bg-emerald-100 dark:bg-emerald-800/90 text-emerald-950 dark:text-emerald-100 font-extrabold shadow-2xs'
                    : 'text-gray-700 dark:text-emerald-200 hover:bg-gray-100 dark:hover:bg-emerald-900/60 hover:text-emerald-900 dark:hover:text-emerald-100'}`} onClick={() => window.innerWidth < 1024 && onClose()}>
                  <Icon className="mr-3 flex-shrink-0 h-5 w-5"/>
                  {item.name}
                </NavLink>);
        })}
          </div>
          <div className="p-4 border-t border-gray-200 dark:border-emerald-800/80">
            <NavLink to="/settings" className={({ isActive }) => `flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-150 ${isActive ? 'bg-emerald-100 dark:bg-emerald-800/90 text-emerald-950 dark:text-emerald-100 font-extrabold' : 'text-gray-700 dark:text-emerald-200 hover:bg-gray-100 dark:hover:bg-emerald-900/60 hover:text-emerald-900 dark:hover:text-emerald-100'}`}>
              <Settings className="mr-3 flex-shrink-0 h-5 w-5"/>
              Settings
            </NavLink>
          </div>
        </div>
      </aside>
    </>);
};
// Simple stand-in icons if missing from lucide standard imports above
const TrendingUpIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>;
const SearchIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
