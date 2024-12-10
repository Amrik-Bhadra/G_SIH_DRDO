import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Avatar,
  Chip,
  Box,
  Button,
  ButtonGroup,
  CardOverflow,
  CardActions,
  IconButton,
  Typography,
  SvgIcon,
  Stack,
  CircularProgress,
} from "@mui/joy";
import axios from "axios";
const ExpertsCard = ({ info, index }) => {
  const [otherInfo, setOtherInfo] = useState([]);
  const getRandomDomain = () => {
    const domains = ["Academia", "Industry"];
    return domains[Math.floor(Math.random() * domains.length)];
  };
  console.log(index);
  const [drdo, setDrdo] = useState("DRDO");
  const base_url = import.meta.env.VITE_BASE_URL;
  const otherExpertInfo = async () => {
    try {
      const otherInformation = await axios.get(
        `${base_url}/api/expert/get/${info?.expertID}`,
        { withCredentials: true }
      );
      if (otherInformation) {
        setOtherInfo(otherInformation?.data?.data);
        console.log(otherInformation?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    otherExpertInfo();
  }, [info]);
  return (
    <Card
      sx={{
        width: 280,
        maxWidth: "100%",
        height: "fit-content",
        backgroundColor: "#FDFDFD",
        border: "1px solid #D6D6D6",
      }}
    >
      <CardContent sx={{ alignItems: "center", textAlign: "center" }}>
        <Avatar
          src="/static/images/avatar/1.jpg"
          sx={{ "--Avatar-size": "5rem" }}
        />
        <Chip
          size="sm"
          variant="soft"
          color="primary"
          sx={{
            mt: -2.5,
            mb: 1,
            border: "3px solid",
            borderColor: "background.surface",
            py: 0.5,
            px: 1,
          }}
        >
          PRO
        </Chip>

        <Typography level="title-lg" sx={{ color: "#36CFEA" }}>
          {info?.expertName}
        </Typography>
        <Typography
          level="title-md"
          sx={{ color: "#676767", fontWeight: "500" }}
        >
          {index === 0 ? "DRDO" : getRandomDomain()}
        </Typography>
        <Typography level="body2" sx={{ color: "#ACABAB" }}>
          {otherInfo?.fieldOfExpertise?.yearsOfExperience} Years of Experience
        </Typography>
        <Box sx={{ display: "flex", gap: "0 2rem", marginTop: "1rem" }}>
          <Stack spacing={1} sx={{ alignItems: "center" }}>
            <CircularProgress size="lg" determinate value={65}>
              <Typography>
                {parseInt(
                  otherInfo?.skillRelevancyScore?.totalSkillRelevancyScore
                )}
              </Typography>
            </CircularProgress>
            <Typography level="body-xs" sx={{ color: "#333" }}>
              Score 1
            </Typography>
          </Stack>
          <Stack spacing={1}>
            <CircularProgress size="lg" determinate value={89}>
              <Typography>
                {parseInt(
                  otherInfo?.approachRelevancyScore?.totalApproachRelevancyScore
                )}
              </Typography>
            </CircularProgress>
            <Typography level="body-xs" sx={{ color: "#333" }}>
              Score 2
            </Typography>
          </Stack>
          <Stack spacing={1}>
            <CircularProgress size="lg" determinate value={89}>
              <Typography>{parseInt(otherInfo?.finalScore)}</Typography>
            </CircularProgress>
            <Typography level="body-xs" sx={{ color: "#333" }}>
              Score 3
            </Typography>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ExpertsCard;
