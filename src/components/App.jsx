// import { useState } from 'react'
import MainPage from "./MainPage";
import { Routes, Route } from "react-router-dom";
import Surah from "./Surah";
import NotFound from "./NotFound";
import "./../App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/player/:surah" element={<Surah />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
