// src/App.js

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Chapter from './components/Chapter';
import ForgotPassword from './components/ForgotPassword';
import Home from './components/Home';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Shlokas from './components/Shlokas';
import Signup from './components/Signup';
import { AuthProvider } from './context/AuthContext';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route
                        path="/home"
                        element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/books/:bookId/chapters"
                        element={
                            <ProtectedRoute>
                                <Chapter />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/books/:bookId/chapters/:chapterId/shlokas"
                        element={
                            <ProtectedRoute>
                                <Shlokas />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
