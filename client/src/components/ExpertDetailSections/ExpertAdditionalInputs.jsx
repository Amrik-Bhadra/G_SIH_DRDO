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
  Chip,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { toast } from "react-hot-toast";

const ExpertAdditionalInputs = ({ userData, setUserData }) => {
  const [certificationEntry, setCertificationEntry] = useState({
    name: "",
    issuedBy: "",
    year: "",
  });
  const [portfolioLink, setPortfolioLink] = useState("");
  const [publicationEntry, setPublicationEntry] = useState({
    title: "",
    link: "",
    year: "",
  });
  const [language, setLanguage] = useState("");

  const handleInputChange = (e, setEntry) => {
    const { name, value } = e.target;
    setEntry((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add a certification
  const handleAddCertification = () => {
    if (!certificationEntry.name || !certificationEntry.issuedBy || !certificationEntry.year) {
      toast.error("Please fill all certification fields.");
      return;
    }

    setUserData((prev) => ({
      ...prev,
      additionalInputs: {
        ...prev.additionalInputs,
        certifications: [
          ...prev.additionalInputs.certifications,
          { ...certificationEntry, id: new Date().getTime() },
        ],
      },
    }));

    setCertificationEntry({ name: "", issuedBy: "", year: "" });
  };

  // Add a portfolio link
  const handleAddPortfolio = () => {
    if (!portfolioLink) {
      toast.error("Please provide a portfolio link.");
      return;
    }

    setUserData((prev) => ({
      ...prev,
      additionalInputs: {
        ...prev.additionalInputs,
        portfolioLinks: [
          ...prev.additionalInputs.portfolioLinks,
          { link: portfolioLink, id: new Date().getTime() },
        ],
      },
    }));

    setPortfolioLink("");
  };

  // Add a publication
  const handleAddPublication = () => {
    if (!publicationEntry.title || !publicationEntry.link || !publicationEntry.year) {
      toast.error("Please fill all publication fields.");
      return;
    }

    setUserData((prev) => ({
      ...prev,
      additionalInputs: {
        ...prev.additionalInputs,
        publications: [
          ...prev.additionalInputs.publications,
          { ...publicationEntry, id: new Date().getTime() },
        ],
      },
    }));

    setPublicationEntry({ title: "", link: "", year: "" });
  };

  // Add a language
  const handleAddLanguage = () => {
    if (!language) {
      toast.error("Please provide a language.");
      return;
    }

    setUserData((prev) => ({
      ...prev,
      additionalInputs: {
        ...prev.additionalInputs,
        languagesKnown: [
          ...prev.additionalInputs.languagesKnown,
          { name: language, id: new Date().getTime() },
        ],
      },
    }));

    setLanguage("");
  };

  // Remove a certification, publication, or language
  const handleRemoveItem = (type, id) => {
    setUserData((prev) => ({
      ...prev,
      additionalInputs: {
        ...prev.additionalInputs,
        [type]: prev.additionalInputs[type].filter((item) => item.id !== id),
      },
    }));
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-[#0077b6]">4. Additional Inputs</h1>
      <div className="overflow-y-auto">
        {/* Certifications */}
        <section className="my-6">
          <Typography variant="h6" className="mb-2">
            Certifications
          </Typography>
          <div className="flex gap-3 mb-4">
            <TextField
              label="Certification Name"
              name="name"
              value={certificationEntry.name}
              onChange={(e) => handleInputChange(e, setCertificationEntry)}
              fullWidth
              
            />
            <TextField
              label="Issued By"
              name="issuedBy"
              value={certificationEntry.issuedBy}
              onChange={(e) => handleInputChange(e, setCertificationEntry)}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel id="certification-year-label">Year</InputLabel>
              <Select
                labelId="certification-year-label"
                label="year"
                name="year"
                value={certificationEntry.year}
                onChange={(e) => handleInputChange(e, setCertificationEntry)}
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
            <Button variant="contained" onClick={handleAddCertification} sx={{ whiteSpace: "nowrap" }}>
              Add
            </Button>
          </div>
          {userData.additionalInputs.certifications.map((cert) => (
            <div
              key={cert.id}
              className="flex justify-between items-center bg-blue-100 p-3 rounded-lg shadow-sm mb-2"
            >
              <Typography>
                {cert.name} - {cert.issuedBy} ({cert.year})
              </Typography>
              <Tooltip title="Remove">
                <IconButton onClick={() => handleRemoveItem("certifications", cert.id)}>
                  <Delete color="error" />
                </IconButton>
              </Tooltip>
            </div>
          ))}
        </section>

        {/* Publications */}
        <section className="my-6">
          <Typography variant="h6" className="mb-2">
            Publications
          </Typography>
          <div className="flex gap-3 mb-4">
            <TextField
              label="Publication Title"
              name="title"
              value={publicationEntry.title}
              onChange={(e) => handleInputChange(e, setPublicationEntry)}
              fullWidth
            />
            <TextField
              label="Link"
              name="link"
              value={publicationEntry.link}
              onChange={(e) => handleInputChange(e, setPublicationEntry)}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel id="publication-year-label">Year</InputLabel>
              <Select
                labelId="publication-year-label"
                label="year"
                name="year"
                value={publicationEntry.year}
                onChange={(e) => handleInputChange(e, setPublicationEntry)}
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
            <Button variant="contained" onClick={handleAddPublication}>
              Add
            </Button>
          </div>
          {userData.additionalInputs.publications.map((pub) => (
            <div
              key={pub.id}
              className="flex justify-between items-center bg-yellow-100 p-3 rounded-lg shadow-sm mb-2"
            >
              <Typography>
                {pub.title} ({pub.year})
              </Typography>
              <Tooltip title="Remove">
                <IconButton onClick={() => handleRemoveItem("publications", pub.id)}>
                  <Delete color="error" />
                </IconButton>
              </Tooltip>
            </div>
          ))}
        </section>

        {/* Languages Known */}
        <section className="my-6">
          <Typography variant="h6" className="mb-2">
            Languages Known
          </Typography>
          <div className="flex gap-3 mb-4">
            <TextField
              label="Language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              fullWidth
            />
            <Button variant="contained" onClick={handleAddLanguage}>
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {userData.additionalInputs.languagesKnown.map((lang) => (
              <Chip
                key={lang.id}
                label={lang.name}
                onDelete={() => handleRemoveItem("languagesKnown", lang.id)}
                color="secondary"
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ExpertAdditionalInputs;
