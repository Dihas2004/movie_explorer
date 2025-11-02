import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import MovieDetails from './pages/MovieDetails';
import NavBar from './components/NavBar';
import ProtectedRoute from './auth/ProtectedRoute';

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<ProtectedRoute>
            <NavBar/>
            <Home />
          </ProtectedRoute>} />
        <Route
          path="/movie/:imdbID"
          element={<ProtectedRoute>
            <MovieDetails />
          </ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App;
