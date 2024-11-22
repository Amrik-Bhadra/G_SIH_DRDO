import React, { useState } from "react";
import { TextField, Button, Chip, Typography, FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";

const CandidateCriticalSection = ({ userData, setUserData }) => {
  const [skillInput, setSkillInput] = useState("");
  const [expertiseInput, setExpertiseInput] = useState("");

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserData((prev) => ({
        ...prev,
        criticalInputs: {
          ...prev.criticalInputs,
          resume: file.name,
        },
      }));
    }
  };

  const handleAddSkill = () => {
    if (skillInput.trim() === "") return;
    setUserData((prev) => ({
      ...prev,
      criticalInputs: {
        ...prev.criticalInputs,
        skills: [...(prev.criticalInputs.skills || []), skillInput.trim()],
      },
    }));
    setSkillInput("");
  };

  const handleAddExpertise = () => {
    if (expertiseInput.trim() === "") return;
    setUserData((prev) => ({
      ...prev,
      criticalInputs: {
        ...prev.criticalInputs,
        expertise: [...(prev.criticalInputs.expertise || []), expertiseInput.trim()],
      },
    }));
    setExpertiseInput("");
  };

  const handleRemoveChip = (type, index) => {
    setUserData((prev) => ({
      ...prev,
      criticalInputs: {
        ...prev.criticalInputs,
        [type]: prev.criticalInputs[type].filter((_, i) => i !== index),
      },
    }));
  };

  const handleExperienceChange = (e) => {
    setUserData((prev) => ({
      ...prev,
      criticalInputs: {
        ...prev.criticalInputs,
        yearsOfExperience: e.target.value,
      },
    }));
  };

  return (
    <>
      <h1 className="text-2xl font-semibold text-[#0077b6]">3. Critical Inputs</h1>
      <div className="flex flex-col gap-5">
        {/* Resume Upload and Years of Experience */}
        <div className="w-[50%] flex gap-10 items-end">
          <div>
            <Typography variant="body1" gutterBottom>
              Upload Resume
            </Typography>
            <Button
              variant="outlined"
              component="label"
              startIcon={<CloudUpload />}
            >
              {userData.criticalInputs?.resume || "Upload Resume"}
              <input
                type="file"
                hidden
                accept=".pdf,.doc,.docx"
                onChange={handleResumeUpload}
              />
            </Button>
          </div>
          <div style={{ flex: 1 }}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="experience-label">Years of Experience</InputLabel>
              <Select
                labelId="experience-label"
                label="Years of Experience"
                id="experience"
                name="yearsOfExperience"
                value={userData.criticalInputs.yearsOfExperience || ""}
                onChange={handleExperienceChange}
                required
              >
                <MenuItem value="" disabled>
                  Select Years
                </MenuItem>
                {Array.from({ length: 41 }, (_, i) => (
                  <MenuItem key={i} value={i}>
                    {i} {i === 1 ? "Year" : "Years"}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>

        {/* Skills Input */}
        <div className="w-full">
          <Typography variant="body1" gutterBottom>
            Add Skills
          </Typography>
          <div className="flex gap-3">
            <TextField
              label="Skill"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              fullWidth
            />
            <Button variant="contained" onClick={handleAddSkill}>
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {userData.criticalInputs?.skills?.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                onDelete={() => handleRemoveChip("skills", index)}
                color="primary"
              />
            ))}
          </div>
        </div>

        {/* Expertise Input */}
        <div className="w-full">
          <Typography variant="body1" gutterBottom>
            Add Areas of Experience
          </Typography>
          <div className="flex gap-3">
            <TextField
              label="Experience"
              value={expertiseInput}
              onChange={(e) => setExpertiseInput(e.target.value)}
              fullWidth
            />
            <Button variant="contained" onClick={handleAddExpertise}>
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {userData.criticalInputs?.expertise?.map((item, index) => (
              <Chip
                key={index}
                label={item}
                onDelete={() => handleRemoveChip("expertise", index)}
                color="secondary"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CandidateCriticalSection;
