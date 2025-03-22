import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import NewsDetail from "./Pages/NewsDetail";
import Navbar from "./components/NabBar";
import { Box } from "@chakra-ui/react";

const App = () => {
  return (
    <Box w={"100%"}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/category/science" />} />
        <Route path="/category/:category" element={<Home />} />
        <Route path="/news/:id" element={<NewsDetail />} />
      </Routes>
    </Box>
  );
};

export default App;
