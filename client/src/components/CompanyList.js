import { Grid } from "@mui/material";
import React from "react";
import CompanyCard from "./CompanyCard";


function CompanyList({ companiesInfo}) {
  return (
    <>
      <Grid container spacing={2}>
        {companiesInfo &&
          companiesInfo
            .map((company) => <CompanyCard key={company.id} company={company} />)}
      </Grid>
    </>
  );
}

export default CompanyList;
