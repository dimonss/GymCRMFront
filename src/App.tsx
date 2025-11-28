import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';
import './styles/globals.css';
import './styles/animations.css';

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const ApplicationForm = lazy(() => import('./pages/ApplicationForm').then(module => ({ default: module.ApplicationForm })));
const ClubCRM = lazy(() => import('./pages/ClubCRM').then(module => ({ default: module.ClubCRM })));
const AdminPanel = lazy(() => import('./pages/AdminPanel').then(module => ({ default: module.AdminPanel })));

// Loading component
const LoadingFallback: React.FC = () => (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        fontSize: '1.5rem',
        color: 'var(--text-secondary)'
    }}>
        <div className="pulse">Загрузка...</div>
    </div>
);

function App() {

    return (
        <AuthProvider>
            <BrowserRouter basename={'/gym_crm'}>
                <div className="app">
                    <Header />
                    <main>
                        <Suspense fallback={<LoadingFallback />}>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/application" element={<ApplicationForm />} />
                                <Route
                                    path="/crm"
                                    element={
                                        <ProtectedRoute requiredRole="club_admin">
                                            <ClubCRM />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/admin"
                                    element={
                                        <ProtectedRoute requiredRole="super_admin">
                                            <AdminPanel />
                                        </ProtectedRoute>
                                    }
                                />
                            </Routes>
                        </Suspense>
                    </main>
                    <Footer />
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
