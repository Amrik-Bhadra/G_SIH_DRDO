import React from 'react'

function Viewreport() {
    return (
        <div className='bg-white w-[35vw] h-20 flex flex-wrap  rounded-lg border border-gray-50 m-4 p-2'>
            {/*Date*/}
            <div className='w-16 h-full bg-custom-gradient text-center rounded-md'>
                <p className='font-medium text-xs text-white'>Sep 2024</p>
                <p className='text-xl font-semibold text-white'>20</p>
                <p className='text-white font-thin text-xs'>Thu</p>
            </div>

            {/*Title*/}
            <div className=' w-2/4 h-full brder border-black mx-4'>
                <h2 style={{ color: "#464646" }} className='text-2xl font-semibold'>AI in Defence</h2>
                <p style={{ color: "#797979" }} className='text-base font-medium'>Scientist A</p>
                <p></p>
            </div>

            {/* Button */}
            <div className="ml-auto flex items-center">
                <button className="w-30 h-10  text-white rounded-md text-center font-normal text-sm p-1 bg-black-gradient" >
                    View Report
                </button>
            </div>
        </div>
    )
}

export default Viewreport