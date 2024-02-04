import VideoPlayerScreen from "./pages/VideoPlayerScreen";
import { Routes, Route } from "react-router";
import Homepage from "./pages/Homepage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/player" element={<VideoPlayerScreen />} />
    </Routes>
  );
}
