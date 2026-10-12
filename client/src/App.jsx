import ThreadList from "./components/ThreadList.jsx";

export default function App() {
  return (
    <div className="wrap">
      <h1>Threadbase</h1>
      <p className="muted">Thread list — powered by TanStack Query.</p>
      <ThreadList />
    </div>
  );
}
