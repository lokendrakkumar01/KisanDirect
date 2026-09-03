import { store } from '../data/store.js';
export const getNotifications = (req, res) => {
    const notifs = store.getNotifications().filter(n => n.userId === req.user.id);
    res.json({ success: true, data: notifs });
};
export const markRead = (req, res) => {
    const n = store.markNotificationRead(req.params.id);
    res.json({ success: true, data: n });
};
