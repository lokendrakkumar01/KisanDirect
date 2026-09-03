import { store } from '../data/store.js';

export const getDashboard = (req, res) => {
    const analytics = store.getAnalytics();
    res.json({ success: true, data: analytics });
};

export const getUsers = (req, res) => {
    res.json({ success: true, data: store.getUsers() });
};

export const verifyUser = (req, res) => {
    const user = store.getUserById(req.params.id);
    if (user) {
        user.isVerified = true;
        user.verificationStatus = 'verified';
        return res.json({ success: true, data: user });
    }
    res.status(404).json({ success: false, error: 'Not found' });
};

export const updateUserRole = (req, res) => {
    const { role } = req.body;
    const user = store.updateUserRole(req.params.id, role);
    if (user) {
        return res.json({ success: true, data: user });
    }
    res.status(404).json({ success: false, error: 'User not found' });
};
