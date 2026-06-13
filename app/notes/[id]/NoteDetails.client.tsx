"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "../../../lib/api";

import css from "./NoteDetails.module.css";

export default function NoteDetailsClient() {
  const params = useParams();
  const id = params?.id as string;

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
    enabled: !!id,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !note) return <p>Error</p>;

  return (
    <main className={css.main}>
      <div className={css.container}>
        <h2>{note.title}</h2>
        <p>{note.tag}</p>
        <p>{note.content}</p>
        <p>{note.createdAt}</p>
      </div>
    </main>
  );
}