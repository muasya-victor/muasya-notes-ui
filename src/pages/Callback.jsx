import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Callback = () => {
    const navigate = useNavigate();
    // const { setUser } = useAuth();
    const isRequestMade = useRef(false); // Tracks if the request has been made

    useEffect(() => {
        const handleCallback = async () => {
            if (isRequestMade.current) return;
            isRequestMade.current = true;

            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');
            const state = urlParams.get('state');

            if (code && state) {
                try {
                    const response = await fetch(
                        `http://localhost:5000/auth/callback?code=${code}&state=${state}`,
                        { method: 'GET', credentials: 'include' }
                    );

                    if (response.ok) {
                        const data = await response.json();
                        console.log('User data:', data?.data);
                        localStorage.setItem('user', JSON.stringify(data?.data));
                        localStorage.setItem('muasyaNotesAuth', JSON.stringify(data));
                        navigate('/');
                    } else {
                        console.error('Response failed:', response.status);
                        const errorData = await response.text();
                        console.error('Error details:', errorData);
                        alert('Authentication failed!');
                    }
                } catch (error) {
                    console.error('Error during callback handling:', error);
                    alert('An error occurred. Please try again.');
                }
            } else {
                console.error('Missing code or state in the callback URL.');
                alert('Invalid callback URL. Please try again.');
                navigate('/login');
            }
        };

        handleCallback();
    }, [navigate]);

    return <div>Processing login...</div>;
};

export default Callback;
