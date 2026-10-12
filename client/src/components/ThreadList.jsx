import { useQuery } from "@tanstack/react-query";
import { getThreads } from "../services/threads.service";

export default function ThreadList() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["threads"],
    queryFn: getThreads,
  });

  if (isPending) {
    return <p>Loading threads…</p>;
  }

  if (isError) {
    return <p className="err">Error: {error.message}</p>;
  }

  return (
    <ul className="threads">
      {data.map((thread) => (
        <li className="card" key={thread.id}>
          <h3>{thread.title}</h3>
          <p>{thread.body}</p>
        </li>
      ))}
    </ul>
  );
}
