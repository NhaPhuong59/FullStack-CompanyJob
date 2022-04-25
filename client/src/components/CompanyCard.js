import React from "react";
import { Chip, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "react-router-dom";

function CompanyCard({ company }) {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Grid item xs={12} md={4}>
      <Card sx={{ minWidth: 275, minHeight: 250, position: "relative" }}>
        <CardContent>
          <Typography
            sx={{
              fontSize: 16,
              mb: 1,
              borderBottom: 1,
              textAlign: "center",
            }}
            color="#1e272e"
            gutterBottom
            noWrap
          >
            {company.name.toUpperCase()}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {company.description.length > 120
              ? `${company.description.slice(0, 120)}...`
              : company.description}
          </Typography>
          {Object.keys(company.benefits).slice(0, 5).map((benefits, index) => (
            <Chip
              key={index}
              label={benefits}
              sx={{
                mr: 1,
                mb: 1,
                backgroundColor: "#c7ecee",
                color: "#1e272e",
                height: 24,
                fontSize: 13,
              }}
            />
          ))}
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            size="small"
            variant="contained"
            sx={{
              position: "absolute",
              bottom: 12,
              bgcolor: "#38ada9",
              color: "#000",
              fontSize: 12,
            }}
            to={`/company/${company.id}`}
            onClick={() => navigate(`/companies/${company.id}`)}
            state={{ backgroundLocation: location }}
          >
            Learn More
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default CompanyCard;
