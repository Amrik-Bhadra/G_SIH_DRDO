import React from 'react'
import SideNavbar from '../../components/RacHeadComponents/SideNavbar';
import RacHeader from '../../components/RacHeadComponents/RacHeader';

const RacHeadPannels = () => {
  return (
    <section className="h-screen w-screen flex bg-[#f4f4f4]">
      {/* Sidebar */}
      <SideNavbar/>

      {/* Main Content */}
      <main className="relative flex px-8 py-6 flex-col border w-full gap-y-12">
        <RacHeader/>
        <div className="main-content flex justify-between items-center">
            <h2 className='font-semibold text-[#464646] text-xl'>Interview Panels</h2>
            <div className="button-grp">
                
            </div>
        </div>
      </main>
    </section>
  );
}

export default RacHeadPannels