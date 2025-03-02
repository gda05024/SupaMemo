"use client";
import { useState } from "react";
import { supabase } from "@/utils/supabase";
const NewNote = ({setIsCreating, setActiveNoteId, fetchNotes}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onSave = async () => {
    if (!title || !content) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    const {data, error} = await supabase.from('note').insert({
      title,
      content
    }).select();

    if (error) {
      alert(error.message);
    }

    await fetchNotes();
    setActiveNoteId((data as any[])[0].id);
    setIsCreating(false);
  }

  return (
    <div className="w-2/3 p-2 gap-2 flex flex-col absolute right-0 top-0 bottom-0 bg-gray-100">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        className="border rounded-md border-gray-300 bg-white text-sm p-1.5"
        placeholder="제목을 입력해주세요."
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border rounded-md border-gray-300 bg-white text-xs p-1.5 grow"
      />
      <div className="w-full flex justify-end">
        <button onClick={() =>  onSave()} className="px-4 py-2 rounded-md bg-gray-400 text-white text-xs cursor-pointer hover:bg-gray-500 transition-all duration-300 ease-in-out">
          저장
        </button>
      </div>
    </div>
  );
};

export default NewNote;
