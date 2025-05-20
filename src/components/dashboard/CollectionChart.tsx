
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data - this would come from API in a real app
const data = [
  { name: 'Jan', collected: 4000, pending: 2400 },
  { name: 'Feb', collected: 3000, pending: 1398 },
  { name: 'Mar', collected: 2000, pending: 9800 },
  { name: 'Apr', collected: 2780, pending: 3908 },
  { name: 'May', collected: 1890, pending: 4800 },
  { name: 'Jun', collected: 2390, pending: 3800 },
  { name: 'Jul', collected: 3490, pending: 4300 },
];

const CollectionChart = () => {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Payment Collections</CardTitle>
        <CardDescription>Payment collection trends over time</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="collected" stackId="1" stroke="#0EA5E9" fill="#0EA5E9" fillOpacity={0.6} />
              <Area type="monotone" dataKey="pending" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CollectionChart;
