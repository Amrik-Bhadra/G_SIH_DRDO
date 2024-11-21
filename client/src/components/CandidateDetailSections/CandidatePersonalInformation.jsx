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
  const [errors, setErrors] = useState({
    age: "",
    phoneNo: "",
    recoveryEmail: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Clear error for the specific field
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));

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

  const validateForm = () => {
    let isValid = true;
    const { age, phoneNo, recoveryEmail } = userData.personalInfo;

    // Validate Age
    if (!age || age < 18 || age > 120) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        age: "Age must be a number between 18 and 120.",
      }));
      isValid = false;
    }

    // Validate Phone Number
    const phoneRegex = /^\d{10}$/;
    if (!phoneNo || !phoneRegex.test(phoneNo)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phoneNo: "Phone number must be 10 digits.",
      }));
      isValid = false;
    }

    // Validate Email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!recoveryEmail || !emailRegex.test(recoveryEmail)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        recoveryEmail: "Please enter a valid email address.",
      }));
      isValid = false;
    }

    return isValid;
  };

  return (
    <>
      <h1 className="text-2xl font-semibold text-[#0077b6]">
        1. Personal Information
      </h1>
      <div className="flex flex-col gap-7">
        {/* Name Group */}
        <div className="w-full flex gap-3">
          <TextField
            id="outlined-first-name"
            label="First Name"
            type="text"
            required
            value={userData.personalInfo.firstName}
            onChange={handleInputChange}
            name="firstName"
            fullWidth
          />
          <TextField
            id="outlined-middle-name"
            label="Middle Name"
            type="text"
            value={userData.personalInfo.middleName}
            onChange={handleInputChange}
            name="middleName"
            fullWidth
          />
          <TextField
            id="outlined-last-name"
            label="Last Name"
            type="text"
            required
            value={userData.personalInfo.lastName}
            onChange={handleInputChange}
            name="lastName"
            fullWidth
          />
        </div>

        {/* Phone Number and Govt ID */}
        <div className="w-full flex gap-3">
          <TextField
            id="outlined-phone-no"
            label="Phone No"
            type="text"
            required
            name="phoneNo"
            value={userData.personalInfo.phoneNo}
            onChange={handleInputChange}
            error={!!errors.phoneNo}
            helperText={errors.phoneNo}
          />
          <FormControl variant="outlined" sx={{ minWidth: 200 }}>
            <InputLabel id="govt-id-type-label">Govt. ID Type</InputLabel>
            <Select
              labelId="govt-id-type-label"
              id="govt-id-type"
              label="Govt. ID Type"
              required
              name="govtIdType"
              onChange={handleInputChange}
              value={userData.personalInfo.govtIdType}
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
            id="outlined-govt-id-no"
            label="Govt ID No"
            type="text"
            required
            name="govtIdNo"
            value={userData.personalInfo.govtIdNo}
            onChange={handleInputChange}
          />
        </div>

        {/* Gender, Age, Recovery Email */}
        <div className="w-full flex gap-3">
          <FormControl sx={{ flexWrap: "nowrap" }}>
            <FormLabel id="gender-label">Gender</FormLabel>
            <RadioGroup
              row
              aria-labelledby="gender-label"
              name="gender"
              value={userData.personalInfo.gender}
              onChange={handleInputChange}
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
          </FormControl>

          <TextField
            id="outlined-age"
            label="Age"
            type="number"
            required
            name="age"
            value={userData.personalInfo.age}
            onChange={handleInputChange}
            error={!!errors.age}
            helperText={errors.age}
          />

          <TextField
            id="outlined-recovery-email"
            label="Recovery Email"
            type="email"
            required
            name="recoveryEmail"
            value={userData.personalInfo.recoveryEmail}
            onChange={handleInputChange}
            error={!!errors.email}
            helperText={errors.email}
          />
        </div>

        {/* Address Details */}
        <TextField
          id="outlined-address"
          label="Address"
          type="text"
          required
          name="address"
          value={userData.personalInfo.address}
          onChange={handleInputChange}
          fullWidth
        />

        {/* Pincode, City, and State */}
        <div className="w-full flex gap-3">
          <TextField
            id="outlined-pincode"
            label="Pin Code"
            type="text"
            required
            name="pincode"
            onChange={handlePincodeChange}
            fullWidth
          />
          <TextField
            id="outlined-city"
            label="City"
            type="text"
            required
            name="city"
            value={city}
            onChange={handleCityStateChange}
            fullWidth
          />
          <TextField
            id="outlined-state"
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
