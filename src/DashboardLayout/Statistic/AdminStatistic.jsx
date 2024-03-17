import { useState } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';

export const AdminStatistic = ({ data }) => {
  const data2 = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];

  const pieData = data[0]
  console.log(pieData)
  const [activeIndex, setactiveIndex] = useState(0)
  const onPieEnter = (_, index) => {
    setactiveIndex(index)
  };
  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, totalQuantity } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.category}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`total ${totalQuantity} product`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  }

  // console.log(data)
  return (
    <div className='container mx-auto my-10'>
      {
        data ? <div className='sm:grid sm:grid-cols-2 md:grid-cols-4 justify-center items-center gap-2'>
          <span className='w-full h-full uppercase flex justify-center items-center flex-col font-bold bg-[#430A5D] p-4 my-2 rounded-md text-white'>
            <p>total products</p>
            {data?.[1]?.[0]?.['totalProducts']}
          </span>
          <span className='w-full h-full uppercase flex justify-center items-center flex-col font-bold bg-[#6420AA] p-4 my-2 rounded-md text-white'>
            <p>total sold</p>
            {data?.[2]?.[0]?.totalOrders}
          </span>
          <span className='w-full h-full uppercase flex justify-center items-center flex-col font-bold bg-[#FF3EA5] p-4 my-2 rounded-md text-white'>
            <p>total profit</p>
            $ {data?.[2]?.[0]?.totalAmount}
          </span>
          <span className='w-full h-full uppercase flex justify-center items-center flex-col font-bold bg-[#FF7ED4] p-4 my-2 rounded-md text-white'>
            <p>total user</p>
            {data[3]}
          </span>
        </div> : 'please wait'
      }
      <p className='font-bold text-xl uppercase pt-10'>total stock products parcentance</p>
     <PieChart width={580} height={300}>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={pieData}
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={100}
          fill="#8884d8"
          dataKey="totalQuantity"
          onMouseEnter={onPieEnter}
        />
      </PieChart>
    </div>
  )
}
