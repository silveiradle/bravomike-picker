import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { MatchProvider } from "./pages/matchStore"
import ResultPage from "./pages/ResultPage"
import SetupPage from "./pages/SetupPage"
import VetoPage from "./pages/VetoPage"
import { useEffect } from "react"

export default function App() {
  useEffect(() => {
    document.title = "BRAVO.MIKE - Map picker";
  }, []);

  return (
    <MatchProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/setup" />} />
          <Route path="/setup" element={<SetupPage />} />
          <Route path="/veto" element={<VetoPage />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </BrowserRouter>
    </MatchProvider>
  )
}
