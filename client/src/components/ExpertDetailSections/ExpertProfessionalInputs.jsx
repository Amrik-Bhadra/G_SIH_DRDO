import React, { useState } from "react";
import {
  TextField,
  Button,
  IconButton,
  Typography,
  Tooltip,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { toast } from "react-hot-toast";

const ExpertProfessionalInputs = ({ userData, setUserData }) => {
  const [profileEntry, setProfileEntry] = useState({
    platform: "",
    url: "",
  });
  const [affiliationEntry, setAffiliationEntry] = useState({
    organization: "",
    membershipID: "",
    yearJoined: "",
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
        ...prev.professionalProfiles,
        { ...profileEntry, id: new Date().getTime() },
      ],
    }));

    setProfileEntry({ platform: "", url: "" });
  };

  const handleAddAffiliation = () => {
    if (
      !affiliationEntry.organization ||
      !affiliationEntry.membershipID ||
      !affiliationEntry.yearJoined
    ) {
      toast.error("Please fill all affiliation fields.");
      return;
    }

    setUserData((prev) => ({
      ...prev,
      professionalAffiliations: [
        ...prev.professionalAffiliations,
        { ...affiliationEntry, id: new Date().getTime() },
      ],
    }));

    setAffiliationEntry({ organization: "", membershipID: "", yearJoined: "" });
  };

  const handleRemoveItem = (type, id) => {
    setUserData((prev) => ({
      ...prev,
      [type]: userData[type].filter((item) => item.id !== id),
    }));
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-[#0077b6]">
        5. Professional Profiles & Affiliations
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
          {userData.professionalProfiles.map((profile) => (
            <div
              key={profile.id}
              className="flex justify-between items-center bg-blue-100 p-3 rounded-lg shadow-sm mb-2"
            >
              <Typography>
                {profile.platform}: {profile.url}
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

        {/* Professional Affiliations */}
        <section className="my-6">
          <Typography variant="h6" className="mb-2">
            Professional Affiliations
          </Typography>
          <div className="flex gap-3 mb-4">
            <TextField
              label="Organization"
              name="organization"
              value={affiliationEntry.organization}
              onChange={(e) => handleInputChange(e, setAffiliationEntry)}
              fullWidth
            />
            <TextField
              label="Membership ID"
              name="membershipID"
              value={affiliationEntry.membershipID}
              onChange={(e) => handleInputChange(e, setAffiliationEntry)}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel id="affiliation-year-label">Year Joined</InputLabel>
              <Select
                labelId="affiliation-year-label"
                name="yearJoined"
                value={affiliationEntry.yearJoined}
                onChange={(e) => handleInputChange(e, setAffiliationEntry)}
              >
                <MenuItem value="" disabled>
                  Select Year
                </MenuItem>
                {Array.from({ length: 2030 - 1970 + 1 }, (_, i) => {
                  const year = 1970 + i;
                  return (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Button variant="contained" onClick={handleAddAffiliation}>
              Add
            </Button>
          </div>
          {userData.professionalAffiliations.map((affiliation) => (
            <div
              key={affiliation.id}
              className="flex justify-between items-center bg-green-100 p-3 rounded-lg shadow-sm mb-2"
            >
              <Typography>
                {affiliation.organization} ({affiliation.yearJoined}) - ID:{" "}
                {affiliation.membershipID}
              </Typography>
              <Tooltip title="Remove">
                <IconButton
                  onClick={() =>
                    handleRemoveItem("professionalAffiliations", affiliation.id)
                  }
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

export default ExpertProfessionalInputs;
