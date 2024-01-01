import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa6";
const SliderData = ({ item }) => {
    const { category, products } = item
    return (
        <div className="bg-slate-300 bg-opacity-10 box-border py-6">
            <div className='container mx-auto flex md:flex-row flex-col-reverse flex-wrap md:justify-center justify-start  gap-2 items-center '>
                <div className='md:w-[49%] w-full flex justify-start items-center text-center md:text-left'>
                    <span>
                        <h2 className='font-extrabold italic md:text-4xl text-2xl py-3 mx-auto md:mx-0 max-w-[510px] uppercase opacity-90 text-'>{category ? category.name : products.name}</h2>
                        <p className='text-orange-500 py-5 flex justify-start items-center gap-1 font-semibold tracking-widest text-xl'>{category ? category.description : products.description}</p>
                        {category ? <button className='text-black border-b-4 border-black active:scale-90  flex justify-start items-center gap-2'>shop now <FaArrowRight /></button> : <Link><button className='text-black border-b-4 border-black active:scale-90 flex justify-start items-center gap-2'>shop now <FaArrowRight /></button></Link>}
                    </span>
                </div>
                <div className='md:w-[49%] max-h-[400px] w-full flex md:justify-end justify-center items-center overflow-hidden py-2 pointer-events-none'>
                    <img className='w-full p-4  object-cover' src={category ? category.image : products.image} alt="" /> 
                </div>
            </div>
        </div>
    )
}

export default SliderData
