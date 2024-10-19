// src/components/ProtectedRoute.js

import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth(); // Get the current user from context

    // If there is no user, redirect to login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children; // If user exists, render the children
};

export default ProtectedRoute;
