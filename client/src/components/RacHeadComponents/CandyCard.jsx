import React from "react";
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

const CandyCard = ({ info }) => {
  console.log(info);
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
          {info?.candidateName}
        </Typography>
        <Typography
          level="title-md"
          sx={{ color: "#676767", fontWeight: "500" }}
        >
          Head of Department
        </Typography>
        <Typography level="body2" sx={{ color: "#ACABAB" }}>
          10years Experience
        </Typography>
        <Box sx={{ display: "flex", gap: "0 2rem", marginTop: "1rem" }}>
          <Stack spacing={1} sx={{ alignItems: "center" }}>
            <CircularProgress size="lg" determinate value={65}>
              <Typography>{parseInt(info?.finalSkillScoreOutOf70)}</Typography>
            </CircularProgress>
            <Typography level="body-xs" sx={{ color: "#333" }}>
              Skill
            </Typography>
          </Stack>
          <Stack spacing={1}>
            <CircularProgress size="lg" determinate value={89}>
              <Typography>
                {parseInt(info?.approachRelevancyScoreOutOf30)}
              </Typography>
            </CircularProgress>
            <Typography level="body-xs" sx={{ color: "#333" }}>
              Approach
            </Typography>
          </Stack>
          <Stack spacing={1} sx={{ alignItems: "center" }}>
            <CircularProgress size="lg" determinate value={65}>
              <Typography>
                {parseInt(info?.finalCombinedScoreOutOf100)}
              </Typography>
            </CircularProgress>
            <Typography level="body-xs" sx={{ color: "#333" }}>
              Total
            </Typography>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CandyCard;
