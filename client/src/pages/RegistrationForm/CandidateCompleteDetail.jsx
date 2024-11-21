import React, { useState } from "react";
import { Button } from "@mui/material";
import { toast } from "react-hot-toast";
import CandidatePersonalInformation from "../../components/CandidateDetailSections/CandidatePersonalInformation";
import CandidateEducationalInformation from "../../components/CandidateDetailSections/CandidateEducationalInformation";
import CandidateCriticalSection from "../../components/CandidateDetailSections/CandidateCriticalSection";
import CandidateAdditionalInputs from "../../components/CandidateDetailSections/CandidateAdditionalInputs";
import { useNavigate } from "react-router-dom";

const CandidateCompleteDetail = () => {
  const mini = 1;
  const maxi = 4;
  const navigate = useNavigate();
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
    criticalInputs: {
      resume: "",
      yearsOfExperience: "",
      skills: [],
      expertise: [],
    },
    additionalInputs: {
      projects: [],
      publications: [],
    },
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

    if (stepNo === 3) {
      const { resume, yearsOfExperience, skills, expertise } = userData.criticalInputs;
      if (!resume || !yearsOfExperience || skills.length === 0 || expertise.length === 0) {
        toast.error(
          "Please upload your resume, select years of experience, add at least one skill, and specify an area of expertise."
        );
        return false;
      }
    }
    

    if (stepNo === 4) {
      const {
        projects,
        publications,
      } = userData.additionalInputs;
      if (
        projects.length === 0 ||
        publications.length === 0
      ) {
        toast.error(
          "Please add at least one certification, publication, or language."
        );
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

  const handlePrevious = () => {
    setStepNo(stepNo - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep()) {
      return;
    }

    toast.success("Details submitted successfully!");
    console.log("Submitted Data:", userData);

    // Redirect to the QuizPage
    navigate("/register/candidate/quiz");

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
        onSubmit={handleSubmit}
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
        {stepNo === 3 && (
          <CandidateCriticalSection
            userData={userData}
            setUserData={setUserData}
          />
        )}
        {stepNo === 4 && (
          <CandidateAdditionalInputs
            userData={userData}
            setUserData={setUserData}
          />
        )}

        <div className="flex gap-3">
          {stepNo > mini && (
            <Button
              variant="outlined"
              sx={{ width: "6rem", padding: "0.5rem" }}
              onClick={handlePrevious}
            >
              Previous
            </Button>
          )}
          {stepNo < maxi && (
            <Button
              variant="contained"
              sx={{ width: "6rem", padding: "0.5rem" }}
              onClick={handleNext}
            >
              Next
            </Button>
          )}
          {stepNo === maxi && (
            <Button
              variant="contained"
              type="submit"
              sx={{ width: "6rem", padding: "0.5rem" }}
            >
              Submit
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CandidateCompleteDetail;
