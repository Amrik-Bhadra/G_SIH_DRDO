import React from 'react';
import { useNavigate } from "react-router-dom"; // Make sure to import useNavigate
import user_img from '../../assets/images/user_img_female.avif';

const CandidateCard = ({ candidate }) => {
  const navigate = useNavigate();

  return (
    <div style={{boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px"}} className="flex flex-col p-4 border border-gray-300 rounded-lg bg-white w-64 min-w-[256px] max-w-[300px]">
      <div className="flex items-center space-x-4 pb-4">
        <img className="w-16 h-16 object-cover rounded-lg" src={user_img} alt="User" />
        <div className="flex flex-col">
          <h3 className="text-lg font-bold">{candidate.name}</h3>
          <span
            className="rounded-full px-4 py-1 font-medium text-sm"
            style={{
              color: candidate.status === "Absent" ? "#FF0000" : "#00BD40",
              borderColor: candidate.status === "Absent" ? "#FF0000" : "#00BD40",
              borderWidth:"1px",
              backgroundColor: candidate.status === "Absent" ? "rgba(255, 0, 0, 0.12)" : "rgba(0, 189, 64, 0.12)",
            }}
          >
            {candidate.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
        <div>
          <p className="text-sm text-gray-600">Role:</p>
          <p className="text-sm text-gray-950 whitespace-normal overflow-hidden">{candidate.role}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Degree:</p>
          <p className="text-sm text-gray-950 whitespace-normal overflow-hidden text-ellipsis">{candidate.degree}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Experience:</p>
          <p className="text-sm text-gray-950 whitespace-normal overflow-hidden">{candidate.experience}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Specialization:</p>
          <p className="text-sm text-gray-950 whitespace-normal overflow-hidden">{candidate.specialization}</p>
        </div>
        <button
          className="bg-gradient-to-r from-sky-700 to-cyan-400 text-white rounded hover:bg-blue-600 p-2"
          onClick={() => { navigate('/expert/candidateevaluation') }}
        >
          View Report
        </button>

        <button
        style={{backgroundColor:"#ECECEC", color:"#494949",boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px"}}
          className=" text-white rounded hover:bg-blue-600"
          onClick={() => { navigate('/expert/candidateevaluation') }}
        >
          View Resume
        </button>
      </div>

      {/* Buttons */}
      {/* <div className="flex justify-between mt-3">
        <button
          className="bg-gradient-to-r from-sky-700 to-cyan-400 text-white rounded hover:bg-blue-600 p-2"
          onClick={() => { navigate('/expert/candidateevaluation') }}
        >
          View Report
        </button>

        <button
          className="bg-gradient-to-r from-sky-700 to-cyan-400 text-white rounded hover:bg-blue-600"
          onClick={() => { navigate('/expert/candidateevaluation') }}
        >
          View Resume
        </button>
      </div> */}
    </div>
  );
};

export default CandidateCard;
