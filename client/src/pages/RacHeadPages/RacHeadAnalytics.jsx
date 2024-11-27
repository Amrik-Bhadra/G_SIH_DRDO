import React from "react";
import SideNavbar from "../../components/RacHeadComponents/SideNavbar";
import RacHeader from "../../components/RacHeadComponents/RacHeader";
import ExpertPerformanceLineChart from "../../components/ChartsComponents/LineChartComponent";
import BarChartComponent from "../../components/ChartsComponents/BarChartComponent";
import StaggedBarChartComponent from "../../components/ChartsComponents/StaggedBarChartComponent";
import DoughnutChartComponent from "../../components/ChartsComponents/DoughnutChartComponent";

import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const RacHeadAnalytics = () => {
  return (
    <section className="h-screen w-screen flex bg-[#f4f4f4]">
      {/* Sidebar */}
      <SideNavbar />

      {/* Main Content */}
      <main className="relative flex flex-col gap-y-5 flex-grow px-8 py-6 overflow-scroll">
        <RacHeader />

        <div className="pannels-container flex flex-grow gap-y-5 gap-x-5">
          <Grid container spacing={2} columns={12} sx={{ flexGrow: 1 }}>
            <Grid size={8}>
              <StaggedBarChartComponent/>
            </Grid>

            {/* grid for bar chart */}
            <Grid
              size={8}
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

              <DoughnutChartComponent />
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
            </Grid>
          </Grid>
        </div>
      </main>
    </section>
  );
};

export default RacHeadAnalytics;
