import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import { Chip } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

// Reusable SearchBar Component
const SearchBar = () => {
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
      />
    </Search>
  );
};

// Reusable Desktop Menu Component
const DesktopMenu = ({
  handleProfileMenuOpen,
  menuId,
  user,
}: {
  handleProfileMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  menuId: string;
  user: string | null;
}) => (
  <Box sx={{ display: { xs: "none", md: "flex" } }}>
    {user === null ? (
      <></>
    ) : (
      <IconButton
        size="large"
        aria-label="show 17 new notifications"
        color="inherit"
      >
        <Chip
          icon={<AddIcon />}
          label="Create Post"
          component={Link}
          to="/createPost"
          clickable
          sx={{
            backgroundColor: "#FFFFFF",
            color: "#000000",
            border: "1px solid #ccc",
            "& .MuiChip-icon": {
              color: "#000000",
            },
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
          }}
        />
      </IconButton>
    )}

    <IconButton
      size="large"
      edge="end"
      aria-label="account of current user"
      aria-controls={menuId}
      aria-haspopup="true"
      onClick={handleProfileMenuOpen}
      color="inherit"
    >
      <AccountCircle />
    </IconButton>
  </Box>
);

// Main Navbar Component
export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const { logOut } = useAuth();
  const user = localStorage.getItem("username");
  const menuId = "basic-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }} // Attach below the button
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      id={"basic-menu"}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {user === null ? (
        <>
          {" "}
          <MenuItem onClick={handleMenuClose} component={Link} to="/login">
            Login
          </MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to="/signup">
            Signup
          </MenuItem>{" "}
        </>
      ) : (
        <>
          <MenuItem>{user}</MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to="/login">
            My Posts
          </MenuItem>
          <MenuItem onClick={logOut} component={Link} to="/">
            Logout
          </MenuItem>
        </>
      )}
    </Menu>
  );

  return (
    <Box sx={{ width: "100%" }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              Home
            </Link>
          </Typography>
          <SearchBar />
          <Box sx={{ flexGrow: 1 }} />
          <DesktopMenu
            handleProfileMenuOpen={handleProfileMenuOpen}
            menuId={menuId}
            user={user}
          />
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}
