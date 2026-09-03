import React from 'react';
import { Bell, Menu, Search, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import { Logo } from './Logo';
import { Badge } from '../ui/Badge';
import { Link } from 'react-router-dom';
export const TopBar = ({ onMenuClick }) => {
    const { user, logout } = useAuth();
    const { unreadCount } = useNotification();
    const roleDisplay = user?.role.replace('_', ' ').toUpperCase() || 'USER';
    return (<header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        <div className="flex items-center">
          <button onClick={onMenuClick} className="text-gray-500 hover:text-gray-900 focus:outline-none lg:hidden mr-4">
            <Menu className="h-6 w-6"/>
          </button>
          <Logo size="sm" className="hidden lg:flex"/>
          <Logo size="sm" className="lg:hidden"/>
        </div>

        <div className="flex-1 px-4 flex justify-end">
          <div className="max-w-md w-full hidden md:block">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400"/>
              </div>
              <input className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm transition duration-150 ease-in-out" placeholder="Search..." type="search"/>
            </div>
          </div>
        </div>

        <div className="flex items-center ml-4 space-x-4">
          <Link to="/notifications" className="relative p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500">
            <span className="sr-only">View notifications</span>
            <Bell className="h-6 w-6"/>
            {unreadCount > 0 && (<span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-white text-xs font-bold text-center leading-4 shadow-sm ring-2 ring-white">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>)}
          </Link>

          <div className="relative flex items-center space-x-3">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-sm font-medium text-gray-900">{user?.name}</span>
              <Badge variant="success">{roleDisplay}</Badge>
            </div>
            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold border border-green-200">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <button onClick={logout} className="p-1 text-gray-400 hover:text-red-500 transition-colors" title="Logout">
              <LogOut className="h-5 w-5"/>
            </button>
          </div>
        </div>
      </div>
    </header>);
};
