import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const InterviewCardComponent = (card) => {
  return (
    <Card key={card.id} sx={{ maxWidth: 350 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {card.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {card.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InterviewCardComponent;
