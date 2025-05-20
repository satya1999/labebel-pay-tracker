
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data for the chart
const data = [
  { month: 'Jan', collected: 35000, pending: 15000 },
  { month: 'Feb', collected: 42000, pending: 18000 },
  { month: 'Mar', collected: 28000, pending: 12000 },
  { month: 'Apr', collected: 45000, pending: 10000 },
  { month: 'May', collected: 56000, pending: 24000 },
  { month: 'Jun', collected: 78000, pending: 32000 },
];

const CollectionChart = () => {
  return (
    <Card className="col-span-7 md:col-span-4">
      <CardHeader>
        <CardTitle>Payment Collections</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis 
                tickFormatter={(value) => `₹${value/1000}k`} 
                width={60}
              />
              <Tooltip 
                formatter={(value) => [`₹${value}`, '']}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Bar name="Collected" dataKey="collected" stackId="a" fill="#8884d8" radius={[4, 4, 0, 0]} />
              <Bar name="Pending" dataKey="pending" stackId="a" fill="#ffc658" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CollectionChart;
