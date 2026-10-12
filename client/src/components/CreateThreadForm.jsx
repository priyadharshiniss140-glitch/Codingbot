import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createThread } from "../services/threads.service";

export default function CreateThreadForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createThread,
    onSuccess: async () => {
      // Mark the list stale and wait for its active query to refetch.
      await queryClient.invalidateQueries({ queryKey: ["threads"] });
      setTitle("");
      setBody("");
    },
    onError: (error) => {
      // The mutation state is rendered below; this hook is useful for diagnostics.
      console.error("Failed to post thread:", error);
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    mutation.mutate({ title, body });
  }

  const errorMessage =
    mutation.error?.response?.data?.error ||
    mutation.error?.message ||
    "Failed to post thread. Please try again.";

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        aria-label="Title"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="What's on your mind?"
        aria-label="Thread body"
      />
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Posting…" : "Post thread"}
      </button>
      {mutation.isError && (
        <p className="err" role="alert">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
