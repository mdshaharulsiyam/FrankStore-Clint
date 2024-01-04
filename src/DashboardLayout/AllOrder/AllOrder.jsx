import React, { useContext } from 'react'
import { FrankStoreData } from '../../Context/FrankStoreContext'
import useGetAllOrder from '../../Hooks/useGetAllOrder'
import { Link } from 'react-router-dom'
import { MdDelete, MdModeEditOutline } from 'react-icons/md'
import { TbListDetails, TbTruckDelivery } from 'react-icons/tb'
import useAxiosSecure from '../../Hooks/useAxiosSecure'

const AllOrder = () => {
  const { currentUser } = useContext(FrankStoreData)
  const [isPending, OrderData, refetch] = useGetAllOrder(currentUser?.useremail)
  console.log(OrderData);
  const axiosequre = useAxiosSecure()
  const deleteitem = (id) => {
    axiosequre.delete(`/order?useremail=${currentUser?.useremail}&id=${id}`)
      .then((res) => {
        refetch()
        console.log(res.data)
      })
  }
  const deliveritem = (id) => {
    axiosequre.patch(`/order?useremail=${currentUser?.useremail}&id=${id}`, { status: 'deliverd' })
      .then((res) => {
        refetch()
        console.log(res.data)
      })
  }
  return (
    <>
      <h3 className='text-3xl text-center font-semibold pt-7'>all order</h3>
      <p>total order {OrderData.length}</p>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>image</th>
              <th>product</th>
              <th>user</th>
              <th>payment</th>
              <th>transitionId</th>
              <th>address</th>
              <th>status</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {
              OrderData.map(item => <tr key={item._id} item={item}>
                <td className='w-20' ><img className='w-20  rounded-full' src={item?.myOrder[0]?.productImage} alt="" /></td>
                <td>{item?.myOrder[0]?.productName}</td>
                <td>{item?.useremail}</td>
                <td>${item?.myOrder[0]?.price}</td>
                <td>{item?.transitionId}</td>
                <td className='min-w-[200px]'>{item?.address}</td>
                <td className={`font-semibold ${item?.status === "pending" ? 'text-red-600' : 'text-black'}`}>{item?.status}</td>
                <td className='text-3xl flex justify-start items-center gap-2 cursor-pointer'>
                  <Link to={`/productDeails/${item?.myOrder[0]?._id}`}>
                    <TbListDetails className='hover:text-blue-500' />
                  </Link>
                  {
                    item?.status === "pending" && <TbTruckDelivery onClick={() => deliveritem(item?._id)} className='hover:text-green-500' />
                  }

                  {
                    item?.status !== "pending" && <MdDelete onClick={() => deleteitem(item?._id)} className='hover:text-red-500 active:scale-75 transition-all' />
                  }

                </td>
              </tr>)
            }

          </tbody>
        </table>
        {
          isPending && <span className="loading loading-bars loading-lg absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"></span>
        }

      </div>
    </>
  )
}

export default AllOrder
