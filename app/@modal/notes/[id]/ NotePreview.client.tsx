"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Modal from "../../../../components/Modal/Modal";

export default function NotePreviewClient({ id }: { id: string }) {
  const { data: note, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <Modal><p>Loading...</p></Modal>;
  if (isError || !note) return <Modal><p>Something went wrong</p></Modal>;

  return (
    <Modal>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <p>{note.tag}</p>
      <p>{new Date(note.createdAt).toLocaleDateString()}</p>
    </Modal>
  );
}