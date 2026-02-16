import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);

  // 🟢 New states for editing
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  // 🔵 Fetch all notes
  function fetchNotes() {
    axios
      .get("https://cohort2-0-l303.onrender.com/api/notes")
      .then((res) => {
        setNotes(res.data.notes);
      })
      .catch((err) => {
        console.log("Fetch error:", err);
      });
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  // 🟢 Create note
  function handleSubmit(e) {
    e.preventDefault();

    const { Title, Description } = e.target.elements;

    axios
      .post("https://cohort2-0-l303.onrender.com/api/notes", {
        title: Title.value,
        description: Description.value,
      })
      .then((res) => {
        console.log(res.data);
        fetchNotes();
        e.target.reset(); // clear form
      })
      .catch((err) => {
        console.log("Post error:", err);
      });
  }

  // 🔴 Delete note
  function handleDelete(noteId) {
    axios
      .delete("https://cohort2-0-l303.onrender.com/api/notes/" + noteId)
      .then((res) => {
        console.log(res.data);
        fetchNotes();
      })
      .catch((err) => {
        console.log("Delete error:", err);
      });
  }

  // 🟣 Update note
  function handleUpdate(id) {
    axios
      .patch(`https://cohort2-0-l303.onrender.com/api/notes/${id}`, {
        description: editText,
      })
      .then((res) => {
        console.log(res.data);
        setEditId(null); // exit edit mode
        setEditText(""); // clear edit text
        fetchNotes(); // refresh notes
      })
      .catch((err) => {
        console.log("Update error:", err);
      });
  }

  return (
    <>
      {/* 🟢 Create Form */}
      <form className="input-note" onSubmit={handleSubmit}>
        <input name="Title" type="text" placeholder="Enter Title" />
        <input name="Description" type="text" placeholder="Enter Description" />
        <button>Create Note</button>
      </form>

      {/* 🔵 Notes Display */}
      <div className="notes">
        {notes.map((note) => (
          <div className="note" key={note._id}>
            <h1>{note.title}</h1>

            {/* 🟣 Conditional rendering for edit mode */}
            {editId === note._id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => handleUpdate(note._id)}>Save</button>
                <button onClick={() => setEditId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <p>{note.description}</p>
                <button
                  onClick={() => {
                    setEditId(note._id);
                    setEditText(note.description);
                  }}
                >
                  Edit
                </button>
              </>
            )}

            <button onClick={() => handleDelete(note._id)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
