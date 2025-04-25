import { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  List,
  ListItem,
  styled,
  Tooltip,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
interface StyledListItemProps {
  isActive?: boolean;
}

const StyledListItem = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== "isActive",
})<StyledListItemProps>(({ isActive }) => ({
  borderRadius: "50%",
  height: "40px",
  width: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: isActive ? "#e0e0e0" : "transparent",
  cursor: "pointer",
}));

const sidebarLinks = [
  {
    name: "Dashboard",
    icon: <DashboardOutlinedIcon />,
    activeIcon: <DashboardIcon />,
    path: "/",
  },
  {
    name: "Project Management",
    icon: <ConfirmationNumberOutlinedIcon />,
    activeIcon: <ConfirmationNumberIcon />,
    path: "/Projectmanagement",
  },
  {
    name: "Empolyes",
    icon: <Person2OutlinedIcon />,
    activeIcon: <PersonIcon />,
    path: "/Empolyes",
  },
  {
    name: "Assignment",
    icon: <AssignmentIndOutlinedIcon />,
    activeIcon: <AssignmentIcon />,
    path: "/assignment",
  },
];

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activePath, setActivePath] = useState<string>("");

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/login");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 20,
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          display: "flex",
          width: { xs: "98%", sm: "8.85%" },
          justifyContent: "center",
          padding: { xs: 0, sm: "10px" },
          order: { xs: 1, sm: 0 },
          position: { xs: "fixed", sm: "relative" },
          bottom: 0,
          zIndex: 1000,
          ml: 3.5,
        }}
      >
        <List
          sx={{
            display: "flex",
            flexDirection: { xs: "row", sm: "column" },
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "background.paper",
            borderRadius: "50px",
            py: 0,
            p: { xs: "2px", xl: "6px" },
            width: { xs: "100%", sm: "auto" },
          }}
        >
          {sidebarLinks.map((link) => (
            <Tooltip key={link.path} title={link.name} placement="right">
              <IconButton size="small" onClick={() => navigate(link.path)}>
                <StyledListItem isActive={activePath === link.path}>
                  {activePath === link.path ? link.activeIcon : link.icon}
                </StyledListItem>
              </IconButton>
            </Tooltip>
          ))}
        </List>
      </Box>

      {/* Logout Icon Outside */}
      <Box
        sx={{
          mt: 3,
          background: "#FFFFFF",
          borderRadius: "25px",
          ml: 2.5,
          marginTop: 10,
        }}
      >
        <Tooltip title="Logout" placement="right">
          <IconButton size="small" onClick={handleLogout}>
            <StyledListItem>
              <LogoutIcon />
            </StyledListItem>
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default SideBar;
