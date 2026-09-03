import React from 'react';
import { Check, Clock } from 'lucide-react';
import { OrderStatus } from '../../types';
import { formatDate } from '../../utils/format';

interface StatusTimelineProps {
  currentStatus: OrderStatus;
  history?: { status: OrderStatus; timestamp: string; note?: string }[];
}

const statusMap: Record<OrderStatus, string> = {
  confirmed: 'Order Confirmed',
  pickup_scheduled: 'Pickup Scheduled',
  picked_up: 'Picked Up',
  in_transit: 'In Transit',
  out_for_delivery: 'Out for Delivery',
  delivered: 'Delivered',
  cancelled: 'Cancelled'
};

const statusOrder: OrderStatus[] = [
  'confirmed', 'pickup_scheduled', 'picked_up', 'in_transit', 'out_for_delivery', 'delivered'
];

export const StatusTimeline: React.FC<StatusTimelineProps> = ({ currentStatus, history = [] }) => {
  if (currentStatus === 'cancelled') {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-100">
        This order has been cancelled.
      </div>
    );
  }

  const currentIndex = statusOrder.indexOf(currentStatus);

  return (
    <div className="relative pl-4 border-l-2 border-gray-200 space-y-6">
      {statusOrder.map((status, index) => {
        const isCompleted = index <= currentIndex;
        const isCurrent = index === currentIndex;
        const historyItem = history.find(h => h.status === status);

        return (
          <div key={status} className="relative">
            <div className={`absolute -left-[23px] p-1 rounded-full ${
              isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'
            }`}>
              {isCompleted ? <Check className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
            </div>
            <div>
              <h4 className={`text-sm font-semibold ${isCompleted ? 'text-gray-900' : 'text-gray-500'}`}>
                {statusMap[status]}
              </h4>
              {historyItem && (
                <>
                  <p className="text-xs text-gray-500 mt-1">{formatDate(historyItem.timestamp)}</p>
                  {historyItem.note && <p className="text-sm text-gray-600 mt-1">{historyItem.note}</p>}
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
