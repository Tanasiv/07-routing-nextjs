"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "../../../lib/api";

import css from "./NoteDetails.module.css";

export default function NoteDetailsClient() {
  const params = useParams();
  const id = params?.id as string;

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

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