import React from "react";
import NoteCard from "./NoteCard";

const dummyNotes = [
    {
        id: 1,
        title: "Microsoft Dynamics CRM",
        content: "INNOVATIVE PLENITUDE SOLUTIONS",
        image: "link-to-image", // Add your image URL
    },
    {
        id: 2,
        title: "Power BI",
        content: "INNOVATIVE PLENITUDE SOLUTIONS",
        image: "link-to-image",
    },
];

const NotesGrid = () => {
    return (
        <div className="p-4 grid grid-cols-3 gap-4">
            {dummyNotes.map((note) => (
                <NoteCard key={note.id} note={note} />
            ))}
        </div>
    );
};

export default NotesGrid;
