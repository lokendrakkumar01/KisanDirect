import React from 'react';
export function Table({ columns, data, keyExtractor, onRowClick, emptyMessage = 'No data available' }) {
    return (<div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-y border-gray-200">
            {columns.map((col) => (<th key={col.key} className="px-6 py-3 text-sm font-semibold text-gray-600">
                {col.header}
              </th>))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (<tr>
              <td colSpan={columns.length} className="px-6 py-8 text-center text-gray-500">
                {emptyMessage}
              </td>
            </tr>) : (data.map((row) => (<tr key={keyExtractor(row)} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`} onClick={() => onRowClick && onRowClick(row)}>
                {columns.map((col) => (<td key={col.key} className="px-6 py-4 text-sm text-gray-900">
                    {col.render ? col.render(row) : row[col.key]}
                  </td>))}
              </tr>)))}
        </tbody>
      </table>
    </div>);
}
