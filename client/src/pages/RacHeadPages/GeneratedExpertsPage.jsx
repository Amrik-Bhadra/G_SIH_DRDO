import React, { useState } from "react";
import { Tabs, TabList, Tab, tabClasses, TabPanel } from "@mui/joy";
import "../../styles/RacHeadStyle.css";
import ExpertsCard from "../../components/RacHeadComponents/ExpertsCard";
import { border, display, width } from "@mui/system";

const GeneratedExpertsPage = () => {
  const [activeTab, setActiveTab] = useState(0); // Track active tab index

  const tabPanelStyles = {
    overflow: "hidden", // Prevent scrollbars
    height: "530px", // Fixed height
    position: "relative",
    // border: "2px solid red"
  };

  const scrollContainerStyles = {
    overflowY: "scroll", // Enable scrolling
    height: "100%",
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    paddingRight: "17px", // Prevent content from being cut off due to scrollbar
    marginRight: "-17px", // Hide scrollbar visually
  };

  return (
    <section className="max-h-screen w-screen bg-[#eee] flex items-center justify-center py-8 px-16">
      <div
        className="pannel-container bg-white rounded-lg overflow-hidden flex p-6 max-w-[85.5%] w-full"
        style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px" }}
      >
        <main className="leaderboard-content flex flex-col w-full gap-y-6">
          <h1 className="text-4xl font-semibold text-center">
            Generated Panels
          </h1>
          <Tabs
            aria-label="tabs"
            defaultValue={0}
            value={activeTab}
            onChange={(event, value) => setActiveTab(value)} // Update active tab
            sx={{
              display: "flex", // Align TabList and TabPanels side by side
              flexDirection: "row", // Horizontal alignment
              bgcolor: "transparent",
              height: "100%", // Ensure the tabs take full height
              width: "100%", // Ensure the content spans the available space
              //   border: "2px solid green",
            }}
          >
            {/* TabList - Vertical tabs on the left */}
            <TabList
              disableUnderline
              sx={{
                p: 1.2,
                gap: 2,
                borderRadius: "md",
                bgcolor: "#F6F6F6",
                display: "flex",
                flexDirection: "column", // Stack tabs vertically
                height: "100%", // Take full height of the container
                minWidth: "200px", // Fixed width for TabList
                [`& .${tabClasses.root}[aria-selected="true"]`]: {
                  boxShadow: "sm",
                  bgcolor: "#fff", // Active tab background
                  color: "#00b4d8", // Change text color for better visibility
                  fontWeight: "bold", // Optional: Make the active tab text bold
                },
              }}
            >
              <Tab disableIndicator sx={{ padding: "1rem 1.8rem" }}>
                AID_Panel_1
              </Tab>
              <Tab disableIndicator sx={{ padding: "1rem 1.8rem" }}>
                AID_Panel_2
              </Tab>
              <Tab disableIndicator sx={{ padding: "1rem 1.8rem" }}>
                AID_Panel_3
              </Tab>
              <Tab disableIndicator sx={{ padding: "1rem 1.8rem" }}>
                AID_Panel_4
              </Tab>
            </TabList>

            {/* TabPanels - Content on the right */}
            <div
              style={{
                flex: 1, // TabPanel takes remaining space
                padding: "1rem",
              }}
            >
              {activeTab === 0 && (
                <TabPanel value={0} sx={tabPanelStyles}>
                  <div style={scrollContainerStyles} className="no-scrollbar">
                    <ExpertsCard />
                    <ExpertsCard />
                    <ExpertsCard />
                    <ExpertsCard />
                  </div>
                </TabPanel>
              )}
              {activeTab === 1 && (
                <TabPanel value={1} sx={tabPanelStyles}>
                  <div style={scrollContainerStyles} className="no-scrollbar">
                    <ExpertsCard />
                    <ExpertsCard />
                    <ExpertsCard />
                  </div>
                </TabPanel>
              )}
              {activeTab === 2 && (
                <TabPanel value={2} sx={tabPanelStyles}>
                  <div style={scrollContainerStyles} className="no-scrollbar">
                    <ExpertsCard />
                    <ExpertsCard />
                    <ExpertsCard />
                    <ExpertsCard />
                    <ExpertsCard />
                  </div>
                </TabPanel>
              )}
              {activeTab === 3 && (
                <TabPanel value={3} sx={tabPanelStyles}>
                  <div style={scrollContainerStyles} className="no-scrollbar">
                    <b>Fourth</b> tab panel content here
                  </div>
                </TabPanel>
              )}
            </div>
          </Tabs>
        </main>
      </div>
    </section>
  );
};

export default GeneratedExpertsPage;
