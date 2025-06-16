import { Box } from "@chakra-ui/react";
import { useColorModeValue } from "./components/ui/color-mode";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div>
      <Box
        minH={"100vh"}
        minW={"100vw"}
        bg={useColorModeValue("gray.100", "gray.900")}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </Box>
    </div>
  );
};

export default App;
