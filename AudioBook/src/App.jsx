import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Ensure this import is correct
import Chapter from './components/Chapter';
import ForgotPassword from './components/ForgotPassword';
import Home from './components/Home';
import Login from './components/Login';
import Shlokas from './components/Shlokas';
import Signup from './components/Signup';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute

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
          <Route index path='/' element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
