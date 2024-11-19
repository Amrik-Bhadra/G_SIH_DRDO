import React, { useState } from "react";
import { Button } from "@mui/material";
import ExpertPersonalInformation from "../../components/ExpertDetailSections/ExpertPersonalInformation";
import ExpertEducationalInformation from "../../components/ExpertDetailSections/ExpertEducationalInformation";
import ExpertCriticalSection from "../../components/ExpertDetailSections/ExpertCriticalSection";
import ExpertAdditionalInputs from "../../components/ExpertDetailSections/ExpertAdditionalInputs"; 
import { toast } from "react-hot-toast";
import ExpertProfessionalInputs from "../../components/ExpertDetailSections/ExpertProfessionalInputs";

const ExpertCompleteDetail = () => {
  const mini = 1;
  const maxi = 5;
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
      designation: "",
      field: "",
      yearOfExperience: "",
    },
    educationalInfo: [],
    criticalInputs: {
      resume: "",
      skills: [],
      expertise: [],
    },
    additionalInputs: {
      certifications: [],
      publications: [],
      languagesKnown: [],
    },
    professionalProfiles: [],
    professionalAffiliations: [],
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
      } = userData.personalInfo;

      if (
        !firstName ||
        !lastName ||
        !phoneNo ||
        !gender ||
        !govtIdType ||
        !govtIdNo ||
        !recoveryEmail ||
        !age
      ) {
        toast.error("Please complete all personal information fields.");
        return false;
      }
      // Check if age is valid
      if (userData.personalInfo.age < 18 || userData.personalInfo.age > 100) {
        toast.error("Age must be greater than 18 years.");
        return false;
      }
      // Check if phone number is valid
      if (userData.personalInfo.phoneNo.length !== 10) {
        toast.error("Phone number must be 10 digits.");
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
      const { resume, skills, expertise } = userData.criticalInputs;
      if (!resume || skills.length === 0 || expertise.length === 0) {
        toast.error(
          "Please upload your resume, add at least one skill, and specify an area of expertise."
        );
        return false;
      }
    }

    if (stepNo === 4) {
      const {
        certifications,
        publications,
        languagesKnown,
      } = userData.additionalInputs;
      if (
        certifications.length === 0 ||
        publications.length === 0 ||
        languagesKnown.length === 0
      ) {
        toast.error(
          "Please add at least one certification, publication, or language."
        );
        return false;
      }
    }

    if (stepNo === 5) {
      const { professionalProfiles, professionalAffiliations } = userData;
    //   if (
    //     professionalProfiles.length === 0 ||
    //     professionalAffiliations.length === 0
    //   ) {
    //     toast.error("Please add at least one professional profile or affiliation.");
    //     return false;
    //   }
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

    if (validateStep()) {
      return;
    }

    toast.success("Details submitted successfully!");
    console.log("Submitted Data:", userData);
  };

  return (
    <div className="min-h-[100vh] w-[100vw] bg-[#eee] flex justify-center items-center py-10">
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
        {/* Render Step Components */}
        {stepNo === 1 && (
          <ExpertPersonalInformation
            userData={userData}
            setUserData={setUserData}
          />
        )}
        {stepNo === 2 && (
          <ExpertEducationalInformation
            userData={userData}
            setUserData={setUserData}
          />
        )}
        {stepNo === 3 && (
          <ExpertCriticalSection
            userData={userData}
            setUserData={setUserData}
          />
        )}
        {stepNo === 4 && (
          <ExpertAdditionalInputs
            userData={userData}
            setUserData={setUserData}
          />
        )}
        {stepNo === 5 && (
          <ExpertProfessionalInputs
            userData={userData}
            setUserData={setUserData}
          />
        )}

        {/* Navigation Buttons */}
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

export default ExpertCompleteDetail;
