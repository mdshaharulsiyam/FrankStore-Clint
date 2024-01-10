import React, { useContext, useEffect, useState } from 'react'
import useGetUsers from '../../Hooks/useGetUsers'
import useAxiosSecure from '../../Hooks/useAxiosSecure'
import { MdAdminPanelSettings, MdDelete } from 'react-icons/md'
import { Tooltip } from 'react-tooltip'
import { GrUserAdmin } from "react-icons/gr";
import Swal from 'sweetalert2'
import { FrankStoreData } from '../../Context/FrankStoreContext'
const User = () => {
    const { currentUser } = useContext(FrankStoreData)
    const [filter, setfilter] = useState('all')
    const [pagenumber, setpagenumber] = useState(0)
    const [isPending, users, refetch] = useGetUsers(filter, pagenumber)
    const [totaluser, settotaluser] = useState(0)
    const axiosecure = useAxiosSecure()
    useEffect(() => {
        axiosecure.get(`/usercount?filter=${filter}`).then((res) => {
            console.log(res.data);
            settotaluser(res.data)
        })
    }, [filter])
    const totalpage = Math.ceil(totaluser / 20)
    const pages = [...Array(totalpage).keys()];
    const MakeAdmin = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "wanst to make this person admin !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosecure.patch(`/makeadmin?useremail=${currentUser?.useremail}&id=${id}`)
                    .then((res) => {
                        if (res.data.acknowledged) {
                            refetch()
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "set add admin succesfully",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            // setloading(false)
                            // navigate('/dashboard/myclasses')
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "Something went wrong!",
                                footer: 'unable to set as admin'
                            });
                        }
                    })

            }
        });
    }
    const Deleteuser = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "wanst to delete this person !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosecure.delete(`/users?useremail=${currentUser?.useremail}&id=${id}`)
                    .then((res) => {
                        if (res.data.acknowledged) {
                            refetch()
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "user deleted succesfully",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "Something went wrong!",
                                footer: 'unable to delete user'
                            });
                        }
                    })

            }
        });
    }
    return (
        <>
            <h3 className='text-3xl font-semibold text-center uppercase pt-10'>{filter} {users.length}</h3>
            <div>
                <select onInput={(e) => {
                    setfilter(e.target.value);
                }} className='ml-auto block p-1 border-2 border-black cursor-pointer'>
                    <option disabled selected>filter by role</option>
                    <option value={'all'}>all</option>
                    <option value={'owner'}>owner</option>
                    <option value={'admin'}>admin</option>
                    <option value={'user'}>user</option>
                </select>
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>profile</th>
                                <th>Name</th>
                                <th>email</th>
                                <th>role</th>
                                <th>actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                users?.map(item => <tr key={item?._id} className="bg-base-200">
                                    <th className='w-10 h-10' ><img className='w-10 h-10 rounded-full' src={item?.profileImage} alt="" /></th>
                                    <td>{item?.username}</td>
                                    <td>{item?.useremail}</td>
                                    <td>{item?.role}</td>
                                    <td className='flex justify-center items-center'>
                                        {
                                            item?.role === 'admin' || item?.role === 'owner' ?
                                                <button data-tooltip-id="admin"
                                                    data-tooltip-content={`${item.username} is an ${item?.role}`}
                                                    data-tooltip-place="left" disabled className='px-4 py-1 bg-gray-600 text-white ml-2'>
                                                    <MdAdminPanelSettings />
                                                </button>
                                                :
                                                <button onClick={() => MakeAdmin(item._id)}
                                                    data-tooltip-id="notadmin"
                                                    data-tooltip-content={`make ${item.username} an admin`}
                                                    data-tooltip-place="left"
                                                    className='px-4 py-1 hover:scale-105 active:scale-95 bg-green-600 text-white ml-2'>
                                                    <GrUserAdmin />
                                                </button>
                                        }
                                        <Tooltip id="admin" />
                                        <Tooltip id="notadmin" />
                                        <Tooltip id="deleten" />
                                        {
                                            ((item?.role === 'admin' || item?.role === 'owner') & currentUser?.role !== 'owner') ? <button disabled
                                                data-tooltip-id="deleten"
                                                data-tooltip-content={`only woner can delete an ${item?.role}`}
                                                data-tooltip-place="left"
                                                className='px-4 py-1 bg-gray-600 text-white ml-2'>
                                                <MdDelete />
                                            </button> :
                                                <button onClick={() => Deleteuser(item._id)}
                                                    data-tooltip-id="delete"
                                                    data-tooltip-content={`delete ${item.username}`}
                                                    data-tooltip-place="left"
                                                    className='px-4 py-1 hover:scale-105 active:scale-95 bg-red-600 text-white ml-2'>
                                                    <MdDelete />
                                                </button>
                                        }
                                    </td>
                                </tr>)
                            }

                        </tbody>
                        <div className="join p-2">
                            {
                                pages.map(item => <button key={item} onClick={() => setpagenumber(item)} className={`join-item btn ${pagenumber === item ? 'btn-active' : ''}`}>{item + 1}</button>)
                            }
                        </div>
                    </table>
                </div>

            </div>
        </>
    )
}

export default User
