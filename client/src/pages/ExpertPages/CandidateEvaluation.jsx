import React from "react";
import ai_image from "../../assets/images/ai_image.jpg";
import user_image from "../../assets/images/rahul_rstogi.avif";
import { IoArrowUndo } from "react-icons/io5";
import CandidateEvaluationSection from "../../components/ExpertDashboardSections/CandidateEvaluationSection";

const CandidateEvaluation = () => {
  const userData = [
    {
      name: "Rahul Rastogi",
      email: "rahul.rastogi@drdo.com",
      designation: "H.O.D - Dept. of AI & ML",
      profilePicture: "rahul_rstogi.avif",
      documents: {
        resume: "Rahul_Resume.pdf",
        coverLetter: "cover_letter.pdf",
        educationalCertificates: [
          "BTech_degree.pdf",
          "MTech_degree.pdf",
          "PhD_degree.pdf",
        ],
      },
      workExperience: [
        {
          role: "AI Cybersecurity Engineer",
          duration: "2 years",
          company: "DRDO Labs",
        },
        {
          role: "NLP Engineer",
          duration: "2 years",
          company: "Advanced AI Research Center",
        },
      ],
      projects: [
        "Military Technology Project",
        "Autonomous Threat Detection System",
        "AI-Driven Decision Support Platform",
      ],
    },
  ];

  const sectionData = {
    title: "Technical Knowledge",
    criteria: [
        { key: "score1", label: "Awareness of current research trends and innovations in the candidate’s discipline" },
        { key: "score2", label: "Depth of technical knowledge in the subject" },
        { key: "score3", label: "Ability to solve complex problems" },
        { key: "score4", label: "Communication and presentation skills" },
    ],
};
const sectionData2 = {
  title: "Problem Solving Skills",
  criteria: [
      { key: "score1", label: "Awareness of current research trends and innovations in the candidate’s discipline" },
      { key: "score2", label: "Depth of technical knowledge in the subject" },
      { key: "score3", label: "Ability to solve complex problems" },
      { key: "score4", label: "Communication and presentation skills" },
  ],
};

  return (
    <div className="container mx-auto items-center bg-gray-100 min-w-full min-h-screen">
        <div className="container mx-auto bg-gray-100 flex flex-row gap-x-8 p-10 ">
      {userData.map((user, index) => (
        <div
          key={index}
          className="max-w-[23vw] h-full bg-white rounded-xl  overflow-hidden" style={{boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"}}
        >
          {/* User Card Header */}
          <div className="relative">
            {/* Background Image */}
            <img
              src={ai_image}
              className="w-full h-[20vh] object-cover"
              alt="AI Background"
            />

            {/* Back Button */}
            <div className="absolute top-4 left-4 w-8 h-8 cursor-pointer bg-white rounded-full p-2 shadow">
              <IoArrowUndo style={{ color: "3EB2F2" }} />
            </div>

            {/* User Image */}
            <div className="absolute top-[10vh] left-1/2 transform -translate-x-1/2 object-cover">
              <img
                src={user_image}
                alt={user.name}
                className="w-28 h-28 rounded-full border-2 border-white shadow-lg"
              />
            </div>
          </div>

          {/* User Info */}
          <div className="text-center mt-20">
            <h1 className="text-lg font-bold">{user.name}</h1>
            <p className="text-sm text-cyan-500">{user.email}</p>
            <p className="text-sm text-gray-500">{user.designation}</p>
          </div>

          {/* Documents */}
          <div className="p-5 flex flex-col gap-y-4">
            <div className="flex flex-col gap-0">
                <h2 className="text-gray-500 font-semibold">Resume</h2>
                <a className="text-gray-700 " href={user.documents.resume}>{user.documents.resume}</a>
            </div>
            <div className="flex flex-col gap-0">
                <h2 className="text-gray-500 font-semibold">Cover Letter</h2>
                <a className="text-gray-700 " href={user.documents.coverLetter}>{user.documents.coverLetter}</a>
            </div>
            <div className="flex flex-col gap-0">
                <h2 className="text-gray-500 font-semibold">Educational Certificates</h2>
                <ul className="list-disc pl-5">
                {user.documents.educationalCertificates.map((cert, idx) => (
                  <li key={idx} className="text-gray-700">
                    <a href={cert} target="_blank" rel="noopener noreferrer">
                      {cert}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Work Experience */}
          <div className="p-5">
            <h2 className="text-gray-500 font-semibold mb-2">Work Experience:</h2>
            <ul className="list-disc pl-5 text-sm text-gray-700">
              {user.workExperience.map((exp, idx) => (
                <li key={idx}>
                  <strong>{exp.role}</strong> - {exp.company} ({exp.duration})
                </li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          <div className="p-5">
            <h2 className="text-gray-500 font-semibold mb-2">Projects:</h2>
            <ul className="list-disc pl-5 text-sm text-gray-700">
              {user.projects.map((project, idx) => (
                <li key={idx}>{project}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
      <div className="flex flex-col gap-y-10">
      <CandidateEvaluationSection
                sectionTitle={sectionData.title}
                evaluationCriteria={sectionData.criteria}
            />
      <CandidateEvaluationSection 
      sectionTitle={sectionData2.title}
      evaluationCriteria={sectionData2.criteria}
      ></CandidateEvaluationSection>
      </div>
      

    </div>
    </div>
  );
};

export default CandidateEvaluation;