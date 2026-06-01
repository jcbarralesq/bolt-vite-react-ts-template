import { Routes, Route } from "react-router-dom";
import App from "./App";
import { PublicProfile } from "./components/PublicProfile";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/u/:username" element={<PublicProfile />} />
    </Routes>
  );
}
