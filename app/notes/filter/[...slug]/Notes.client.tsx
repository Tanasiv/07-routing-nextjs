"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";

export default function NotesClient({ tag }: { tag: string }) {
  const { data } = useQuery({
    queryKey: ["notes", tag],
    queryFn: () => fetchNotes(1, "", tag),
  });

  return <div>{/* render notes */}</div>;
}