import React, { useState } from "react";
import { Button } from "@mui/material";
import { toast } from "react-hot-toast";
import CandidatePersonalInformation from "../../components/CandidateDetailSections/CandidatePersonalInformation";
import CandidateEducationalInformation from "../../components/CandidateDetailSections/CandidateEducationalInformation";

const CandidateCompleteDetail = () => {
  const [stepNo, setStepNo] = useState(1);
  const [userData, setUserData] = useState({
    personalInfo: {
      firstName: "",
      middleName: "",
      lastName: "",
      phoneNo: "",
      gender: "",
      govtIdType: "",
      govtIdNo: "",
      recoveryEmail: "",
      age: "",
      pincode: "",
      city: "",
      state: "",
      address: "",
    },
    educationalInfo: [],
  });

  const validateStep = () => {
    if (stepNo === 1) {
      const {
        firstName,
        lastName,
        phoneNo,
        gender,
        govtIdType,
        govtIdNo,
        recoveryEmail,
        age,
        pincode,
        city,
        state,
        address,
      } = userData.personalInfo;

      // Check required fields
      if (
        !firstName ||
        !lastName ||
        !phoneNo ||
        !gender ||
        !govtIdType ||
        !govtIdNo ||
        !recoveryEmail ||
        !age ||
        !pincode ||
        !city ||
        !state ||
        !address
      ) {
        toast.error("Please fill all the required fields.");
        return false;
      }

      // Validate phone number
      if (!/^\d{10}$/.test(phoneNo)) {
        toast.error("Phone number must be 10 digits.");
        return false;
      }

      // Validate age
      if (isNaN(age) || age < 18 || age > 120) {
        toast.error("Age must be a number between 18 and 120.");
        return false;
      }

      // Validate email
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailRegex.test(recoveryEmail)) {
        toast.error("Please provide a valid email address.");
        return false;
      }
    }

    if (stepNo === 2) {
      if (userData.educationalInfo.length === 0) {
        toast.error("Please add at least one educational detail.");
        return false;
      }
    }

    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStepNo(stepNo + 1);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-[#eee] flex justify-center items-center">
      <form
        className="form-container bg-white rounded-lg p-8 flex flex-col gap-y-8 shadow-md"
        style={{
          width: "95%",
          maxWidth: "900px",
          height: "95%",
          maxHeight: "800px",
          overflowY: "auto",
        }}
      >
        {stepNo === 1 && (
          <CandidatePersonalInformation
            userData={userData}
            setUserData={setUserData}
          />
        )}
        {stepNo === 2 && (
          <CandidateEducationalInformation
            userData={userData}
            setUserData={setUserData}
          />
        )}

        <div className="flex gap-3">
          {stepNo > 1 && (
            <Button
              variant="outlined"
              sx={{ width: "6rem", padding: "0.5rem" }}
              onClick={() => setStepNo(stepNo - 1)}
            >
              Previous
            </Button>
          )}
          {stepNo < 4 && (
            <Button
              variant="contained"
              sx={{ width: "6rem", padding: "0.5rem" }}
              onClick={handleNext}
            >
              Next
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CandidateCompleteDetail;
