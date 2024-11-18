const NoteCard = ({ note }) => {
    return (
        <div className="border p-4 rounded shadow">
            <img src={note?.image} alt={note?.title} className="mb-4 rounded" />
            <h3 className="font-bold text-lg">{note?.title}</h3>
            <p className="text-sm">{note?.content}</p>
        </div>
    );
};

export default NoteCard;
