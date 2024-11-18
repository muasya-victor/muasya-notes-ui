import { useEffect } from 'react';

const Login = () => {
    useEffect(() => {
        const signInWithGoogle = async () => {
            try {
                // Redirect to your backend's Google login endpoint
                window.location.href = 'http://localhost:5000/auth/login';
            } catch (error) {
                console.error('Error redirecting to Google login:', error);
            }
        };

        console.log('Redirecting to Google login...');
        signInWithGoogle(); // Automatically trigger Google login on mount
    }, []);

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <h1 className="text-2xl font-bold">Redirecting to login...</h1>
        </div>
    );
};

export default Login;
