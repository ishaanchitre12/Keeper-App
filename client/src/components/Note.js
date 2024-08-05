import React, {useState} from "react";

function Note(props) {
    const {id, title, content} = props;
    return (
        <div className="note">
            <h1>{title}</h1>
            <p>{content}</p>
            <button onClick={() => props.onDelete(id)}>
                <span className="material-icons">delete</span>
            </button>
            <button onClick={() => props.onEdit({id: id, title: title, content: content})}>
                <span className="material-icons">edit</span>
            </button> 
        </div>
    );
}

export default Note;
