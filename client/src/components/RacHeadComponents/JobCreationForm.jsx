import React, { useState } from 'react';
import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid';
import TextField from "@mui/material/TextField";
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import pdf from 'pdf-parse';

const JobCreationForm = () => {
    const [isManual, setIsManual] = useState(true);
    const [formData, setFormData] = useState({});
    const [tags, setTags] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [fileNames, setFileNames] = useState([]);

    const handleChange = (event) => {
        setSelectedDepartment(event.target.value);
    };

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const handleFileUpload = (event) => {
        const files = event.target.files;
        const fileArray = Array.from(files).map((file) => file.name); // Get file names
        setFileNames(fileArray); // Update the state with file names
    };

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const arrayBuffer = await file.arrayBuffer(); // Read file as an array buffer

            // Use pdf-parse to extract text from the PDF
            const data = await pdf(arrayBuffer);
            console.log("Extracted Text:", data.text);

            setFormData({ extractedText: data.text }); // Store extracted text in formData
            setIsManual(false); // Switch to auto-filled mode
        } catch (error) {
            console.error("Error processing PDF file:", error);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && inputValue.trim()) {
            e.preventDefault(); 
            setTags((prev) => [...prev, inputValue.trim()]);
            setInputValue("");
        }
    };

    const handleDeleteTag = (tagToDelete) => {
        setTags((prev) => prev.filter((tag) => tag !== tagToDelete));
    };

    return (
        <main className="h-[100vh] w-[100vw] bg-[#eee] flex justify-center items-center">
            <div className="form-div bg-white w-[80%] h-fit py-8 rounded-lg shadow-sm flex flex-col justify-center items-center gap-y-8 text-center p-4">
                <h1 className='font-semibold text-xl'>Create Job Application</h1>
                <div className='flex flex-row justify-between w-1/3'>
                    
                    <Button
                        component="label"
                        variant="contained"
                        sx={{
                            backgroundColor: "#0e8cca",
                            padding: "0.8em 1rem",
                            fontWeight: 600,
                            textTransform: "capitalize",
                            letterSpacing: "2px",
                            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;",
                        }}
                    >
                        Upload PDF
                        <input
                            type="file"
                            accept="application/pdf"
                            hidden
                            onChange={handleUpload}
                        />
                    </Button>

                    <Button
                        type='submit'
                        variant="contained"
                        sx={{
                            backgroundColor: "#0e8cca",
                            padding: "0.8em 1rem",
                            fontWeight: 600,
                            textTransform: "capitalize",
                            letterSpacing: "2px",
                            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;",
                        }}
                    >
                        Create Job
                    </Button>
                </div>

                <div className="w-full px-4 mt-6">
                    {isManual ? (
                        <form className="flex flex-col gap-y-4 w-full">
                            <Grid container spacing={2} xs={12}>
                                <Grid item xs={4}>
                                    <TextField
                                        id="JobTitle"
                                        label="Job Title"
                                        type="title"
                                        autoComplete="job title"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        id="JobRole"
                                        label="Job Role"
                                        type="role"
                                        autoComplete="role"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <div style={{ margin: "1px 0", display: "flex", flexDirection: "column" }}>
                                        <select
                                            id="department"
                                            value={selectedDepartment}
                                            onChange={handleChange}
                                            style={{
                                                padding: "17px",
                                                fontSize: "16px",
                                                borderRadius: "4px",
                                                border: "1px solid #ccc",
                                                width: "100%",
                                                maxWidth: "400px",
                                                color: "gray"
                                            }}
                                        >
                                            <option value="" disabled>
                                                Select Department
                                            </option>
                                            <option value="IT">IT</option>
                                            <option value="HR">HR</option>
                                            <option value="Marketing">Marketing</option>
                                            <option value="Finance">Finance</option>
                                        </select>
                                        {selectedDepartment && (
                                            <p style={{ marginTop: "10px" }}>
                                                Selected Department: <strong>{selectedDepartment}</strong>
                                            </p>
                                        )}
                                    </div>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} >
                                <Grid item xs={6}>
                                    <TextField
                                        id="JobDescription"
                                        label="Job Description"
                                        type="description"
                                        autoComplete="description"
                                        fullWidth
                                        multiline
                                        rows={4}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Box>
                                        <TextField
                                            label="Responsibilities"
                                            variant="outlined"
                                            fullWidth
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            placeholder="Press Enter to add responsibility"
                                        />
                                        <Box mt={2} display="flex" flexWrap="wrap" gap={1}>
                                            {tags.map((tag, index) => (
                                                <Chip
                                                    key={index}
                                                    label={tag}
                                                    onDelete={() => handleDeleteTag(tag)}
                                                    color="primary"
                                                />
                                            ))}
                                        </Box>

                                        <Box >
                                            <Button
                                                component="label"
                                                role={undefined}
                                                variant="contained"
                                                tabIndex={-1}
                                                startIcon={<CloudUploadIcon />}
                                            >
                                                Upload files
                                                <VisuallyHiddenInput
                                                    type="file"
                                                    onChange={handleFileUpload}
                                                />
                                            </Button>
                                            {fileNames.length > 0 && (
                                                <div>
                                                    {fileNames.join(", ")}
                                                </div>
                                            )}
                                        </Box>
                                    </Box>
                                </Grid>

                            </Grid>

                            <Grid container mt={1} spacing={2} ml={0.5}>

                                <Grid xs={6}>
                                    <TextField
                                        id="MinQualification"
                                        label="Minimum Qualification"
                                        type="qualification"
                                        autoComplete="qualification"
                                        fullWidth

                                    />
                                </Grid>

                                <Grid xs={3}>
                                    <TextField
                                        id="Experience"
                                        label="Experience (yrs)"
                                        type="number"
                                    />
                                </Grid>

                                <Grid xs={3}>
                                    <TextField
                                        id="noOfPanels"
                                        label="Number of Panels"
                                        type="number"
                                    />
                                </Grid>

                            </Grid>
                            <Grid container spacing={2} mt={1}>
                                <Grid xs={3}>
                                    <TextField
                                        id="noOfExperts"
                                        label="Number of Experts"
                                        type="number"
                                    />
                                </Grid>
                                <Grid xs={3}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer>
                                            <DatePicker
                                                label="Application Deadline"
                                                value={formData.applicationDeadline}
                                                onChange={(newValue) =>
                                                    setFormData({ ...formData, applicationDeadline: newValue })
                                                }
                                                renderInput={(params) => <TextField {...params} fullWidth />}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </Grid>
                            </Grid>
                        </form>
                    ) : (
                        <Box>
                            <h3>Extracted Details:</h3>
                            <p>{formData.extractedText}</p>
                        </Box>
                    )}
                </div>
            </div>
        </main>
    );
};

export default JobCreationForm;
