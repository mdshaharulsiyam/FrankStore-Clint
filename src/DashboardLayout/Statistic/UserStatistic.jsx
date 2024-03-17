import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';


export const UserStatistic = ({ data }) => {
  console.log(data)
  const ChartData = [
    { name: 'totalOrders', value: data?.[0]?.[0]?.totalOrders },
    { name: 'CartItem', value: data?.[1]?.[0]?.itemCount }
  ]
  console.log(ChartData)
  return (
    <div className='container mx-auto my-10'>
      {
        data ? <div className='sm:grid sm:grid-cols-2 md:grid-cols-3 justify-center items-center gap-2'>
          <span className='w-full h-full uppercase flex justify-center items-center flex-col font-bold bg-[#430A5D] p-4 my-2 rounded-md text-white'>
            <p>total purchased</p>
            {data?.[0]?.[0]?.['totalOrders']}
          </span>
          <span className='w-full h-full uppercase flex justify-center items-center flex-col font-bold bg-[#6420AA] p-4 my-2 rounded-md text-white'>
            <p>total spend </p>
            $ {data?.[0]?.[0]?.totalAmount}
          </span>
          <span className='w-full h-full uppercase flex justify-center items-center flex-col font-bold bg-[#FF3EA5] p-4 my-2 rounded-md text-white'>
            <p>total cart item</p>
            {data?.[1]?.[0]?.itemCount}
          </span>
        </div> : 'please wait'
      }
      <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={ChartData}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        />
        <Pie dataKey="value" data={ChartData} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d" />
        <Tooltip />
      </PieChart>
    </div>
  )
}
