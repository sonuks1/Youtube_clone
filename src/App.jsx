import React from "react";
import "./App.css";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import MovieStream from "./pages/MovieStream";
import WatchList from "./pages/WatchList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./pages/Auth/Signin";
import Register from "./pages/Auth/Register";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.auth.user);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<Homepage />} path="*"></Route>
        <Route element={<MovieStream />} path="/moviestream/:id"></Route>
        {user && <Route element={<WatchList />} path="/watchlist"></Route>}
        {!user && <Route element={<Register />} path="/register"></Route>}
        {!user && <Route element={<Signin />} path="/login"></Route>}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
