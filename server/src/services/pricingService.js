export const calculatePriceBreakdown = (subtotal, distance = 0) => {
    // Base logistics cost is 50 INR + 10 INR per km
    const logisticsCost = distance > 0 ? 50 + (distance * 10) : 100;
    // Platform fee is 5% of subtotal
    const platformFee = subtotal * 0.05;
    const total = subtotal + logisticsCost + platformFee;
    return {
        subtotal,
        logisticsCost,
        platformFee,
        total
    };
};
