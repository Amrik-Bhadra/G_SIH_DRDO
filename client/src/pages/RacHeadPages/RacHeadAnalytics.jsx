// import React from "react";
// import SideNavbar from "../../components/RacHeadComponents/SideNavbar";
// import RacHeader from "../../components/RacHeadComponents/RacHeader";
// import ExpertPerformanceLineChart from "../../components/ChartsComponents/LineChartComponent";
// import BarChartComponent from "../../components/ChartsComponents/BarChartComponent";
// import StaggedBarChartComponent from "../../components/ChartsComponents/StaggedBarChartComponent";
// import DoughnutChartComponent from "../../components/ChartsComponents/DoughnutChartComponent";

// import { Box } from "@mui/material";
// import Grid from "@mui/material/Grid2";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";

// const RacHeadAnalytics = () => {
//   return (
//     <section className="h-screen w-screen flex bg-[#f4f4f4]">
//       {/* Sidebar */}
//       <SideNavbar />

//       {/* Main Content */}
//       <main className="relative flex flex-col gap-y-5 flex-grow px-8 py-6 overflow-scroll">
//         <RacHeader />

//         <div className="pannels-container flex flex-grow gap-y-5 gap-x-5">
//           <Grid container spacing={2} columns={12} sx={{ flexGrow: 1 }}>
//             <Grid size={8}>
//               <StaggedBarChartComponent/>
//             </Grid>

//             {/* grid for bar chart */}
//             <Grid
//               size={8}
//               sx={{
//                 borderRadius: "10px",
//                 background: "#fff",
//                 // maxHeight: "fit-content",
//                 padding: "1.2rem",
//               }}
//             >
//               {/* <AreaChartComponent/> */}
//               <div className="flex justify-between items-center w-full mb-6">
//                 <h1 className="font-semibold text-xl text-[#333]">
//                   Relevancy Percentage
//                 </h1>
//                 <FormControl
//                   sx={{
//                     m: 1,
//                     minWidth: 200,
//                     background: "rgba(227, 227, 227, 0.25)",
//                   }}
//                   size="small"
//                 >
//                   <InputLabel
//                     id="demo-select-small-label"
//                     sx={{
//                       color: "#646464", // Label color
//                     }}
//                   >
//                     Select Department
//                   </InputLabel>
//                   <Select
//                     labelId="demo-select-small-label"
//                     id="demo-select-small"
//                     label="Select Department"
//                     sx={{
//                       "& .MuiOutlinedInput-root": {
//                         "& fieldset": {
//                           border: "none", // No border
//                         },
//                         "&.Mui-focused fieldset": {
//                           borderColor: "#646464", // Border color when focused (active state)
//                         },
//                       },
//                       color: "#646464", // Text color
//                     }}
//                   >
//                     <MenuItem value="">
//                       <em>None</em>
//                     </MenuItem>
//                     <MenuItem value={10}>Ten</MenuItem>
//                     <MenuItem value={20}>Twenty</MenuItem>
//                     <MenuItem value={30}>Thirty</MenuItem>
//                   </Select>
//                 </FormControl>
//               </div>
//               <BarChartComponent />
//             </Grid>

//             {/* doughnut chart for pannl status */}
//             <Grid
//               size={5}
//               sx={{
//                 borderRadius: "10px",
//                 background: "#fff",
//                 maxHeight: "fit-content",
//                 padding: "1.2rem",
//               }}
//             >
//               <div className="flex justify-between items-center w-full mb-6">
//                 <h1 className="font-semibold text-xl text-[#333]">
//                   Interview Panel Status
//                 </h1>
//                 <FormControl
//                   sx={{
//                     m: 1,
//                     minWidth: 200,
//                     background: "rgba(227, 227, 227, 0.25)",
//                   }}
//                   size="small"
//                 >
//                   <InputLabel
//                     id="demo-select-small-label"
//                     sx={{
//                       color: "#646464", // Label color
//                     }}
//                   >
//                     Select Department
//                   </InputLabel>
//                   <Select
//                     labelId="demo-select-small-label"
//                     id="demo-select-small"
//                     label="Select Department"
//                     sx={{
//                       "& .MuiOutlinedInput-root": {
//                         "& fieldset": {
//                           border: "none", // No border
//                         },
//                         "&.Mui-focused fieldset": {
//                           borderColor: "#646464", // Border color when focused (active state)
//                         },
//                       },
//                       color: "#646464", // Text color
//                     }}
//                   >
//                     <MenuItem value="">
//                       <em>None</em>
//                     </MenuItem>
//                     <MenuItem value={10}>Ten</MenuItem>
//                     <MenuItem value={20}>Twenty</MenuItem>
//                     <MenuItem value={30}>Thirty</MenuItem>
//                   </Select>
//                 </FormControl>
//               </div>

//               <DoughnutChartComponent />
//             </Grid>

//             {/* upcoming inteviews */}
//             <Grid
//               size={7}
//               sx={{
//                 borderRadius: "10px",
//                 background: "#fff",
//                 padding: "1.2rem",
//               }}
//             >
//             </Grid>
//           </Grid>
//         </div>
//       </main>
//     </section>
//   );
// };

// export default RacHeadAnalytics;

import React from "react";
import SideNavbar from "../../components/RacHeadComponents/SideNavbar";
import RacHeader from "../../components/RacHeadComponents/RacHeader";
import Grid from "@mui/material/Grid";

import StackedBarchart from "../../components/RacHeadComponents/StackedBarchart";
import Linechart from "../../components/RacHeadComponents/Linechart";
import BarChart from "../../components/RacHeadComponents/Barchart";
import DoughnutChartComponent from "../../components/RacHeadComponents/DoughnutChartComponent";

const RacHeadAnalytics = () => {
  const gridStyle = {
    borderRadius: "10px",
    background: "#fff",
    padding: "1rem", // Padding to add some space inside the white box
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    margin: "0.5rem", // Margin around grid items
  };

  const chartContainerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  };

  return (
    <section className="h-screen w-screen flex bg-[#f4f4f4] gap-4">
      {/* Sidebar */}
      <SideNavbar />

      {/* Main Content */}
      <main className="relative flex flex-col flex-grow gap-y-8 px-8 py-6 overflow-y-auto mb-4">
        <RacHeader />
        <div className="pannels-container flex flex-grow flex-wrap gap-y-5 gap-x-5 w-full">
          <Grid
            container
            spacing={2}
            sx={{ width: "100%", margin: 0, padding: 0 }}
          >
            {/* Stacked Bar Chart */}
            <Grid item xs={12} sm={6} md={6}>
              <div
                className="p-1 rounded-lg"
                style={{ height: "95%", background: "white" }}
              >
                <StackedBarchart />
              </div>
            </Grid>

            {/* Simple Bar Chart */}
            <Grid item xs={12} sm={6} md={6}>
              <div
                className="p-1 rounded-lg"
                style={{ height: "95%", background: "white", width: "fit" }}
              >
                <BarChart />
              </div>
            </Grid>

            {/* Other charts below */}
            <Grid item xs={12} sm={5} md={5}>
              <div
                className="rounded-lg p-1"
                style={{ height: "90%", background: "white", width: "fit" }}
              >
                <DoughnutChartComponent />
              </div>
            </Grid>

            <Grid item xs={12} sm={7} md={7}>
              <div
                className="rounded-lg p-1"
                style={{ height: "90%", background: "white", width: "fit" }}
              >
                <Linechart />
              </div>
            </Grid>
          </Grid>
        </div>
      </main>
    </section>
  );
};

export default RacHeadAnalytics;
