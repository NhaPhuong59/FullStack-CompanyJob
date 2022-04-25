import React, { useState } from "react";

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import FormProvider from "../components/form/FormProvider";
import FTextField from "../components/form/FTextField";
import {
  IconButton,
  InputAdornment,
  Stack,
  Button,
  Link,
  Avatar,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import useAuth from "../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import FCheckbox from "../components/form/FCheckbox";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 330,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: 6,
  boxShadow: 24,
  p: 4,
};

const defaultValues = {
  username: "",
  password: "",
};

export default function LoginModal() {
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;
  const [showPassword, setShowPassword] = useState(false);
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    navigate(from, { replace: true });
  };

  const onSubmit = (data) => {
    auth.login(data.username, () => {
      navigate(from, { replace: true });
    });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Avatar
          sx={{
            background: "#F0534A",
            position: "relative",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography
          id="modal-modal-title"
          variant="h4"
          component="h2"
          sx={{ textAlign: "center" }}
        >
          Login
        </Typography>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} sx={{ mt: 4 }}>
            <FTextField name="username" label="Username" />
            <FTextField
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FCheckbox name="remember" label="Remember me" />
            <Button type="submit" variant="contained">
              Submit
            </Button>
            <Typography>
              <Link sx={{ textDecoration: "none" }} href="#">
                Forgot password ?
              </Link>
            </Typography>
            <Typography>
              Do you have an account ?{" "}
              <Link sx={{ textDecoration: "none" }} href="#">
                Sign Up
              </Link>
            </Typography>
          </Stack>
        </FormProvider>
      </Box>
    </Modal>
  );
}
