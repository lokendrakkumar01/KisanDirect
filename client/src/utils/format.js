export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
};
export const formatNumber = (num) => {
    return new Intl.NumberFormat('en-IN').format(num);
};
export const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    }).format(date);
};
export const formatDistance = (km) => {
    return `${km.toFixed(1)} KM`;
};
export const formatQuantity = (qty, unit) => {
    return `${qty} ${unit.toUpperCase()}`;
};
export const getTimeAgo = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (seconds < 60)
        return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60)
        return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24)
        return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30)
        return `${days}d ago`;
    const months = Math.floor(days / 30);
    if (months < 12)
        return `${months}mo ago`;
    const years = Math.floor(months / 12);
    return `${years}y ago`;
};
export const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
        case 'confirmed':
        case 'active':
        case 'successful':
        case 'verified':
        case 'resolved':
            return 'badge-green';
        case 'pending':
        case 'processing':
        case 'in_transit':
        case 'out_for_delivery':
        case 'in_review':
            return 'badge-yellow';
        case 'cancelled':
        case 'failed':
        case 'rejected':
        case 'closed':
        case 'critical':
            return 'badge-red';
        case 'delivered':
        case 'fulfilled':
        case 'picked_up':
            return 'badge-blue';
        default:
            return 'badge-gray';
    }
};
export const getGradeLabel = (grade) => {
    switch (grade.toUpperCase()) {
        case 'A': return 'Premium Quality';
        case 'B': return 'Standard Quality';
        case 'C': return 'Processing Quality';
        default: return 'Unknown Grade';
    }
};
