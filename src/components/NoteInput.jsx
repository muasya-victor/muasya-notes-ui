// import { useState, useEffect } from 'react';
// import { Check, Pencil, Image, Save } from 'lucide-react';
//
// export const NoteInput = ({ onSubmit }) => {
//     const [note, setNote] = useState('');
//     const [title, setTitle] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [notes, setNotes] = useState([]);
//     const [editingNoteId, setEditingNoteId] = useState(null);
//     const [isExpanded, setIsExpanded] = useState(false);
//
//     // Existing fetch notes effect and helper functions remain the same
//     useEffect(() => {
//         const fetchNotes = async () => {
//             try {
//                 const response = await fetch('http://localhost:5000/notes', {
//                     method: 'GET',
//                     credentials: 'include',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Accept': 'application/json',
//                     },
//                 });
//
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch notes');
//                 }
//
//                 const data = await response.json();
//                 setNotes(data);
//             } catch (error) {
//                 setError('Error fetching notes');
//                 console.error(error);
//             }
//         };
//
//         fetchNotes();
//     }, []);
//
//     const getUserFromStorage = () => {
//         try {
//             const storedUser = localStorage.getItem('user');
//             if (!storedUser) {
//                 throw new Error('No user found. Please log in.');
//             }
//             return JSON.parse(storedUser);
//         } catch (error) {
//             console.error('Error getting user from storage:', error);
//             throw new Error('Please log in to save notes.');
//         }
//     };
//
//     const resetForm = () => {
//         setNote('');
//         setTitle('');
//         setError(null);
//         setEditingNoteId(null);
//         setIsExpanded(false);
//     };
//
//     const handleSave = async (e) => {
//         e?.preventDefault();
//         setError(null);
//         setIsLoading(true);
//
//         try {
//             if (!title.trim() || !note.trim()) {
//                 throw new Error('Please fill in both title and content.');
//             }
//
//             const user = getUserFromStorage();
//             if (!user?.email) {
//                 throw new Error('User email not found. Please log in again.');
//             }
//
//             const requestData = {
//                 title: title.trim(),
//                 content: note.trim(),
//                 email: user.email,
//             };
//
//             let response;
//
//             if (editingNoteId) {
//                 response = await fetch(`http://localhost:5000/notes/${editingNoteId}`, {
//                     method: 'PUT',
//                     credentials: 'include',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Accept': 'application/json',
//                     },
//                     body: JSON.stringify(requestData),
//                 });
//             } else {
//                 response = await fetch('http://localhost:5000/notes', {
//                     method: 'POST',
//                     credentials: 'include',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Accept': 'application/json',
//                     },
//                     body: JSON.stringify(requestData),
//                 });
//             }
//
//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.error || 'Failed to save note');
//             }
//
//             const data = await response.json();
//             resetForm();
//             onSubmit?.(data);
//
//             setNotes((prevNotes) => {
//                 if (editingNoteId) {
//                     return prevNotes.map((n) =>
//                         n.id === editingNoteId ? { ...n, title: data.title, content: data.content } : n
//                     );
//                 } else {
//                     return [data.note, ...prevNotes];
//                 }
//             });
//
//             const successMessage = document.getElementById('successMessage');
//             successMessage.classList.remove('hidden');
//             setTimeout(() => {
//                 successMessage.classList.add('hidden');
//             }, 3000);
//
//         } catch (error) {
//             console.error('Error saving note:', error);
//             setError(error.message);
//         } finally {
//             setIsLoading(false);
//         }
//     };
//
//     const handleEdit = (noteToEdit) => {
//         setTitle(noteToEdit.title);
//         setNote(noteToEdit.content);
//         setEditingNoteId(noteToEdit.id);
//         setIsExpanded(true);
//     };
//
//     return (
//         <div className="px-4 py-6">
//             {/* Input Form */}
//             <div className="mb-8">
//                 <form
//                     style={{borderRadius:'.4rem'}}
//                     onSubmit={handleSave}
//                     className="w-full max-w-2xl mx-auto bg-white rounded
//                      border hover:shadow-lg transition-shadow duration-200"
//                 >
//                     <div className="p-4">
//                         {isExpanded && (
//                             <input
//                                 type="text"
//                                 placeholder="Title"
//                                 className="w-full mb-2 text-lg font-medium focus:outline-none"
//                                 value={title}
//                                 onChange={(e) => setTitle(e.target.value)}
//                                 disabled={isLoading}
//                             />
//                         )}
//                         <div
//                             className="min-h-[40px]"
//                             onClick={() => !isExpanded && setIsExpanded(true)}
//                         >
//                             <textarea
//                                 placeholder="Take a note..."
//                                 className="w-full resize-none focus:outline-none"
//                                 value={note}
//                                 onChange={(e) => setNote(e.target.value)}
//                                 disabled={isLoading}
//                                 rows={isExpanded ? 3 : 1}
//                             />
//                         </div>
//                     </div>
//
//                     {isExpanded && (
//                         <div className="px-4 pb-2 flex justify-end items-center space-x-2">
//                             <button
//                                 type="button"
//                                 className="p-2 rounded-full hover:bg-gray-100"
//                                 onClick={() => setIsExpanded(false)}
//                             >
//                                 <Image size={20} className="text-gray-600" />
//                             </button>
//                             <button
//                                 type="submit"
//                                 style={{borderRadius:'.4rem'}}
//                                 className="px-4 py-1.5 text-sm font-medium text-gray-600
//                                 hover:bg-gray-100 rounded-md transition-colors"
//                                 disabled={isLoading}
//                             >
//                                 {editingNoteId ? 'Update' : 'Save'}
//                             </button>
//                         </div>
//                     )}
//                 </form>
//
//                 {/* Success Message */}
//                 <div
//                     id="successMessage"
//                     className="hidden mt-4 p-2 text-sm text-green-700 bg-green-100 rounded-md text-center max-w-2xl mx-auto"
//                 >
//                     Note saved successfully!
//                 </div>
//
//                 {/* Error Message */}
//                 {error && (
//                     <div className="mt-4 p-2 text-sm text-red-700 bg-red-100 rounded-md text-center max-w-2xl mx-auto">
//                         {error}
//                     </div>
//                 )}
//             </div>
//
//             {/* Notes Grid */}
//             <div className="columns-1 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-7 gap-4 space-y-4">
//                 {notes.filter((note) => note && note.id).map((note) => (
//                     <div
//                         key={note.id}
//                         className="break-inside-avoid-column mb-4 w-full inline-block"
//                     >
//                         <div style={{borderRadius:'.4rem'}}
//                             className="p-4 rounded-lg hover:shadow-md border
//                             transition-shadow duration-200 cursor-pointer break-words h-fit"
//                             onClick={() => handleEdit(note)}
//                         >
//                             {note.title && (
//                                 <h3 className="text-base font-bold mb-2 text-gray-800">
//                                     {note.title}
//                                 </h3>
//                             )}
//                             <p className="text-sm text-gray-600">{note.content}</p>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };
//
// export default NoteInput;
import { useState, useEffect } from 'react';
import { Check, Pencil, Image, Save } from 'lucide-react';

export const NoteInput = ({ onSubmit }) => {
    const [note, setNote] = useState('');
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState(''); // State for image URL
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [notes, setNotes] = useState([]);
    const [editingNoteId, setEditingNoteId] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await fetch('http://localhost:5000/notes', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch notes');
                }

                const data = await response.json();
                setNotes(data);
            } catch (error) {
                setError('Error fetching notes');
                console.error(error);
            }
        };

        fetchNotes();
    }, []);

    const getUser FromStorage = () => {
        try {
            const storedUser  = localStorage.getItem('user');
            if (!storedUser ) {
                throw new Error('No user found. Please log in.');
            }
            return JSON.parse(storedUser );
        } catch (error) {
            console.error('Error getting user from storage:', error);
            throw new Error('Please log in to save notes.');
        }
    };

    const resetForm = () => {
        setNote('');
        setTitle('');
        setImageUrl(''); // Reset image URL
        setError(null);
        setEditingNoteId(null);
        setIsExpanded(false);
    };

    const handleSave = async (e) => {
        e?.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            if (!title.trim() || !note.trim()) {
                throw new Error('Please fill in both title and content.');
            }

            const user = getUser FromStorage();
            if (!user?.email) {
                throw new Error('User  email not found. Please log in again.');
            }

            const requestData = {
                title: title.trim(),
                content: note.trim(),
                imageUrl: imageUrl.trim(), // Include image URL
                email: user.email,
            };

            let response;

            if (editingNoteId) {
                response = await fetch(`http://localhost:5000/notes/${editingNoteId}`, {
                    method: 'PUT',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify(requestData),
                });
            } else {
                response = await fetch('http://localhost:5000/notes', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify(requestData),
                });
            }

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to save note');
            }

            const data = await response.json();
            resetForm();
            onSubmit?.(data);

            setNotes((prevNotes) => {
                if (editingNoteId) {
                    return prevNotes.map((n) =>
                        n.id === editingNoteId ? { ...n, title: data.title, content: data.content, imageUrl: data.imageUrl } : n
                    );
                } else {
                    return [{ ...data.note, imageUrl: data.imageUrl }, ...prevNotes]; // Include image in new notes
                }
            });

            const successMessage = document.getElementById('successMessage');
            successMessage.classList.remove('hidden');
            setTimeout(() => {
                successMessage.classList.add ('hidden');
            }, 3000);

        } catch (error) {
            console.error('Error saving note:', error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (noteToEdit) => {
        setTitle(noteToEdit.title);
        setNote(noteToEdit.content);
        setImageUrl(noteToEdit.imageUrl || ''); // Set image URL for editing
        setEditingNoteId(noteToEdit.id);
        setIsExpanded(true);
    };

    return (
        <div className="px-4 py-6">
            <div className="mb-8">
                <form
                    style={{ borderRadius: '.4rem' }}
                    onSubmit={handleSave}
                    className="w-full max-w-2xl mx-auto bg-white rounded border hover:shadow-lg transition-shadow duration-200"
                >
                    <div className="p-4">
                        {isExpanded && (
                            <input
                                type="text"
                                placeholder="Title"
                                className="w-full mb-2 text-lg font-medium focus:outline-none"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                disabled={isLoading}
                            />
                        )}
                        <div
                            className="min-h-[40px]"
                            onClick={() => !isExpanded && setIsExpanded(true)}
                        >
                            <textarea
                                placeholder="Take a note..."
                                className="w-full resize-none focus:outline-none"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                disabled={isLoading}
                                rows={isExpanded ? 3 : 1}
                            />
                        </div>
                        {isExpanded && (
                            <input
                                type="text"
                                placeholder="Image URL"
                                className="w-full mb-2 text-lg font-medium focus:outline-none"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                disabled={isLoading}
                            />
                        )}
                    </div>

                    {isExpanded && (
                        <div className="px-4 pb-2 flex justify-end items-center space-x-2">
                            <button
                                type="button"
                                className="p-2 rounded-full hover:bg-gray-100"
                                onClick={() => setIsExpanded(false)}
                            >
                                <Image size={20} className="text-gray-600" />
                            </button>
                            <button
                                type="submit"
                                style={{ borderRadius: '.4rem' }}
                                className="px-4 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                                disabled={isLoading}
                            >
                                {editingNoteId ? 'Update' : 'Save'}
                            </button>
                        </div>
                    )}
                </form>

                <div
                    id="successMessage"
                    className="hidden mt-4 p-2 text-sm text-green-700 bg-green-100 rounded-md text-center max-w-2xl mx-auto"
                >
                    Note saved successfully!
                </div>

                {error && (
                    <div className="mt-4 p-2 text-sm text-red-700 bg-red-100 rounded-md text-center max-w-2xl mx-auto">
                        {error}
                    </div>
                )}
            </div>

            <div className="columns-1 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-7 gap-4 space-y-4">
                {notes.filter((note) => note && note.id).map((note) => (
                    <div
                        key={note.id}
                        className="break-inside-avoid-column mb-4 w-full inline-block"
                    >
                        <div style={{ borderRadius: '.4rem' }}
                             className="p-4 rounded-lg hover:shadow-md border transition-shadow duration-200 cursor-pointer break-words h-fit"
                             onClick={() => handleEdit(note)}
                        >
                            {note.title && (
                                <h3 className="text-base font-bold mb-2 text-gray-800">
                                    {note.title}
                                </h3>
                            )}
                            <p className="text-sm text-gray-600">{note.content}</p>
                            {note.imageUrl && (
                                <img src={note.imageUrl} alt="Note" className="mt-2 rounded" />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
