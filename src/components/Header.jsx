import { Menu, Search, RefreshCw, Grid, LucideView } from 'lucide-react';
import { useEffect, useState } from 'react';

export const Header = () => {
    // State to store user data
    const [authData, setAuthData] = useState(null);

    // Get user data from localStorage
    const getAuthData = () => {
        try {
            const storedUser = localStorage.getItem('muasyaNotesAuth');
            if (!storedUser) {
                throw new Error('No profile photo found.');
            }
            return JSON.parse(storedUser);
        } catch (error) {
            console.error('Error getting profile from storage:', error);
            return null;  // Return null if there was an error
        }
    };

    // Fetch the auth data when the component mounts
    useEffect(() => {
        const data = getAuthData();
        setAuthData(data);
    }, []); // Empty dependency array means this runs once when the component mounts

    // Sign out function
    const signOut = () => {
        localStorage.removeItem('user'); // Clear user data
        window.location.reload(); // Reload to redirect to login page or reset state
    };

    return (
        <header className="flex items-center justify-between px-4 py-2 bg-white border-b">
            <div className="flex items-center">
                <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Menu size={20} />
                </button>
                <div className="flex items-center ml-4">
                    <span className="text-xl font-medium">Muasya Notes</span>
                </div>
            </div>

            <div className="flex-grow max-w-3xl mx-4">
                <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg">
                    <Search size={20} className="text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full bg-transparent border-none focus:outline-none ml-2"
                    />
                </div>
            </div>

            <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-full">
                    <RefreshCw size={20} />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                    <LucideView size={20} />
                </button>
                {authData && (
                    <img
                        src={authData.photoURL || 'https://via.placeholder.com/40'} // Fallback image
                        alt="Profile"
                        className="w-8 h-8 rounded-full cursor-pointer"
                        onClick={signOut}
                    />
                )}
            </div>
        </header>
    );
};
