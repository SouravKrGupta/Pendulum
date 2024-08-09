import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface GraphProps {
  energyData: { mechanical: number; kinetic: number; potential: number };
  pendulumData: { color: string; energy: { mechanical: number; kinetic: number; potential: number } }[];
}

const Graph: React.FC<GraphProps> = ({ energyData, pendulumData }) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  // Filter data based on the selected color
  const filteredData = pendulumData
    .filter(pendulum => selectedColor === null || pendulum.color === selectedColor)
    .map(pendulum => ({
      name: pendulum.color,
      Mechanical: pendulum.energy.mechanical,
      Kinetic: pendulum.energy.kinetic,
      Potential: pendulum.energy.potential,
    }));

  return (
    <div className="w-96 h-[500px] flex flex-col items-center border border-gray-300 rounded-lg p-4 mt-5">
      <h1 className="text-2xl font-bold mb-4">Energy Graph</h1>

      <div className="flex gap-2 mb-4">
        <button
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={() => setSelectedColor('red')}
        >
          Red Bob
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setSelectedColor('blue')}
        >
          Blue Bob
        </button>
      </div>

      <ResponsiveContainer width="100%" height="70%">
        <BarChart
          data={filteredData}
          margin={{
            top: 20, right: 30, left: 20, bottom: 5,
          }}
          barCategoryGap="30%"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Mechanical" fill="#ff00ff" />
          <Bar dataKey="Kinetic" fill="#0000ff" />
          <Bar dataKey="Potential" fill="#ff0000" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Graph;
