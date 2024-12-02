import React from 'react'
import ai_in_defence_rachead from '../../assets/images/ai_in_defence_rachead.png'
import { GoClockFill } from "react-icons/go";
import { IoPersonSharp } from "react-icons/io5";
import { IoMdPeople } from "react-icons/io";
import BarChartWithoutDropdown from '../../components/RacHeadComponents/BarChartWithoutDropdown';
import { IoArrowUndoCircle } from "react-icons/io5";
import { color } from '@mui/system';

const PanelDetailsPage = () => {
    const panelDetails = [
        {
            id: 1,
            title: "Artificial Intelligence in Defence",
            department: "AI & Machine Learning",
            time: "10:00 AM - 12:00 PM",
            noOfExperts: 5,
            noOfCandidates: 15,
            description: "AI in defense is revolutionizing military strategies by enhancing decision-making, automating surveillance, and improving threat detection. It enables autonomous systems like drones and robots, assists in cyber security, and strengthens data analysis for intelligence. AI-powered solutions help optimize logistics, predict equipment failures, and provide real-time situational awareness, making defense operations more efficient and precise.",
            status: "Completed"
        }
    ];
    return (
        <>
            <div className='h-screen w-screen flex overflow-x-hidden'>
                {/*left Section */}
                <div className="h-screen w-[30vw] relative">
                    <img
                        src={ai_in_defence_rachead}
                        alt="AI in defence"
                        className="h-full w-full object-cover"
                    />
                    <IoArrowUndoCircle
                        onClick={() => window.history.back()}
                        className="absolute top-4 left-4 bg-cyan-500 text-white text-3xl cursor-pointer rounded-full"
                    />
                </div>

                {/*right Section */}
                <div className='h-screen w-[70vw] bg-white overflow-y-auto p-10'>
                    {panelDetails.map((panel) => (
                        <>
                            <div className='flex flex-col gap-10'>
                                {/*title and department*/}
                                <div className='flex justify-between '>
                                    <div className='flex flex-col'>
                                        <h2 className='font-bold text-2xl ' style={{ color: "#333333" }}>{panel.title}</h2>
                                        <h4 className='text-cyan-400 font-medium text-xl'>{panel.department}</h4>
                                    </div>

                                    {/* status badge */}
                                    <span className='rounded-[1000px] border-2 px-5 py-2 font-medium h-fit' style={{
                                        color:
                                            panel.status === "In Progress"
                                                ? "#0897FF"
                                                : panel.status === "Upcoming"
                                                    ? "#FF5EF9"
                                                    : "#00BD40", // Default: Industry
                                        borderColor:
                                            panel.status === "In Progress"
                                                ? "#0897FF"
                                                : panel.status === "Upcoming"
                                                    ? "#FF5EF9"
                                                    : "#00BD40", // Default: Industry
                                        backgroundColor:
                                            panel.status === "In Progress"
                                                ? "rgba(8, 151, 255, 0.12)"
                                                : panel.status === "Upcoming"
                                                    ? "rgba(255, 94, 249, 0.1)"
                                                    : "rgba(0, 189, 64, 0.12)", // Default: Industry
                                    }}>

                                        {panel.status}

                                    </span>
                                </div>


                                {/*time candidate and experts number */}
                                <div className='flex justify-between items-center w-2/3'>
                                    <div style={{ color: "gray", fontSize: "25px" }} className='flex items-center gap-2'><GoClockFill />
                                        <div className='flex flex-col'>
                                            <p className='text-gray-500 text-base'>Time</p>
                                            <p className='text-base font-medium' style={{ color: "#464646" }}>{panel.time}</p>
                                        </div>
                                    </div>

                                    <div style={{ color: "gray", fontSize: "25px" }} className='flex items-center gap-2'><IoPersonSharp />
                                        <div className='flex flex-col'>
                                            <p className='text-gray-500 text-base'>No of Experts</p>
                                            <p className=' text-base font-medium ' style={{ color: "#464646" }}>{panel.noOfExperts}</p>
                                        </div>
                                    </div>
                                    <div style={{ color: "gray", fontSize: "35px" }} className='flex items-center gap-2'><IoMdPeople />
                                        <div className='flex flex-col'>
                                            <p className='text-gray-500 text-base'>No of Candidates</p>
                                            <p className=' text-base font-medium' style={{ color: "#464646" }}>{panel.noOfCandidates}</p>
                                        </div>
                                    </div>

                                </div>

                                {/* description of panel*/}
                                <p className='text-gray-600'>{panel.description}</p>

                                {/*Bar chart */}
                                <div style={{ borderColor: "#EAEAEA", borderWidth: "1px" }} className='w-2/3 bg-white rounded-xl p-4'>
                                    <h2 className='mb-4 font-semibold ml-4 text-lg text-gray-800'>Leaderboard</h2>
                                    <BarChartWithoutDropdown />
                                </div>


                            </div>
                        </>
                    ))}
                </div>
            </div>
        </>

    )
}

export default PanelDetailsPage