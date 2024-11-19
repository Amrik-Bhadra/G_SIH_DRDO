const mongoose = require("mongoose")

const panelSchema = 

{
    "id": "String", // Unique identifier for the interview
   “Name”: string // panel name
   “DeptName”: string // Department name
  “Description”: String // Description
    "candidateId": ["String"], // List of Candidate's
    "expertIds": ["String"], // List of expert IDs involved in the interview
    "status": "String", // Current status of the interview (e.g., "Scheduled", "Completed", "Cancelled")
    "interviewDate": "DateTime", // Scheduled date and time of the interview
    "location": {
      "state": "String", // State where the interview is held
      "address": "String" // Detailed address of the interview venue
    },
  }
  
  
  