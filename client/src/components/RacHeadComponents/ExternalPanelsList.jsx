import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Avatar } from "@mui/material";
import { IoMdSend } from "react-icons/io";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const columns = [
  { id: "serial", label: "#", minWidth: 20 },
  { id: "profilePic", label: "Profile Pic", minWidth: 80 },
  { id: "fullName", label: "Full Name", minWidth: 150 },
  { id: "email", label: "Email ID", minWidth: 200 },
  { id: "domain", label: "Domain", minWidth: 120 },
  { id: "department", label: "Department", minWidth: 150 },
];

const rows = [
  { serial: 1, profilePic: "John Doe", fullName: "John Doe", email: "john.doe@example.com", domain: "IIT", department: "IT" },
  { serial: 2, profilePic: "Jane Smith", fullName: "Jane Smith", email: "jane.smith@example.com", domain: "NIT", department: "AI" },
  { serial: 3, profilePic: "Alex Brown", fullName: "Alex Brown", email: "alex.brown@example.com", domain: "IISC", department: "Cybersecurity" },
  { serial: 4, profilePic: "Michael Johnson", fullName: "Michael Johnson", email: "michael.johnson@example.com", domain: "IIT", department: "Mechanical" },
  { serial: 5, profilePic: "Emily Davis", fullName: "Emily Davis", email: "emily.davis@example.com", domain: "NIT", department: "Civil" },
  { serial: 6, profilePic: "William Harris", fullName: "William Harris", email: "william.harris@example.com", domain: "IISC", department: "IT" },
  { serial: 7, profilePic: "Sophia Martinez", fullName: "Sophia Martinez", email: "sophia.martinez@example.com", domain: "IIT", department: "Chemical" },
  { serial: 8, profilePic: "Oliver Thompson", fullName: "Oliver Thompson", email: "oliver.thompson@example.com", domain: "NIT", department: "Software" },
  { serial: 9, profilePic: "Isabella Lee", fullName: "Isabella Lee", email: "isabella.lee@example.com", domain: "IISC", department: "E&TC" },
  { serial: 10, profilePic: "James Wilson", fullName: "James Wilson", email: "james.wilson@example.com", domain: "IISC", department: "Data Science" },
];

const getRandomColor = () => {
  const colors = ["#0fa3b1", "#9d4edd", "#f85e00", "#588157", "#bf3100", "#16425b", "#64a6bd", "#e56b6f"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const ExternalPanelsList = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen bg-[#f6f6f6] flex flex-col justify-center items-center">
        <div className="animate-spin h-12 w-12 rounded-full border-t-4 border-blue-500 border-solid"></div>
        <p className="text-2xl font-bold text-gray-700 mt-4">Extracting External Experts...</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-[#f6f6f6] flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-sm">
        <div>
          <TableContainer sx={{ maxHeight: 560 }} className="no-scrollbar">
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      style={{
                        minWidth: column.minWidth,
                        backgroundColor: "#464646",
                        color: "#fff",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.serial}</TableCell>
                    <TableCell>
                      <Avatar
                        style={{
                          backgroundColor: getRandomColor(),
                          color: "#fff",
                        }}
                      >
                        {row.profilePic.charAt(0)}
                      </Avatar>
                    </TableCell>
                    <TableCell>{row.fullName}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>
                      <span
                        className="border px-4 py-2 rounded-md"
                        style={{
                          color:
                            row.domain === "IIT"
                              ? "#0897FF"
                              : row.domain === "NIT"
                              ? "#FF5EF9"
                              : "#00BD40",
                          borderColor:
                            row.domain === "IIT"
                              ? "#0897FF"
                              : row.domain === "NIT"
                              ? "#FF5EF9"
                              : "#00BD40",
                          backgroundColor:
                            row.domain === "IIT"
                              ? "rgba(8, 151, 255, 0.12)"
                              : row.domain === "NIT"
                              ? "rgba(255, 94, 249, 0.1)"
                              : "rgba(0, 189, 64, 0.12)",
                        }}
                      >
                        {row.domain}
                      </span>
                    </TableCell>
                    <TableCell>{row.department}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="flex items-center justify-between p-5">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker label="Date of Interview" />
            </DemoContainer>
          </LocalizationProvider>
          <button className="bg-[#333] text-white px-[1rem] py-[0.8rem] rounded-md flex items-center gap-x-2">
            <p>Send Invitation</p>
            <IoMdSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExternalPanelsList;
