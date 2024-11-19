import React, { useState } from "react";
import { TextField, Button, Chip, Typography } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";

const ExpertCriticalSection = ({ userData, setUserData }) => {
  const [skillInput, setSkillInput] = useState("");
  const [expertiseInput, setExpertiseInput] = useState("");

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserData((prev) => ({
        ...prev,
        criticalInputs: {
          ...prev.criticalInputs,
          resume: file.name, // Or use file.path for more details in Node environments
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

  return (
    <>
      <h1 className="text-2xl font-semibold text-[#0077b6]">3. Critical Inputs</h1>
      <div className="flex flex-col gap-5">
        {/* Resume Upload */}
        <div className="w-full">
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
            Add Areas of Expertise
          </Typography>
          <div className="flex gap-3">
            <TextField
              label="Expertise"
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

export default ExpertCriticalSection;
