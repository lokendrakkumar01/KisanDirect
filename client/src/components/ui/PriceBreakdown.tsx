import React from 'react';
import { formatCurrency } from '../../utils/format';

interface PriceBreakdownProps {
  farmerRealization: number;
  logistics: number;
  platformFee: number;
  total: number;
}

export const PriceBreakdown: React.FC<PriceBreakdownProps> = ({ farmerRealization, logistics, platformFee, total }) => {
  const fPct = (farmerRealization / total) * 100;
  const lPct = (logistics / total) * 100;
  const pPct = (platformFee / total) * 100;

  return (
    <div className="w-full">
      <div className="flex h-4 rounded-full overflow-hidden mb-3">
        <div style={{ width: `${fPct}%` }} className="bg-green-500" title="Farmer Realization" />
        <div style={{ width: `${lPct}%` }} className="bg-blue-500" title="Logistics" />
        <div style={{ width: `${pPct}%` }} className="bg-amber-500" title="Platform Fee" />
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span><span className="text-gray-600">Farmer Realization ({fPct.toFixed(0)}%)</span></div>
          <span className="font-semibold">{formatCurrency(farmerRealization)}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span><span className="text-gray-600">Logistics ({lPct.toFixed(0)}%)</span></div>
          <span className="font-semibold">{formatCurrency(logistics)}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-amber-500 mr-2"></span><span className="text-gray-600">Platform Fee ({pPct.toFixed(0)}%)</span></div>
          <span className="font-semibold">{formatCurrency(platformFee)}</span>
        </div>
        <div className="pt-2 border-t border-gray-200 flex justify-between items-center font-bold text-gray-900">
          <span>Total Cost to Buyer</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
};
