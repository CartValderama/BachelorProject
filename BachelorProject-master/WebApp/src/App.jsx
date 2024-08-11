import React from "react";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import Modes from "./pages/Modes.jsx";
import Library from "./pages/Library.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import FeedbackMode from "./pages/FeedbackMode.jsx";
import DefaultMode from "./pages/DefaultMode.jsx";
import MatchingMode from "./pages/MatchingMode.jsx";
import DeckDashboard from "./pages/DeckDashboard.jsx";
import DeckFormAI from "./pages/DeckFormAI.jsx";
import DeckFormNormal from "./pages/DeckFormNormal.jsx";
import MultipleChoiceMode from "./pages/MultipleChoiceMode.jsx";
import Tutorial from "./pages/Tutorial.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />}></Route>
      <Route path="/tutorial" element={<Tutorial />}></Route>
      <Route path="/deck/:id">
        <Route path=":menu" element={<Modes />}></Route>
        <Route path="feedback" element={<FeedbackMode />}></Route>
        <Route path="default" element={<DefaultMode />}></Route>
        <Route path="matching" element={<MatchingMode />}></Route>
        <Route path="quiz" element={<MultipleChoiceMode />}></Route>
        <Route path="dashboard" element={<DeckDashboard />}></Route>
      </Route>
      <Route path="/library" element={<Library />}></Route>
      <Route path="/create_deck">
        <Route path="with_ai" element={<DeckFormAI />}></Route>
        <Route path="normal" element={<DeckFormNormal />}></Route>
      </Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}

export default App;
