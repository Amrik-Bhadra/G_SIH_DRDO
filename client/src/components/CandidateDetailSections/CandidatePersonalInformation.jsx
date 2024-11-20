import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
} from "@mui/material";
import axios from "axios";

const CandidatePersonalInformation = ({ userData, setUserData }) => {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevStateData) => ({
      ...prevStateData,
      personalInfo: {
        ...prevStateData.personalInfo,
        [name]: value,
      },
    }));
  };

  const handlePincodeChange = async (e) => {
    const pincode = e.target.value;
    setUserData((prevStateData) => ({
      ...prevStateData,
      personalInfo: {
        ...prevStateData.personalInfo,
        pincode: pincode,
      },
    }));

    if (pincode.length === 6) {
      try {
        const response = await axios.get(
          `https://api.postalpincode.in/pincode/${pincode}`
        );
        const data = response.data;

        if (data[0].Status === "Success") {
          const postOffice = data[0].PostOffice[0];
          setCity(postOffice.District);
          setState(postOffice.State);

          setUserData((prevStateData) => ({
            ...prevStateData,
            personalInfo: {
              ...prevStateData.personalInfo,
              city: postOffice.District,
              state: postOffice.State,
            },
          }));
        } else {
          setCity("");
          setState("");
          alert("Invalid Pincode or data not available.");
        }
      } catch (error) {
        console.error("Error fetching pincode data:", error);
      }
    }
  };

  const handleCityStateChange = (e) => {
    const { name, value } = e.target;
    if (name === "city") setCity(value);
    if (name === "state") setState(value);

    setUserData((prevStateData) => ({
      ...prevStateData,
      personalInfo: {
        ...prevStateData.personalInfo,
        [name]: value,
      },
    }));
  };

  return (
    <>
      <h1 className="text-2xl font-semibold text-[#0077b6]">
        1. Personal Information
      </h1>
      <div className="flex flex-col gap-7">
        {/* name group */}
        <div className="w-full flex gap-3">
          <TextField
            id="outlined-password-input"
            label="First Name"
            type="text"
            required
            value={userData.personalInfo.firstName}
            onChange={handleInputChange}
            name="firstName"
            fullWidth
          />
          <TextField
            id="outlined-password-input"
            label="Middle Name"
            type="text"
            value={userData.personalInfo.middleName}
            onChange={handleInputChange}
            name="middleName"
            fullWidth
          />
          <TextField
            id="outlined-password-input"
            label="Last Name"
            type="text"
            required
            value={userData.personalInfo.lastName}
            onChange={handleInputChange}
            name="lastName"
            fullWidth
          />
        </div>

        {/* phone number and govt id */}
        <div className="w-full flex gap-3">
          <TextField
            id="outlined-password-input"
            label="Phone No"
            type="number"
            required
          />
          <FormControl variant="outlined" sx={{ minWidth: 200 }}>
            <InputLabel id="demo-simple-select-label">Govt. ID Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Govt. ID Type"
              required
              name="govtIdType"
              onChange={handleInputChange}
            >
              <MenuItem value="" disabled>
                Select Govt. ID Type
              </MenuItem>
              <MenuItem value="aadhaarcard">Aadhaar Card</MenuItem>
              <MenuItem value="pancard">Pan Card</MenuItem>
              <MenuItem value="drivinglicense">Driving License</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="outlined-password-input"
            label="Govt ID No"
            type="text"
            required
            className="w-[50%]"
            name="govtIdNo"
            onChange={handleInputChange}
          />
        </div>

        <div className="w-full flex gap-3">
          <FormControl sx={{ flexWrap: "nowrap", width: "100%" }}>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Gender
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="gender"
              onChange={handleInputChange}
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
          <TextField
            id="outlined-password-input"
            label="Age"
            type="number"
            required
            name="age"
            value={userData.personalInfo.age}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            id="outlined-password-input"
            label="Recovery Email"
            type="email"
            required
            fullWidth
          />
        </div>

        {/* address details */}
        <TextField
          id="outlined-password-input"
          label="Address"
          type="address"
          required
          sx={{
            height: "100px",
            "& .MuiInputBase-root": {
              height: "100%",
            },
          }}
          name="address"
          onChange={handleInputChange}
        />

        {/* country state zipcode group */}
        <div className="w-full flex gap-3">
          <TextField
            id="outlined-password-input"
            label="Pin Code"
            type="text"
            required
            name="pincode"
            onChange={handlePincodeChange}
            fullWidth
          />
          <TextField
            id="outlined-password-input"
            label="City"
            type="text"
            required
            name="city"
            value={city}
            onChange={handleCityStateChange}
            fullWidth
          />
          <TextField
            id="outlined-password-input"
            label="State"
            type="text"
            required
            name="state"
            value={state}
            onChange={handleCityStateChange}
            fullWidth
          />
        </div>
      </div>
    </>
  );
};

export default CandidatePersonalInformation;
