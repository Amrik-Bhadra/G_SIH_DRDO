import React, { useState, useEffect } from 'react';
import RacHeader from '../../components/RacHeadComponents/RacHeader';
import RadarChartComponent from '../../components/ChartsComponents/RadarChartComponent';
import Grid from '@mui/material/Grid2';
import { IoCalendarOutline } from "react-icons/io5";
import { IoTimeOutline } from "react-icons/io5";
import { FaBuilding } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa6";
import Viewreport from '../../components/CandidateDashboardSections/Viewreport';
import '../../styles/RacHeadStyle.css';
import Avatar from '@mui/material/Avatar';
import ApplicationsCard from '../../components/CandidateDashboardSections/ApplicationsCard';

function Candidatedashboard2() {
  const dummyData = {
    problemSolving: 6.5, // out of 9
    collaboration: 2.3, // out of 3
    decisionMaking: 5.8, // out of 7.5
    creativity: 3.2, // out of 4.5
    analyticalDepth: 4.7, // out of 6
  };

  const score = {
    "Problem Solving": 17,
    "Collaborative Thinking": 17,
    "Decision Making": 18,
    "Creative Thinking": 20,
    "Analytical Depth": 17,
  };

  const maxValues = {
    problemSolving: 9,
    collaboration: 3,
    decisionMaking: 7.5,
    creativity: 4.5,
    analyticalDepth: 6,
  };

  const [normalizedScores, setNormalizedScores] = useState({
    problemSolving: 0,
    decisionMaking: 0,
    creativity: 0,
    analyticalDepth: 0,
    collaboration: 0,
  });
  useEffect(() => {
    // Normalize scores when totalScore changes
    // out of 25 k scale mei percentage
    const normalized = {
      problemSolving:
        (score["Problem Solving"] / 25) * maxValues.problemSolving,
      collaboration:
        (score["Collaborative Thinking"] / 25) * maxValues.collaboration,
      decisionMaking:
        (score["Decision Making"] / 25) * maxValues.decisionMaking,
      creativity: (score["Creative Thinking"] / 25) * maxValues.creativity,
      analyticalDepth:
        (score["Analytical Depth"] / 25) * maxValues.analyticalDepth,
    };

    setNormalizedScores(normalized);
  }, [score]);

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  return (
    <div className="bg-gray-100 min-h-screen pb-5">
      <div className="container mx-auto px-4 max-w-[1260px] flex flex-col gap-y-5 mb-5">
        <RacHeader />
      </div>
      <div className='flex'>
        {/* Radar Chart */}
        <div className="bg-white w-[30vw] p-2 h-screen mx-5 rounded-lg flex flex-col overflow-y-auto no-scrollbar">
          <h2 className="text-2xl p-2 font-medium text-gray-600">Overview</h2>
          <RadarChartComponent data={normalizedScores} />
            <h1 className="text-center text-lg font-semibold mt-1">
              <span className="px-4 py-2 border border-[#eee] rounded-md">
                <span className="text-[#0E8CCA]">Total Score: </span>
                {score["Problem Solving"] +
                  score["Collaborative Thinking"] +
                  score["Decision Making"] +
                  score["Creative Thinking"] +
                  score["Analytical Depth"]}{" "}
                / {25 * 5}
              </span>
            </h1>

            <div className="flex flex-col gap-y-3 mt-6">
              <h1 className="text-base text-[#0E8CCA] font-semibold">
                Score Breakdown
              </h1>
              <div className="flex flex-col gap-y-3">
                {Object.entries(score).map(([key, value], index) => (
                  <span
                    key={index}
                    className="flex items-center justify-between text-base border border-[#eee] p-2 rounded-md"
                  >
                    <strong>{key.replace(/([A-Z])/g, " $1")}</strong>
                    <p className="color-[#464646]">{value} / 25</p>
                  </span>
                ))}
              </div>
            </div>
        </div>
        <div className='flex flex-col gap-4'>

          <div className='flex'>
            {/*scheduled interview */}
            {/* Scheduled Interviews */}
            <div className="bg-white w-[40vw] max-h-96 rounded-lg p-5 overflow-y-scroll overflow-x-hidden no-scrollbar">
              <h2 style={{ color: "#464646" }} className="text-2xl font-medium">
                Scheduled Interview
              </h2>
              <div
                style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 2px 0px" }}
                className="bg-white w-[35vw] rounded-lg border border-gray-50 m-4 p-2"
              >
                <h2 style={{ color: "#464646" }} className="font-semibold text-2xl">
                  AI in Defence
                </h2>
                <Grid className="p-4" container spacing={2} columns={16}>
                  <Grid size={7}>
                    <div className="flex items-center gap-2">
                      <IoCalendarOutline className="text-2xl" style={{ color: "#7F7F7F" }} />
                      <div className="flex flex-col">
                        <p style={{ color: "#0E8CCA" }} className="font-medium text-base">
                          Date
                        </p>
                        <p style={{ color: "#7F7F7F" }}>27-01-2024</p>
                      </div>
                    </div>
                  </Grid>

                  <Grid size={9}>
                    <div className="flex items-center gap-2">
                      <IoTimeOutline className="text-2xl" style={{ color: "#7F7F7F" }} />
                      <div className="flex flex-col">
                        <p style={{ color: "#0E8CCA" }} className="font-medium text-base">
                          Time
                        </p>
                        <p style={{ color: "#7F7F7F" }}>10:00 Am-12:00 Pm</p>
                      </div>
                    </div>
                  </Grid>

                  <Grid size={10}>
                    <div className="flex items-center gap-2">
                      <FaBuilding className="text-xl" style={{ color: "#7F7F7F" }} />
                      <div className="flex flex-col">
                        <p style={{ color: "#0E8CCA" }} className="font-medium text-base">
                          Department
                        </p>
                        <p style={{ color: "#7F7F7F" }}>Department of AI&ML</p>
                      </div>
                    </div>
                  </Grid>

                  <Grid size={10}>
                    <div className="flex items-center gap-2">
                      <FaBriefcase className="text-xl" style={{ color: "#7F7F7F" }} />
                      <div className="flex flex-col">
                        <p style={{ color: "#0E8CCA" }} className="font-medium text-base">
                          Job Role
                        </p>
                        <p style={{ color: "#7F7F7F" }}>Scientist A</p>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </div>

              <div>
                <h2 style={{ color: "#464646" }} className="text-xl font-medium">
                  Previous Interviews
                </h2>
                <Viewreport />
                <Viewreport />
              </div>
            </div>
            {/*Personal Information*/}
            {/* Personal Information Section */}
            <div className="bg-white w-[23vw] h-96 rounded-lg ml-5 mr-5 flex flex-col items-center justify-start pt-8">
              <Avatar
                className="shadow-md border-4 border-white"
                {...stringAvatar('Rahul Rastogi')}
                style={{ width: '120px', height: '120px' }}
              />
              <p className="font-semibold text-2xl mt-4 text-center" style={{ color: "#3C3C3C" }}>Rahul Rastogi</p>
              <p className='font-normal text-lg' style={{ color: "#3EB2F2" }}>@rahul.rastogi@domain.com</p>
              <p className='font-medium text-lg' style={{ color: "#8D8D8D" }}></p>
            </div>
          </div>
          <div className="bg-white w-[65vw] h-[38vh] rounded-lg flex flex-col p-1 pb-1 pl-4">
            <p style={{ color: "#333333" }} className="font-semibold text-xl mb-2">
              Applied Jobs
            </p>
            {/* Horizontal Scrollable Row */}
            <div className="flex gap-4 overflow-x-scroll no-scrollbar">
              <ApplicationsCard />
              <ApplicationsCard />
              <ApplicationsCard />
              <ApplicationsCard />
              <ApplicationsCard />
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}

export default Candidatedashboard2;