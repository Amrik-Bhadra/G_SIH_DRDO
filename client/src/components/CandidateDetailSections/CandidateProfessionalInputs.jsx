import React, { useState } from "react";
import {
  TextField,
  Button,
  IconButton,
  Typography,
  Tooltip,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { toast } from "react-hot-toast";

const CandidateProfessionalInputs = ({ userData, setUserData }) => {
  const [profileEntry, setProfileEntry] = useState({
    platform: "",
    url: "",
  });
  const [hobbyEntry, setHobbyEntry] = useState({
    activity: "",
    description: "",
  });

  const handleInputChange = (e, setEntry) => {
    const { name, value } = e.target;
    setEntry((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddProfile = () => {
    if (!profileEntry.platform || !profileEntry.url) {
      toast.error("Please provide both platform and URL.");
      return;
    }

    setUserData((prev) => ({
      ...prev,
      professionalProfiles: [
        ...(prev.professionalProfiles || []), // Ensure it's an array
        { ...profileEntry, id: new Date().getTime() },
      ],
    }));

    setProfileEntry({ platform: "", url: "" });
  };

  const handleAddHobby = () => {
    if (!hobbyEntry.activity || !hobbyEntry.description) {
      toast.error("Please fill both activity and description.");
      return;
    }

    setUserData((prev) => ({
      ...prev,
      hobbies: [
        ...(prev.hobbies || []), // Ensure it's an array
        { ...hobbyEntry, id: new Date().getTime() },
      ],
    }));

    setHobbyEntry({ activity: "", description: "" });
  };

  const handleRemoveItem = (type, id) => {
    setUserData((prev) => ({
      ...prev,
      [type]: (prev[type] || []).filter((item) => item.id !== id),
    }));
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-[#0077b6]">
        5. Professional Profiles & Extra-Curricular Activities
      </h1>
      <div className="overflow-y-auto">
        {/* Professional Profiles */}
        <section className="my-6">
          <Typography variant="h6" className="mb-2">
            Professional Profiles
          </Typography>
          <div className="flex gap-3 mb-4">
            <TextField
              label="Platform (e.g., LinkedIn)"
              name="platform"
              value={profileEntry.platform}
              onChange={(e) => handleInputChange(e, setProfileEntry)}
              fullWidth
            />
            <TextField
              label="URL"
              name="url"
              value={profileEntry.url}
              onChange={(e) => handleInputChange(e, setProfileEntry)}
              fullWidth
            />
            <Button variant="contained" onClick={handleAddProfile}>
              Add
            </Button>
          </div>
          {(userData.professionalProfiles || []).map((profile) => (
            <div
              key={profile.id}
              className="flex justify-between items-center bg-blue-100 p-3 rounded-lg shadow-sm mb-2"
            >
            <Typography
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
            }}
            >
            <span style={{ fontWeight: "bold" }}>{profile.platform}:</span>
                <a
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                    color: "#0077b6", // Change to your desired color
                    textDecoration: "underline",
                    fontWeight: "500",
                }}>
                View Profile
                </a>
            </Typography>

              <Tooltip title="Remove">
                <IconButton
                  onClick={() => handleRemoveItem("professionalProfiles", profile.id)}
                >
                  <Delete color="error" />
                </IconButton>
              </Tooltip>
            </div>
          ))}
        </section>

        {/* Extra-Curricular Activities / Hobbies */}
        <section className="my-6">
          <Typography variant="h6" className="mb-2">
            Extra-Curricular Activities / Hobbies
          </Typography>
          <div className="flex gap-3 mb-4">
            <TextField
              label="Activity"
              name="activity"
              value={hobbyEntry.activity}
              onChange={(e) => handleInputChange(e, setHobbyEntry)}
              fullWidth
            />
            <TextField
              label="Description"
              name="description"
              value={hobbyEntry.description}
              onChange={(e) => handleInputChange(e, setHobbyEntry)}
              fullWidth
            />
            <Button variant="contained" onClick={handleAddHobby}>
              Add
            </Button>
          </div>
          {(userData.hobbies || []).map((hobby) => (
            <div
              key={hobby.id}
              className="flex justify-between items-center bg-green-100 p-3 rounded-lg shadow-sm mb-2"
            >
              <Typography>
                {hobby.activity}: {hobby.description}
              </Typography>
              <Tooltip title="Remove">
                <IconButton
                  onClick={() => handleRemoveItem("hobbies", hobby.id)}
                >
                  <Delete color="error" />
                </IconButton>
              </Tooltip>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default CandidateProfessionalInputs;
