import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../../styles/Loader";

const CreatePanelForm = () => {
  const base_url = import.meta.env.VITE_BASE_URL;
  const [fetchDepartment, setFetchDepartment] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedJobRole, setSelectedJobRole] = useState("");
  const [jobRoles, setJobRoles] = useState([]);
  const [description, setDescription] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobID, setJobID] = useState("");

  const navigate = useNavigate();

  // Fetching departments data from API
  const fetchJobsData = async () => {
    try {
      const response = await axios.get(`${base_url}/api/job/domainDepartment`, {
        withCredentials: true,
      });
      console.log("API Response:", response?.data?.data); // Debugging log
      setFetchDepartment(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching job data:", error);
    }
  };

  const fetchRoleData = async (domain = "Department A") => {
    try {
      const response = await axios.get(
        `${base_url}/api/job/jobRole/${encodeURIComponent(domain)}`,
        {
          withCredentials: true,
        }
      );
      console.log("Job roles fetched:", response?.data?.data);
      setJobRoles(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching Roles data:", error);
    }
  };

  useEffect(() => {
    fetchJobsData();
  }, []);

  // Handle department selection
  const handleDepartmentChange = async (event) => {
    const department = event.target.value;
    setSelectedDepartment(department);
    setSelectedJobRole(""); // Reset job role selection
    setDescription(""); // Reset description
    console.log(department);
    await fetchRoleData(department);
  };

  // Handle job role selection
  const handleJobRoleChange = (event) => {
    const jobRole = event.target.value;
    console.log("Selected Job Role:", jobRole);
    console.log("Available Job Roles:", jobRoles);
    const selectedRole = jobRoles.find((role) => role?.jobRole === jobRole);
    const jobDescription = selectedRole ? selectedRole.jobDescription : "";
    const jobTitle = selectedRole ? selectedRole.jobTitle : "";
    const job_id = selectedRole ? selectedRole._id : "";
    console.log("Job Description:", jobDescription);
    setSelectedJobRole(jobRole);
    setDescription(jobDescription);
    setJobTitle(jobTitle);
    setJobID(job_id);
  };

  // Navigate to the next page
  const [isLoading, setIsLoading] = useState(false);
  const handleNextPage = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate(`/expert/pannelAdvancedSettings/${jobID}`);
    }, 15000);
  };

  return (
    <main className="min-h-screen w-screen bg-[#eee] flex items-center justify-center py-8">
      {isLoading && <Loader />}
      <div className="form-page bg-white w-[80%] rounded-xl z-10 flex justify-center items-center py-8 px-12 md:w-2/4">
        <div className="box-content w-full">
          <h1 className="text-4xl text-[#333] font-semibold mb-12">
            Create New Panel: Step 1
          </h1>
          <form>
            <Grid
              sx={{ display: "flex", flexDirection: "column", gap: "1.5rem 0" }}
            >
              {/* Row 1 */}
              <Grid container spacing={2}>
                {/* Department */}
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
                      {fetchDepartment.map((department, index) => (
                        <MenuItem key={index} value={department}>
                          {department}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Job Role */}
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
                      {jobRoles.map((jr, index) => (
                        <MenuItem key={index} value={jr?.jobRole}>
                          {jr?.jobRole}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              {/* Selected Department */}
              <Grid item>
                <TextField
                  id="jobTitle"
                  label="Job Title"
                  variant="outlined"
                  fullWidth
                  value={jobTitle}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>

              {/* Description */}
              <Grid item>
                <TextField
                  label="Job Role Description"
                  multiline
                  rows={6}
                  fullWidth
                  value={description}
                  variant="outlined"
                  sx={{
                    "& textarea": {
                      resize: "none", // Disable resizing
                    },
                  }}
                />
              </Grid>
            </Grid>

            <div className="flex gap-x-4 mt-6">
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
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  },
                }}
                onClick={handleNextPage}
              >
                Next
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default CreatePanelForm;
