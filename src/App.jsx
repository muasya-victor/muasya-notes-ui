import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { NoteInput } from './components/NoteInput';
import Login from './pages/Login';
import Callback from './pages/Callback';

// Utility function to get user data from localStorage
const getUserFromStorage = () => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
};

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
    const user = getUserFromStorage();

    // Redirect to login page if user is not authenticated
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/auth/callback" element={<Callback />} />
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <div className="flex flex-col h-screen w-full bg-red-200">
                                <Header />
                                <div className="flex flex-1 overflow-hidden  w-full bg-red-200">
                                    <Sidebar />
                                    <main className="flex-1  w-full overflow-y-auto bg-gray-50 p-4">
                                        <NoteInput />
                                    </main>
                                </div>
                            </div>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
