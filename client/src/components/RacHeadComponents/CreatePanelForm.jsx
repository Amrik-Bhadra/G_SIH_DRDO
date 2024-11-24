import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

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

  return (
    <main className="screen-bg min-h-screen w-screen bg-[#eee] flex items-center justify-center relative top-0 left-0">
      <div className="form-page bg-white w-[80%] rounded-xl z-10 flex justify-center items-center py-8 px-12 md:w-2/4">
        <div className="box-content w-full">
          <h1 className="text-4xl text-[#333] font-semibold mb-12">
            Create New Panel
          </h1>
          <form>
            <Grid container spacing={3}>
              {/* Row 1 */}
              <Grid item xs={12} md={6}>
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
              <Grid item xs={12} md={6}>
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

              {/* Row 2 */}
              <Grid item xs={12}>
                <TextField
                  id="board-subject"
                  label="Interview Board Subject"
                  variant="outlined"
                  fullWidth
                />
              </Grid>

              {/* Row 3 */}
              <Grid item xs={12}>
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

              {/* Row 4 */}
              <Grid item xs={12} md={6}>
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
              <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Select a Date"
                    inputFormat="DD/MM/YYYY" // This will format the date to dd/mm/yyyy
                    renderInput={(params) => (
                      <TextField {...params} fullWidth variant="outlined" />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
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
