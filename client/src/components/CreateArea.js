import React, { useState, useEffect } from "react";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";

function CreateArea(props) {
  const [noteBody, setNoteBody] = useState({
    title: "",
    content: ""
  });

  const [isExpanded, setExpanded] = useState(false);

  useEffect(() => {
    const {editingNote} = props;
    if (editingNote) {
        setExpanded(true);
        const {id, title, content} = editingNote;
        setNoteBody({id: id, title: title, content: content});
    }
  }, [props.editingNote]);

  function handleChange(event) {
    const { name, value } = event.target;
    setNoteBody((prevNote) => {
      return { ...prevNote, [name]: value };
    });
  }

  return (
    <div>
        <form action="/notes" method="POST">
        {isExpanded && <input 
            onChange={handleChange} 
            name="title" 
            placeholder="Title" 
            value={noteBody.title}
        />}
        <textarea
            onChange={handleChange}
            onClick={() => setExpanded(true)}
            name="content"
            placeholder="Take a note..."
            rows={isExpanded ? "3" : "1"}
            value={noteBody.content}
        />
        <Zoom in={isExpanded}>
            <Fab 
                className="button"
                onClick={(event) => {
                    props.onClick(noteBody);
                    setNoteBody({title: "", content: ""});
                    event.preventDefault();
                }}>
                <span className="material-icons">add</span>
            </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
