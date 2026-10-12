import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateThread, deleteThread } from "../services/threads.service";

export default function ThreadItem({ thread }) {
  const [title, setTitle] = useState(thread.title);
  const [editing, setEditing] = useState(false);
  const queryClient = useQueryClient();

  const editMutation = useMutation({
    mutationFn: ({ id, data }) => updateThread(id, data),
    onSuccess: async (updated, { id }) => {
      // An edit changes both the thread list and the individual detail cache.
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["threads"] }),
        queryClient.invalidateQueries({ queryKey: ["thread", id] }),
      ]);
      if (updated?.title) setTitle(updated.title);
      setEditing(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteThread,
    onSuccess: async () => {
      // Deletion affects the list. Do not invalidate the detail key.
      await queryClient.invalidateQueries({ queryKey: ["threads"] });
    },
  });

  function handleSave() {
    editMutation.mutate({ id: thread.id, data: { title } });
  }

  function handleDelete() {
    deleteMutation.mutate(thread.id);
  }

  const editError =
    editMutation.error?.response?.data?.error ||
    editMutation.error?.message ||
    "Unable to update this thread.";
  const deleteError =
    deleteMutation.error?.response?.data?.error ||
    deleteMutation.error?.message ||
    "Unable to delete this thread.";

  if (editing) {
    return (
      <li className="card">
        <input
          className="edit-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-label="Edit thread title"
          disabled={editMutation.isPending}
        />
        {editMutation.isError && (
          <p className="err" role="alert">{editError}</p>
        )}
        <div className="row">
          <button
            className="btn-primary"
            onClick={handleSave}
            disabled={editMutation.isPending}
          >
            {editMutation.isPending ? "Saving…" : "Save"}
          </button>
          <button
            className="btn-ghost"
            onClick={() => {
              setTitle(thread.title);
              setEditing(false);
              editMutation.reset();
            }}
            disabled={editMutation.isPending}
          >
            Cancel
          </button>
        </div>
      </li>
    );
  }

  return (
    <li className="card">
      <h3>{thread.title}</h3>
      <p>{thread.body}</p>
      {deleteMutation.isError && (
        <p className="err" role="alert">{deleteError}</p>
      )}
      <div className="row">
        <button
          className="btn-ghost"
          onClick={() => {
            setTitle(thread.title);
            editMutation.reset();
            setEditing(true);
          }}
          disabled={deleteMutation.isPending}
        >
          Edit
        </button>
        <button
          className="btn-danger"
          onClick={handleDelete}
          disabled={deleteMutation.isPending}
        >
          {deleteMutation.isPending ? "Deleting…" : "Delete"}
        </button>
      </div>
    </li>
  );
}
