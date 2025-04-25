import { Box, Paper } from "@mui/material";
import backgroundImage from "../assets/image/Pattern.svg";
import { Outlet } from "react-router-dom";
import SideBar from "./sidebar";

const imgStyle = {
  backgroundImage: `url(${backgroundImage})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundColor: "#015d82",
  width: "100vw",
  height: "100vh",
};

export default function MainLayout() {
  return (
    <Box sx={{ ...imgStyle, display: "flex", flexDirection: "row" }}>
      {/* Sidebar fixed width on left */}
      <Box
        sx={{
          width: "80px",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <SideBar />
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
          height: "100vh",
          boxSizing: "border-box",
        }}
      >
        <Paper
          sx={{
            width: "100%",
            maxWidth: "1200px",
            height: "100%",
            backgroundColor: "#fff",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              overflow: "auto",
              padding: 2,
              "&::-webkit-scrollbar": {
                width: "0px",
                height: "0px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "transparent",
              },
            }}
          >
            <Outlet />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
