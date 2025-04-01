import React from "react";
interface AnomalyProps {
  anomalies: { ds: string; y: number }[];
}

export default function Anomaly({ anomalies }: AnomalyProps) {
    return (
      <div className="mt-6 p-4 border rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">Anomalies Detected</h2>
        {anomalies.length === 0 ? (
          <p className="text-gray-500">No anomalies detected.</p>
        ) : (
          <table className="w-full mt-4 border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Date</th>
                <th className="border p-2">Cost</th>
              </tr>
            </thead>
            <tbody>
              {anomalies.map((anomaly, index) => (
                <tr key={index} className="text-center">
                  <td className="border p-2">{anomaly.ds}</td>
                  <td className="border p-2 text-red-500">${anomaly.y.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
  