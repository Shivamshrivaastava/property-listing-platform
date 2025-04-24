import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PropertiesPage from './pages/PropertiesPage';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import FavoritesPage from './pages/FavoritesPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage'; 
import { FavoritesProvider } from './context/FavoritesContext';
import ProtectedRoute from './pages/ProtectedRoute';
import './styles/tailwind.css';

import React from 'react';

const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAuthRoute = ['/login', '/register'].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {!isAuthRoute && <Header />}
      <main className="flex-grow">{children}</main>
      {!isAuthRoute && <Footer />}
    </div>
  );
};

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <LayoutWrapper>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/property/:id" element={<PropertyDetailsPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </LayoutWrapper>
      </Router>
    </FavoritesProvider>
  );
}

export default App;
