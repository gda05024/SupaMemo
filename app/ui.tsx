"use client";
import { useState, useEffect } from "react";
import Header from "@/app/components/header";
import Sidebar from "@/app/components/sidebar";
import NewNote from "@/app/components/new-note";
import NoteViewer from "@/app/components/note-viewer";
import EmptyNote from "@/app/components/empty-note";
import { supabase } from "@/utils/supabase";
import { Database } from "@/types_db";
export default function UI() {
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [notes, setNotes] = useState<Database["public"]["Tables"]["note"]["Row"][]>([]);
  const [search, setSearch] = useState("");

  const fetchNotes = async () => {
    const { data, error } = await supabase.from("note").select("*").like('title', `%${search}%`);
    if (error) {
      alert(error.message);
      return;
    }
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [search]);

  return (
    <main className="w-full h-screen flex flex-col">
      <Header />
      <div className="grow relative">
        <Sidebar
          activeNoteId={activeNoteId}
          setActiveNoteId={setActiveNoteId}
          setIsCreating={setIsCreating}
          notes={notes}
          search={search}
          setSearch={setSearch}
        />
        {isCreating ? (
          <NewNote fetchNotes={fetchNotes} setActiveNoteId={setActiveNoteId} setIsCreating={setIsCreating} />
        ) : activeNoteId ? (
          <NoteViewer  fetchNotes={fetchNotes} setActiveNoteId={setActiveNoteId}note={notes.find((note) => note.id === activeNoteId)} />
        ) : (
          <EmptyNote />
        )}
      </div>
    </main>
  );
}
