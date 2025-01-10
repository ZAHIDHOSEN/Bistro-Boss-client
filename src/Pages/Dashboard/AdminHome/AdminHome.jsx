import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, PieChart, Pie, Sector, ResponsiveContainer, Legend } from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AdminHome = () => {
    const {user} = useAuth();
    const axiosSecure = UseAxiosSecure();

    const {data : stats = []} = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () =>{
            const res = await axiosSecure.get('/admin-stats')
            return res.data;

        }
    })

    const {data: chartData = []} = useQuery({
        queryKey: ['order-stats'],
        queryFn: async () =>{
            const res = await axiosSecure.get('/order-stats');
            return res.data;
        }
    })

    // custom shape for bar chart


    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
      };
      
      const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;
      
        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
      };

    //   custom shape for pie chart

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
     const x = cx + radius * Math.cos(-midAngle * RADIAN);
     const y = cy + radius * Math.sin(-midAngle * RADIAN);

   return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
     </text>
   );
  };

  const PieChartData =  chartData.map(data =>{
    return{name : data.category, value: data.revenue}
  })

    return (
        <div>
            <h3 className="text-2xl">
                <span>Hi, welcome to AdminHome</span>

                {
                    user.displayName ? user.displayName : 'Black'
                }
            </h3>
      <div className="stats shadow">
     <div className="stat place-items-center">
      <div className="stat-title">Revenue</div>
      <div className="stat-value">${stats.revenue}</div>
      <div className="stat-desc">From January 1st to February 1st</div>
    </div>

     <div className="stat place-items-center">
      <div className="stat-title">Users</div>
      <div className="stat-value text-secondary">{stats.users}</div>
      <div className="stat-desc text-secondary">↗︎ 40 (2%)</div>
    </div>

      <div className="stat place-items-center">
       <div className="stat-title">Orders</div>
       <div className="stat-value">{stats.orders}</div>
       <div className="stat-desc">↘︎ 90 (14%)</div>
      </div>
      <div className="stat place-items-center">
       <div className="stat-title">Menu Item</div>
       <div className="stat-value">{stats.menuItems}</div>
       <div className="stat-desc">↘︎ 90 (14%)</div>
      </div>
   </div>

   <div className='flex'>
    <div className='w-1/2'>

    <BarChart
      width={500}
      height={300}
      data={chartData}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="category" />
      <YAxis />
      <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
        {chartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 6]} />
        ))}
      </Bar>
     </BarChart>
    </div>
    <div className='w-1/2'>
      <PieChart width={400} height={400}>
          <Pie
            data={PieChartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {PieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend></Legend>
         </PieChart>
    </div>
    

   </div>

            
        </div>
    );
};

export default AdminHome;