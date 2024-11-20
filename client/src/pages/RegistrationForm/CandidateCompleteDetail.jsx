import React, { useState } from "react";
import { Button } from "@mui/material";
import CandidatePersonalInformation from "../../components/CandidateDetailSections/CandidatePersonalInformation";
import CandidateEducationalInformation from "../../components/CandidateDetailSections/CandidateEducationaIInformation";

const CandidateCompleteDetail = () => {
  const [stepNo, setStepNo] = useState(1);
  const [userData, setUserData] = useState({
    personalInfo: {
      firstName: "",
      middleName: "",
      lastName: "",
      phoneNo: 0,
      gender: "",
      govtIdType: "",
      govtIdNo: 0,
      recoveryEmail: "",
      age: "",
      
    },
    educationalInfo: [],
  });

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
        {/* Uncomment when adding Educational Info */}
        {stepNo === 2 && <CandidateEducationalInformation userData={userData} setUserData={setUserData}/>}

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
              onClick={() => setStepNo(stepNo + 1)}
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
