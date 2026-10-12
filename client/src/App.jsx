import CreateThreadForm from "./components/CreateThreadForm.jsx";
import ThreadList from "./components/ThreadList.jsx";

export default function App() {
  return (
    <div className="wrap">
      <h1>Threadbase</h1>
      <p className="muted">Post a thread — then watch the list refresh itself.</p>
      <CreateThreadForm />
      <ThreadList />
    </div>
  );
}
