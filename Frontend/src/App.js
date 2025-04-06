import "./App.css";
import { Container } from "@mui/material";
import Feedback from "./components/Feedback";
import MiniDrawer from "./components/SideNav";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import HospitalLocation from "./pages/HospitalLocation";
import FirstAid from "./pages/FirstAid";
import Counselling from "./pages/Counselling";
import NutritionPlanner from "./pages/NutritionPlanner";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Login from './pages/login';
import Signup from './pages/signup';
import PrivateRoute from './components/PrivateRoute';

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

function App() {
  return (
    <>
      <BrowserRouter>
        <Box sx={{ display: "flex" }}>
          <MiniDrawer />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            <Container>
              <Routes>
                {/* Public Routes */}
                <Route exact path="/" element={<Login />}></Route>
                <Route exact path="/signup" element={<Signup />}></Route>

                {/* Protected Routes */}
                <Route exact path="/home" element={<PrivateRoute element={<Home />} />} />
                <Route exact path="/nutrition-planner" element={<PrivateRoute element={<NutritionPlanner />} />} />
                <Route exact path="/counselling" element={<PrivateRoute element={<Counselling />} />} />
                <Route exact path="/hospital-location" element={<PrivateRoute element={<HospitalLocation />} />} />
                <Route exact path="/first-aid" element={<PrivateRoute element={<FirstAid />} />} />
                <Route exact path="/community-platform" element={<PrivateRoute element={<Feedback />} />} />
              </Routes>
            </Container>
          </Box>
        </Box>
      </BrowserRouter>
    </>
  );
}

export default App;
