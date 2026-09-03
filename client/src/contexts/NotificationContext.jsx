import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getNotifications, markRead } from '../services/notificationService';
import { useAuth } from './AuthContext';
const NotificationContext = createContext(undefined);
export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const { isAuthenticated } = useAuth();
    const fetchNotifications = useCallback(async () => {
        if (!isAuthenticated)
            return;
        try {
            const response = await getNotifications();
            if (response.success && response.data) {
                setNotifications(response.data);
            }
        }
        catch (error) {
            console.error('Failed to fetch notifications', error);
        }
    }, [isAuthenticated]);
    useEffect(() => {
        fetchNotifications();
    }, [fetchNotifications]);
    const markAsRead = async (id) => {
        try {
            await markRead(id);
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
        }
        catch (error) {
            console.error('Failed to mark notification as read', error);
        }
    };
    const markAllRead = async () => {
        try {
            // In a real app we'd have a bulk mark read API endpoint
            const unread = notifications.filter(n => !n.isRead);
            await Promise.all(unread.map(n => markRead(n.id)));
            setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
        }
        catch (error) {
            console.error('Failed to mark all as read', error);
        }
    };
    const unreadCount = notifications.filter(n => !n.isRead).length;
    return (<NotificationContext.Provider value={{
            notifications, unreadCount, fetchNotifications, markAsRead, markAllRead
        }}>
      {children}
    </NotificationContext.Provider>);
};
export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};
