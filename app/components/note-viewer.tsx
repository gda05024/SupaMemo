"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";

const NoteViewer = ({note, setActiveNoteId, fetchNotes}) => {
  const [title, setTitle] = useState(note?.title);
  const [content, setContent] = useState(note?.content);
  const [isEditing, setIsEditing] = useState(false);

  const onEdit = async () => {
    const {data, error} = await supabase.from('note').update({
      title,
      content
    }).eq('id', note.id).select();

    if (error) {
      alert(error.message);
    }

    setIsEditing(false);
    fetchNotes();
  }

  const onDelete = async () => {
    const {error} = await supabase.from('note').delete().eq('id', note.id);
    if (error) {
      alert(error.message);
    }

    setIsEditing(false);
    setActiveNoteId(null);
    fetchNotes();
  }

  useEffect(() => {
    setTitle(note?.title);
    setContent(note?.content);
    setIsEditing(false);
  }, [note]);
  
  return (
    <div className="w-2/3 p-2 gap-2 flex flex-col absolute right-0 top-0 bottom-0 bg-gray-100">
      {isEditing ? (
        <>
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
        </>
      ) : (
        <>
          <h1 className="rounded-md bg-white text-sm p-1.5">
            {title}
          </h1>
          <p className="border rounded-md border-gray-200 bg-white text-xs p-1.5 grow">
            {content}
          </p>
        </>
      )}
      <div className="w-full flex justify-end">
        {isEditing ? (
          <div className="flex gap-2">
            <button onClick={() => onEdit()} className="px-4 py-2 rounded-md bg-gray-400 text-white text-xs cursor-pointer hover:bg-gray-500 transition-all duration-300 ease-in-out">
              저장
            </button>
            <button onClick={() => onDelete()} className="px-4 py-2 rounded-md border border-gray-400 text-gray-500 text-xs cursor-pointer hover:bg-white transition-all duration-300 ease-in-out">
              삭제
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 rounded-md bg-gray-400 text-white text-xs cursor-pointer hover:bg-gray-500 transition-all duration-300 ease-in-out"
            >
              수정
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default NoteViewer;
