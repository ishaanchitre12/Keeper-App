import axios from "axios";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const API_URL = "http://localhost:4000/notes";
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);

  // useEffect(() => {
  //   getNotes();
  // }, []);

  // async function getNotes() {
  //   try {
  //     const response = await axios.get(API_URL);
  //     setNotes(response.data)
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // }

  async function addNote(newNote) {
    console.log("clicked");
    console.log(newNote);
    try {
      if (editingNote) {
        const response = await axios.patch(`${API_URL}/${newNote.id}`, newNote);
        setNotes(prevNotes => [...prevNotes, response.data[0]]);
      } else {
        const response = await axios.post(API_URL, newNote);
        console.log(response.data);
        setNotes(prevNotes => [...prevNotes, response.data[0]]);
      }
      setEditingNote(null);
    } catch (err) {
      console.error(err.message);
    }
  }

  async function editNote(newNote) {
    console.log(newNote);
    setEditingNote(newNote);
    setNotes(prevNotes => prevNotes.filter(note => note.id !== newNote.id))
    // try {
    //   const {id} = newNote;
    //   const response = await axios.patch(`${API_URL}/${id}`, newNote);
    // } catch (err) {
    //   console.error(err.message);
    // }
  }

  async function deleteNote(id) {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      setNotes(prevNotes => {
        return prevNotes.filter(note => note.id !== id);
      });        
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <div>
      <Header />
      <CreateArea editingNote={editingNote} onClick={addNote} />
      {notes.map(note => (
        <Note
          key={note.id}
          id={note.id}
          title={note.title}
          content={note.content}
          onEdit={editNote}
          onDelete={deleteNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
