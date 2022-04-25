import { Container, Alert, Box, Pagination } from "@mui/material";
import React from "react";
import CompanyList from "../components/CompanyList";
import { useEffect, useState } from "react";
import apiService from "../app/apiService";
import LoadingScreen from "../components/LoadingScreen";

function HomePage() {
  const [loading, setLoading] = useState(false);
  const [companiesInfo, setCompaniesInfo] = useState("");
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [pageCount, setPageCount] = useState(5);

  useEffect(() => {
    const getCompanies = async () => {
      setLoading(true);
      try {
        const res = await apiService.get(`/companies?page=${page}&limit=${limit}`);
        setCompaniesInfo(res.data.data);
        setPageCount(Math.ceil(res.data.length/limit))
        setError("");
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
      setLoading(false);
    };
    getCompanies();
  }, [page,limit]);
  return (
    <>
      <Container sx={{ mt: 5 }}>
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            {error ? (
              <Alert severity="error">{error}</Alert>
            ) : (
              <>
                <CompanyList companiesInfo={companiesInfo}/>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 3,
                    mb: 3,
                  }}
                >
                  <Pagination
                    count={pageCount}
                    page={page}
                    onChange={(e, value) => setPage(value)}
                  />
                </Box>
              </>
            )}
          </>
        )}
      </Container>
    </>
  );
}

export default HomePage;
