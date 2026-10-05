import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "../features/home/HomePage";
export function App() {
  return (
    <BrowserRouter
      basename={import.meta.env.BASE_URL.replace(/\/$/, "") || "/"}
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
