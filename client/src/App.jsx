import ThreadList from "./components/ThreadList.jsx";

// The frontend is already complete and does NOT change in this assignment.
export default function App() {
  return (
    <div className="wrap">
      <h1>Threadbase</h1>
      <p className="muted">The same app — soon backed by a real PostgreSQL database.</p>
      <ThreadList />
    </div>
  );
}
