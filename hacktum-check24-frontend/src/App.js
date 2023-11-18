import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import SearchResultsPage from "./pages/SearchResultsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/results" element={<SearchResultsPage />} />
        <Route path="/" exact element={<SearchPage />} />
      </Routes>
    </Router>
  );
}

export default App;
