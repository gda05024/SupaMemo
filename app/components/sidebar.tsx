"use client";
const Sidebar = ({notes, activeNoteId, setActiveNoteId, setIsCreating, search, setSearch}) => {
  return (
    <aside className="absolute top-0 left-0 bottom-0 w-1/3 overflow-y-auto p-2 border-r border-solid border-gray-200">
      <button onClick={() => setIsCreating(true)} className="p-1 text-sm text-gray-500 font-bold border border-gray-400 rounded-lg w-full cursor-pointer hover:bg-gray-600 hover:text-white transition-all duration-300 ease-in-out">+ 새로운 노트</button>
      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className="mt-2 border-b border-gray-300  w-full p-1 text-sm focus:outline-none" placeholder="노트를 입력하세요" />
      <ul className="mt-2 flex flex-col gap-2">
        {notes.map((note) => (
          <li key={note.id} className={`${activeNoteId === note.id ? "font-bold" : ""}`}>
            <button onClick={() => {
              setIsCreating(false);
              setActiveNoteId(note.id);
            }}>
              {note.title}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
