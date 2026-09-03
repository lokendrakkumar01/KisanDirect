import React from 'react';
export const Card = ({ children, className = '', hoverable = false, onClick }) => {
    return (<div className={`bg-white rounded-xl border border-gray-200 shadow-sm ${hoverable ? 'hover:shadow-md hover:border-gray-300 transition-all cursor-pointer' : ''} ${className}`} onClick={onClick}>
      {children}
    </div>);
};
export const CardHeader = ({ children, className = '' }) => (<div className={`px-6 py-4 border-b border-gray-100 ${className}`}>
    {children}
  </div>);
export const CardBody = ({ children, className = '' }) => (<div className={`px-6 py-4 ${className}`}>
    {children}
  </div>);
export const CardFooter = ({ children, className = '' }) => (<div className={`px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-xl ${className}`}>
    {children}
  </div>);
export const CardTitle = ({ children, className = '' }) => (<h3 className={`text-lg font-semibold text-gray-900 ${className}`}>{children}</h3>);
export const CardContent = CardBody;
export const StatCard = ({ title, value, icon, trend, className = '' }) => {
    return (<Card className={className}>
      <CardBody>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
          </div>
          {icon && <div className="p-3 bg-green-50 rounded-lg text-green-600">{icon}</div>}
        </div>
        {trend && (<div className="mt-4 flex items-center text-sm">
            <span className={`font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
            </span>
            <span className="ml-2 text-gray-500">vs last month</span>
          </div>)}
      </CardBody>
    </Card>);
};
