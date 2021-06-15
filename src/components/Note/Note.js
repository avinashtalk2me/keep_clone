import React from "react";
import "./Note.css";
import { connect } from "react-redux";
import { deleteNote, getSelectedNote } from "../../redux/actions/actions";
import { NoteFooter } from "../../components";

const Note = (props) => {
  const { note, bgColor, deleteNote, getSelectedNote } = props;
  const { title, content, author, updatedon, id } = note;

  const handleNoteDelete = (event) => {
    event.stopPropagation();
    deleteNote(id);
  };

  const handleSelectedNote = () => {
    getSelectedNote(note);
  };

  return (
    <div
      className="noteContainer"
      style={{ backgroundColor: bgColor }}
      onClick={handleSelectedNote}
    >
      <div className="noteContent">
        <div className="divheaderTitle">
          {title !== "" ? <h4 className="noteTitle">{title}</h4> : null}
          <button
            className="deleteButton fa fa-close"
            onClick={handleNoteDelete}
          ></button>
        </div>
        <p className="noteBody">{content}</p>
      </div>
      <NoteFooter author={author} updatedon={updatedon} />
    </div>
  );
};

const matchDispatchToProps = (dispatch) => {
  return {
    deleteNote: (id) => dispatch(deleteNote(id)),
    getSelectedNote: (note) => dispatch(getSelectedNote(note)),
  };
};
export default connect(null, matchDispatchToProps)(Note);
