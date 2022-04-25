import React from "react";
import { CssBaseline } from "@mui/material";
import { Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AuthRequire from "./contexts/AuthRequire";
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import JobModal from "./pages/JobModal";
import LoginModal from "./pages/LoginModal";
import NotFoundPage from "./pages/NotFoundPage";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function ToggleColorMode() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "end",
        alignItems: "center",
        bgcolor: "error",
        color: "text.primary",
        position: "absolute",
        top: 65,
        right: 12,
      }}
    >
      {theme.palette.mode} mode
      <IconButton
        sx={{ ml: 1 }}
        onClick={colorMode.toggleColorMode}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </Box>
  );
}

function App() {
  const location = useLocation();
  const [mode, setMode] = React.useState("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ToggleColorMode />
          <AuthProvider>
            <Routes location={location.state?.backgroundLocation || location}>
              <Route element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="/login" element={<HomePage />} />
                <Route path="/companies/:id" element={<HomePage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
            <Routes>
              <Route>
                <Route path="/login" element={<LoginModal />} />
                <Route
                  path="/companies/:id"
                  element={
                    <AuthRequire>
                      <JobModal />
                    </AuthRequire>
                  }
                />
              </Route>
            </Routes>
          </AuthProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

export default App;
