import React from 'react';

export default function ChangesTable({ data = [] }) {
  if (!data || data.length === 0) {
    return null;
  }

  const headers = Object.keys(data[0]).filter((h) => h !== 'type' && h !== 'status');

  return (
    <div className="w-full max-w-6xl mt-8 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 border">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((record, idx) => {
            let rowClass = ''
            if (record.status === 'added') rowClass = 'bg-green-100'
            else if (record.status === 'removed') rowClass = 'bg-red-100'

            return (
              <tr key={idx} className={rowClass}>
                {headers.map((h) => {
                  const val = record[h]
                  if (h === 'link' && val) {
                    return (
                      <td key={h} className="px-4 py-2 text-sm text-blue-600">
                        <a href={val} target="_blank" rel="noopener noreferrer">
                          {val}
                        </a>
                      </td>
                    )
                  }

                  return (
                    <td key={h} className="px-4 py-2 text-sm text-gray-900">
                      {val ?? ''}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
