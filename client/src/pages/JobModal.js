import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import apiService from "../app/apiService";
import { useState, useEffect } from "react";
import LoadingScreen from "../components/LoadingScreen";
import { Alert, Chip } from "@mui/material";

const modalStyle = {
  position: "absolute",
  backgroundColor: "#FFF",
  padding: "15px",
  zIndex: "1000",
  width: "100%",
  borderRadius: 4,
};
const overlayStyle = {
  position: "fixed",
  display: "flex",
  justifyContent: "center",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "65%",
  backgroundColor: "#fff",
  zIndex: "1000",
  borderRadius: 4,
  overflowY: "auto",
};

export default function JobModal() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    navigate(from, { replace: true });
  };

  const [jobsInfo, setJobsInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      const getJobs = async () => {
        setLoading(true);
        try {
          const res = await apiService.get(`/companies/${params.id}`);
          console.log(res.data)
          setJobsInfo(res.data.data);
          setError("");
        } catch (error) {
          console.log(error);
          setError(error.message);
        }
        setLoading(false);
      };
      getJobs();
    }
  }, [params]);


  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          {error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <>
              <Box sx={overlayStyle}>
                <Box sx={modalStyle}>
                  <Typography
                    sx={{
                      fontSize: 18,
                      mb: 2,
                      borderBottom: 1,
                      textAlign: "center",
                      color: "#38ada9",
                    }}
                    gutterBottom
                  >
                    {jobsInfo.name.toUpperCase()}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#2C3333",
                    }}
                  >
                    {jobsInfo.description}
                  </Typography>
                  <Typography sx={{ mt: 1, mb: 1 }}>Benefits:</Typography>
                   <Typography>
                    {Object.keys(jobsInfo.benefits).map((benefit, index) => (
                      <Chip
                        key={index}
                        label={benefit}
                        sx={{
                          mr: 1,
                          mb: 1,
                          backgroundColor: "#c7ecee",
                          color: "#1e272e",
                          fontSize: 12,
                          height: 28,
                        }}
                      />
                    ))}
                  </Typography>
                </Box>
              </Box>
            </>
          )}
        </>
      )}
    </Modal>
  );
}
