import React from "react";
import { FaAngleDown } from "react-icons/fa";
import logo from "../../assets/images/drdo-logo.svg";
import { TbArrowBadgeRightFilled } from "react-icons/tb";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const QuestionnareHome = () => {
  const user = {
    name: "Amrik Bhadra", // Static name
    email: "amrik.bhadra@mitaoe.ac.in", // Static email
    avatar: "AB", // Static avatar initials
  };

  const navigate = useNavigate();

  const [checked, setChecked] = React.useState(false) ;

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const startTest = () => {
    if (checked) navigate("/questionnaire/questionsections");
    else{
      toast.error('First check the checkbox');
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#f8f9fa] flex justify-center items-start pt-5">
      <div className="w-[85%] min-h-screen flex flex-col justify-start items-center gap-y-8">
        {/* Header Section */}
        <div className="w-full h-28 flex justify-between items-center px-4 py-2 rounded-md">
          <div className="h-full w-full flex justify-start items-center gap-1 pl-1">
            <img className="w-20 h-auto" src={logo} alt="DRDO Logo" />
            <p className="font-bold text-[#64b5f6] text-2xl">EBRS</p>
          </div>
          <div className="w-52 bg-white shadow-md border-t border-white h-12 flex justify-end items-center rounded-3xl">
            <div className="w-full h-full flex justify-start items-center gap-2 pr-1">
              <div className="border-2 border-slate-400 w-10 ml-1 text-sm h-10 flex justify-center items-center rounded-full">
                {user.avatar}
              </div>
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-[9px]">{user.email}</p>
              </div>
              <div className="hover:text-slate-600">
                <FaAngleDown />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="w-full flex flex-col gap-2 p-8 bg-white rounded-md shadow-sm">
          <h1 className="text-2xl text-[#0E8CCA] font-semibold">
            About Approach Relevancy Test
          </h1>
          <ul className="text-[1rem] flex flex-col gap-y-2 pt-2">
            <li className="flex items-center gap-x-4">
              <TbArrowBadgeRightFilled /> There are 5 sections:{" "}
              <strong>Problem Solving</strong>,<strong>Decision Making</strong>,
              <strong>Creativity</strong>,<strong>Analytical Depth</strong>, and{" "}
              <strong>Collaboration</strong>
            </li>
            <li className="flex items-center gap-x-4">
              <TbArrowBadgeRightFilled /> Each section having{" "}
              <strong>5 questions</strong>
            </li>
            <li className="flex items-center gap-x-4">
              <TbArrowBadgeRightFilled /> Each question having{" "}
              <strong>4 options</strong>; none of the options are wrong, but
              relevancy of the options with the question will vary
            </li>
            <li className="flex items-center gap-x-4">
              <TbArrowBadgeRightFilled /> Each question will have a{" "}
              <strong>maximum of 5</strong>
              and a <strong>minimum of 1</strong> point based on the relevancy
              of the options to the question
            </li>

            <li className="flex items-center gap-x-4">
              <TbArrowBadgeRightFilled /> There is{" "}
              <strong>no negative marking</strong>
            </li>
          </ul>

          <div className="mt-8">
            <h2 className="text-lg font-medium text-[#464646] mb-4">
              Option Marking Notation
            </h2>
            <Grid container spacing={2} columns={16}>
              <Grid size={4}>
                <ul className="flex flex-col gap-y-4">
                  <li className="flex items-center gap-x-3">
                    <span className="rounded-md bg-[#00B65E] p-2 text-white font-medium">
                      23
                    </span>
                    <p className="font-medium">Answered</p>
                  </li>
                  <li className="flex items-center gap-x-3">
                    <span className="rounded-md bg-[#E80505] p-2 text-white font-medium">
                      23
                    </span>
                    <p className="font-medium">Not Answered</p>
                  </li>
                  <li className="flex items-center gap-x-3">
                    <span className="rounded-full bg-[#4D44CC] h-[35px] w-[35px] p-2 text-white font-medium flex justify-center items-center">
                      <p>23</p>
                    </span>
                    <p className="font-medium">Not Answered & Marked</p>
                  </li>
                </ul>
              </Grid>
              <Grid size={3}>
                <ul className="flex flex-col gap-y-4">
                  <li className="flex items-center gap-x-3">
                    <span className="rounded-full bg-[#D939CD] h-[35px] w-[35px] p-2 text-white font-medium flex justify-center items-center">
                      <p>23</p>
                    </span>
                    <p className="font-medium">Answered & Marked</p>
                  </li>
                  <li className="flex items-center gap-x-3">
                    <span className="rounded-md bg-[#eee] p-2 text-[#333] border border-[#333] font-medium">
                      23
                    </span>
                    <p className="font-medium">Not Visited Yet</p>
                  </li>
                </ul>
              </Grid>
            </Grid>
          </div>

          <div className="flex items-center mt-4">
            <Checkbox
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
            <p>I hereby declare that, I have read all the rules and regulations needed for this test</p>
          </div>

          <Button
            variant="contained"
            sx={{
              width: "fit-content",
              marginTop: "1rem",
              textTransform: "capitalize",
            }}
            onClick={() => {
              startTest();
            }}
          >
            Start Test
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuestionnareHome;
