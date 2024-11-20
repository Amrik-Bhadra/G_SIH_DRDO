import React, { useState } from "react";
import logo from "../../assets/images/drdo-logo.svg";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validateForm = () => {
    if (!email) {
      toast.error("Email is required!");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Enter a valid email address!");
      return false;
    }
    if (!role) {
      toast.error("Role is required!");
      return false;
    }
    if (!password) {
      toast.error("Password is required!");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return false;
    }
    return true;
  };

  const handleLogin = (event) => {
    event.preventDefault();
    if (validateForm()) {
      toast.success("Login successful!");
      // Add login logic here (e.g., API call)
      navigate('/twofactorauthentication')
    }
  };

  return (
    <main className="h-[100vh] w-[100vw] bg-[#eee] flex justify-center items-center">
      <Toaster />
      <div className="form-div bg-white max-w-[500px] w-[90%] h-fit py-8 rounded-lg shadow-sm flex flex-col justify-center items-center gap-y-8 text-center">
        <div className="img-box flex items-center gap-x-3">
          <img src={logo} alt="drdo-logo" className="w-20" />
          <h1 className="text-2xl font-bold text-[#0E8CCA]">E.B.R.S.</h1>
        </div>
        <div className="form-header">
          <h1 className="text-3xl font-semibold">Welcome Back!</h1>
          <p className="text-gray-500 mt-1 font-medium text-md">
            Please Enter your details to login
          </p>
        </div>

        {/* Email input */}
        <form className="w-[85%] flex flex-col gap-y-5" onSubmit={handleLogin}>
          <TextField
            id="outlined-email-input"
            label="Email ID"
            type="email"
            autoComplete="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Role Selection Dropdown */}
          <FormControl fullWidth>
            <InputLabel id="role-select-label">Select Role</InputLabel>
            <Select
              labelId="role-select-label"
              id="role-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              label="Select Role"
              sx={{
                textAlign: "left", // Ensure the selected text is aligned to the left
              }}
            >
              <MenuItem value="applicant">Applicant</MenuItem>
              <MenuItem value="expert">Expert</MenuItem>
            </Select>
          </FormControl>

          {/* password input */}
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>

          <span className="text-right pr-2 text-[#0E8CCA] font-medium text-sm">
            <Link to="/forgotPassword">Forget Password</Link>
          </span>

          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#0e8cca",
              padding: "0.8em 1rem",
              fontWeight: 600,
              textTransform: "capitalize",
              letterSpacing: "2px",
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;",
            }}
          >
            Login
          </Button>

          <span className="pr-2 font-medium text-sm text-[#C4C4C4]">
            Don't have an account?{" "}
            <Link to="/registrationchoice" className="text-[#0E8CCA]">
              Register
            </Link>
          </span>
        </form>
      </div>
    </main>
  );
};

export default LoginForm;
