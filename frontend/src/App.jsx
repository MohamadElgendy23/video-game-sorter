import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Games from "./pages/Games";
import GameDetails from "./pages/GameDetails";
import AddGame from "./pages/AddGame";
import EditGame from "./pages/EditGame";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/:id" element={<GameDetails />} />
        <Route path="/games/new" element={<AddGame />} />
        <Route path="/games/:id/edit" element={<EditGame />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
