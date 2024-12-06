import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { InputAdornment, Tooltip } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { IoMdArrowDropdown } from "react-icons/io";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import { GrCircleInformation } from "react-icons/gr";
// import Tooltip from '@mui/material/Tooltip';

const CreatePanelForm = () => {
  const navigate = useNavigate();
  const handleFormSubmit = () => {
    navigate("/rachead/generatedExperts");
  };

  const data = {
    departments: {
      "Department A": {
        job_roles: {
          "Scientist A": {
            abstract:
              "The position of Scientist A in the Defence Systems division offers an exciting opportunity to work at the intersection of cutting-edge technology and national defense. This role focuses on the design and implementation of advanced technologies for autonomous defense systems and secure communication frameworks, leveraging Artificial Intelligence (AI) and Machine Learning (ML) to address mission-critical challenges.",
          },
          "Scientist C": {
            abstract:
              "The Defence Systems division seeks a visionary professional for the position of Scientist C, specializing in cyber defense and secure systems engineering. This role involves developing advanced cybersecurity frameworks, threat detection systems, and cryptographic solutions to safeguard defense infrastructure against emerging cyber threats.",
          },
        },
      },
      "Department B": {
        job_roles: {
          "Scientist B": {
            abstract:
              "The position of Scientist B in the Defence Systems division offers an exciting opportunity to work at the intersection of sensor technologies and hardware-software integration for defense systems. This role focuses on enhancing situational awareness and operational efficiency through innovative research and development in multi-sensor systems and precision-guided technologies.",
          },
          "Scientist C": {
            abstract:
              "The Defence Systems division seeks a visionary professional for the position of Scientist C, specializing in cyber defense and secure systems engineering. This role involves developing advanced cybersecurity frameworks, threat detection systems, and cryptographic solutions to safeguard defense infrastructure against emerging cyber threats.",
          },
        },
      },
      "Department C": {
        job_roles: {
          "Scientist A": {
            abstract:
              "The position of Scientist A in the Defence Systems division offers an exciting opportunity to work at the intersection of cutting-edge technology and national defense. This role focuses on the design and implementation of advanced technologies for autonomous defense systems and secure communication frameworks, leveraging Artificial Intelligence (AI) and Machine Learning (ML) to address mission-critical challenges.",
          },
          "Scientist B": {
            abstract:
              "The position of Scientist B in the Defence Systems division offers an exciting opportunity to work at the intersection of sensor technologies and hardware-software integration for defense systems. This role focuses on enhancing situational awareness and operational efficiency through innovative research and development in multi-sensor systems and precision-guided technologies.",
          },
        },
      },
    },
  };

  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedJobRole, setSelectedJobRole] = useState("");
  const [jobRoles, setJobRoles] = useState([]);
  const [description, setDescription] = useState("");
  const [criteriaData, setCriteriaData] = useState({
    "Problem Solving": { isSelected: false, detail: "" },
    Collaboration: { isSelected: false, detail: "" },
    "Decision Making": { isSelected: false, detail: "" },
    "Analytical Depth": { isSelected: false, detail: "" },
  });

  const handleDepartmentChange = (event) => {
    const department = event.target.value;
    setSelectedDepartment(department);
    setSelectedJobRole("");
    setDescription("");
    setJobRoles(Object.keys(data.departments[department]?.job_roles || {}));
  };

  const handleJobRoleChange = (event) => {
    const jobRole = event.target.value;
    setSelectedJobRole(jobRole);
    setDescription(
      data.departments[selectedDepartment]?.job_roles[jobRole]?.abstract || ""
    );
  };

  const handleCriteriaChange = (key, field, value) => {
    setCriteriaData((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value,
      },
    }));
  };

  return (
    <main className="min-h-screen w-screen bg-[#eee] flex items-center justify-center py-8">
      <div className="form-page bg-white w-[80%] rounded-xl z-10 flex justify-center items-center py-8 px-12 md:w-2/4">
        <div className="box-content w-full">
          <h1 className="text-4xl text-[#333] font-semibold mb-12">
            Create New Panel
          </h1>
          <form>
            <Grid
              sx={{ display: "flex", flexDirection: "column", gap: "1.5rem 0" }}
            >
              {/* Row 1 */}
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                {/* Department */}
                <Grid size={6}>
                  <FormControl fullWidth>
                    <InputLabel id="department-label">Department</InputLabel>
                    <Select
                      labelId="department-label"
                      id="department"
                      label="Department"
                      value={selectedDepartment}
                      onChange={handleDepartmentChange}
                    >
                      {Object.keys(data.departments).map((department) => (
                        <MenuItem key={department} value={department}>
                          {department}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Job Role */}
                <Grid size={6}>
                  <FormControl fullWidth>
                    <InputLabel id="job-role-label">Job Role</InputLabel>
                    <Select
                      labelId="job-role-label"
                      id="job-role"
                      label="Job Role"
                      value={selectedJobRole}
                      onChange={handleJobRoleChange}
                      disabled={!selectedDepartment}
                    >
                      {jobRoles.map((jobRole) => (
                        <MenuItem key={jobRole} value={jobRole}>
                          {jobRole}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              {/* Row 2 */}
              <Grid item>
                <TextField
                  id="board-subject"
                  label="Interview Board Subject"
                  variant="outlined"
                  fullWidth
                />
              </Grid>

              {/* Row 3 */}
              <Grid item>
                <TextField
                  label="Interview Board Description"
                  multiline
                  rows={6}
                  fullWidth
                  variant="outlined"
                  value={description}
                  sx={{
                    "& textarea": {
                      resize: "none", // Disable resizing
                    },
                  }}
                />
              </Grid>

              <div className="flex items-center gap-x-4">
                <p className="text-[#1c89c0] font-medium">
                  Available experts: 32
                </p>

                
                {/* <Tooltip title="Delete"/>
                  <GrCircleInformation style={{
                      color:"#464646",
                      fontSize: "1.1rem"
                    }}/>
                <Tooltip/> */}
                
              </div>

              {/* Row 4 */}
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                columns={12}
              >
                {/* number of pannels */}
                <Grid size={4}>
                  <FormControl fullWidth>
                    <InputLabel id="panels-label">No. of Panels</InputLabel>
                    <Select
                      labelId="panels-label"
                      id="panels"
                      label="No. of Panels"
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <MenuItem key={num} value={num}>
                          {num}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* number of experts in panel */}
                <Grid size={4}>
                  <FormControl fullWidth>
                    <InputLabel id="experts-label">No. of Experts</InputLabel>
                    <Select
                      labelId="experts-label"
                      id="experts"
                      label="No. of Experts"
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <MenuItem key={num} value={num}>
                          {num}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* date of interview */}
                <Grid size={4}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Select a Date"
                      inputFormat="DD/MM/YYYY"
                      renderInput={(params) => (
                        <TextField {...params} fullWidth variant="outlined" />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>

              <Accordion
                sx={{
                  boxShadow: "none", // Remove box shadow
                  border: "1px solid #ccc", // Add a simple border
                  "&:before": {
                    display: "none", // Remove the default MUI divider line
                  },
                  "& .MuiAccordionSummary-root": {
                    minHeight: "48px", // Optional: Adjust summary height for a cleaner look
                  },
                  "& .MuiAccordionSummary-root.Mui-expanded": {
                    minHeight: "48px", // Maintain height consistency when expanded
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<IoMdArrowDropdown />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <h1 className="font-semibold text-[#1c89c0] text-lg">
                    Advance Settings
                  </h1>
                </AccordionSummary>
                <AccordionDetails>
                  {Object.entries(criteriaData).map(([key, value]) => (
                    <div
                      key={key}
                      style={{
                        marginBottom: "1rem",
                        display: "flex",
                        justifyContent: "space-between",
                        paddingRight: "5rem",
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={value.isSelected}
                            onChange={(e) =>
                              handleCriteriaChange(
                                key,
                                "isSelected",
                                e.target.checked
                              )
                            }
                          />
                        }
                        label={key}
                      />
                      {value.isSelected && (
                        <TextField
                          id="standard-number"
                          type="number"
                          variant="standard"
                          value={value.detail}
                          onChange={(e) =>
                            handleCriteriaChange(key, "detail", e.target.value)
                          }
                          slotProps={{
                            inputLabel: {
                              shrink: true,
                            },
                          }}
                          style={{
                            width: "5rem",
                            marginLeft: "3rem",
                          }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">%</InputAdornment>
                            ),
                          }}
                        />
                      )}
                    </div>
                  ))}
                </AccordionDetails>
              </Accordion>
            </Grid>

            <div className="flex gap-x-4 mt-6">
              <Button
                variant="contained"
                sx={{
                  padding: "0.75rem 1.8rem",
                  width: "8rem",
                  background: "#F9F9F9",
                  boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;",
                  textTransform: "capitalize",
                  fontWeight: "600",
                  color: "#464646",
                  "&:hover": {
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px", // Remove the shadow on hover
                  },
                }}
                onClick={() => {
                  navigate("/rachead/pannels");
                }}
              >
                Discard
              </Button>

              <Button
                variant="contained"
                sx={{
                  padding: "0.75rem 1.8rem",
                  width: "8rem",
                  textTransform: "capitalize",
                  fontWeight: "600",
                  backgroundImage:
                    "linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%)",
                  boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;",
                  "&:hover": {
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px", // Remove the shadow on hover
                  },
                }}
                onClick={handleFormSubmit}
              >
                Create
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default CreatePanelForm;
