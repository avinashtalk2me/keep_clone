import React from "react";
import { connect } from "react-redux";
import "./NoteList.css";
import { Note } from "..";

const NotesList = (props) => {
  const { notes, bgColor } = props;
  return (
    <div className="noteMobileContainer">
      {Object.values(notes).map((note, index) => (
        <Note key={note.id} note={note} bgColor={bgColor} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    notes: state.notes.notes,
    bgColor: state.notes.defaultBgColor,
  };
};
export default connect(mapStateToProps)(NotesList);
