import React, { useState } from "react";
import SideNavbar from "../../components/RacHeadComponents/SideNavbar";
import RacHeader from "../../components/RacHeadComponents/RacHeader";
import DashboardNumberCards from "../../components/RacHeadComponents/DashboardNumberCards";
import Grid from "@mui/material/Grid2";
import { Chip } from "@mui/material";
import { FaUser } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { IoDocumentText } from "react-icons/io5";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InterviewCardComponent from "../../components/RacHeadComponents/InterviewCardComponent";

// import AreaChartComponent from "../../components/ChartsComponents/AreaChartComponent";
import BarChartComponent from "../../components/ChartsComponents/BarChartComponent";
import DoughnutChatComponent from "../../components/ChartsComponents/DoughnutChartComponent";

import Slider from "react-slick";

const RacHeadDashboard = () => {
  const numberCardsStyle = {
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "1.2rem",
    display: "flex",
    flexDirection: "column",
    gap: "1.3rem 0",
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Number of cards visible at once
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  // Sample card data
  const cards = [
    {
      id: 1,
      title: "Card 1",
      description: "This is card 1",
      
    },
    {
      id: 2,
      title: "Card 2",
      description: "This is card 2",
     
    },
    {
      id: 3,
      title: "Card 3",
      description: "This is card 3",
      
    },
    {
      id: 4,
      title: "Card 4",
      description: "This is card 4",
      
    },
    {
      id: 5,
      title: "Card 5",
      description: "This is card 5",
      
    },
  ];

  return (
    <section className="h-screen w-screen flex bg-[#f6f6f6]">
      {/* Sidebar */}
      <SideNavbar />

      {/* Main Content */}
      <main className="relative flex flex-col flex-grow gap-y-8 px-8 py-6 overflow-y-auto">
        <RacHeader />

        <div className="pannels-container flex flex-grow gap-y-5 gap-x-5">
          <Grid container spacing={2} sx={{ flexGrow: 1 }}>
            <Grid size={5}>
              {/* number cards */}
              <Grid container rowSpacing={2} columnSpacing={2}>
                <DashboardNumberCards
                  numberCardsStyle={numberCardsStyle}
                  title="Total Experts"
                  para="56"
                  Icon={FaUser}
                />
                <DashboardNumberCards
                  numberCardsStyle={numberCardsStyle}
                  title="Total Experts"
                  para="56"
                  Icon={MdGroups}
                />
                <DashboardNumberCards
                  numberCardsStyle={numberCardsStyle}
                  title="Total Experts"
                  para="56"
                  Icon={RiCalendarScheduleFill}
                />
                <DashboardNumberCards
                  numberCardsStyle={numberCardsStyle}
                  title="Total Experts"
                  para="56"
                  Icon={IoDocumentText}
                />
              </Grid>
            </Grid>

            {/* grid for bar chart */}
            <Grid
              size={7}
              sx={{
                borderRadius: "10px",
                background: "#fff",
                // maxHeight: "fit-content",
                padding: "1.2rem",
              }}
            >
              {/* <AreaChartComponent/> */}
              <div className="flex justify-between items-center w-full mb-6">
                <h1 className="font-semibold text-xl text-[#333]">
                  Relevancy Percentage
                </h1>
                <FormControl
                  sx={{
                    m: 1,
                    minWidth: 200,
                    background: "rgba(227, 227, 227, 0.25)",
                  }}
                  size="small"
                >
                  <InputLabel
                    id="demo-select-small-label"
                    sx={{
                      color: "#646464", // Label color
                    }}
                  >
                    Select Department
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    label="Select Department"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          border: "none", // No border
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#646464", // Border color when focused (active state)
                        },
                      },
                      color: "#646464", // Text color
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <BarChartComponent />
            </Grid>

            {/* doughnut chart for pannl status */}
            <Grid
              size={5}
              sx={{
                borderRadius: "10px",
                background: "#fff",
                maxHeight: "fit-content",
                padding: "1.2rem",
              }}
            >
              <div className="flex justify-between items-center w-full mb-6">
                <h1 className="font-semibold text-xl text-[#333]">
                  Interview Panel Status
                </h1>
                <FormControl
                  sx={{
                    m: 1,
                    minWidth: 200,
                    background: "rgba(227, 227, 227, 0.25)",
                  }}
                  size="small"
                >
                  <InputLabel
                    id="demo-select-small-label"
                    sx={{
                      color: "#646464", // Label color
                    }}
                  >
                    Select Department
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    label="Select Department"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          border: "none", // No border
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#646464", // Border color when focused (active state)
                        },
                      },
                      color: "#646464", // Text color
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <DoughnutChatComponent />
            </Grid>

            {/* upcoming inteviews */}
            <Grid
              size={7}
              sx={{
                borderRadius: "10px",
                background: "#fff",
                padding: "1.2rem",
              }}
            >
              <div className="flex justify-between items-center w-full mb-6">
                <h1 className="font-semibold text-xl text-[#333]">
                  Upcoming Interviews
                </h1>
                <FormControl
                  sx={{
                    m: 1,
                    minWidth: 160,
                    background: "rgba(227, 227, 227, 0.25)",
                  }}
                  size="small"
                >
                  <InputLabel
                    id="demo-select-small-label"
                    sx={{
                      color: "#646464", // Label color
                    }}
                  >
                    Select Month
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    label="Select Month"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          border: "none", // No border
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#646464", // Border color when focused (active state)
                        },
                      },
                      color: "#646464", // Text color
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div style={{ padding: "20px" }}>
                <Slider {...settings}>
                  {cards.map((card) => (
                    <InterviewCardComponent card={card}/>

                  ))}
                </Slider>
              </div>
            </Grid>
          </Grid>
        </div>
      </main>
    </section>
  );
};

export default RacHeadDashboard;
