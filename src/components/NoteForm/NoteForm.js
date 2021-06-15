import React, { useState, useEffect, useRef } from "react";
import "./NoteForm.css";
import { connect } from "react-redux";
import { util } from "../../util/util";
import { withRouter } from "react-router-dom";
import uuid from "uuid";
import {
  addNote,
  clearNoteForm,
  deleteNote,
  updateNote,
} from "../../redux/actions/actions";
import { NoteCheckList } from "../../components";

const NoteForm = (props) => {
  const {
    editMode = false,
    defaultBgColor,
    userName,
    addNote,
    clearNoteForm,
    editableNote,
    deleteNote,
    updateNote,
  } = props;

  const [isInputOpen, setInputOpen] = useState(editMode);
  const [title, setTitle] = useState(
    editableNote.title ? editableNote.title : ""
  );
  const [note, setNote] = useState(
    editableNote.content ? editableNote.content : ""
  );

  const [checkListMode, setCheckListMode] = useState(editMode ? true : false);
  const [checkListItems, setCheckListItems] = useState({});

  const textAreaRef = useRef();

  const [noteBgColor, setNoteBgColor] = useState(
    defaultBgColor ? defaultBgColor : "#fff"
  );

  const resetNotes = () => {
    setTitle("");
    setNote("");
    setInputOpen(false);
    if (editMode) {
      clearNoteForm();
    } else {
      textAreaRef.current.style.height = "42px";
    }
  };

  useEffect(() => {
    if (!userName) {
      props.history.push("/");
    }
  });

  useEffect(() => {
    if (checkListMode && editMode) {
      setCheckListItems(
        note
          ? util.getListBasedOnLineTextBreak(note)
          : util.createEmptyListItem()
      );
    }
  }, []);

  // useEffect(() => {
  //   if (Object.keys(checkListItems).length === 0 && editableNote.title === "") {
  //     deleteNote(editableNote.id);
  //     resetNotes();
  //   }
  // }, [checkListItems]);

  const autoGrow = (elem) => {
    elem.current.style.height = "5px";
    elem.current.style.height = elem.current.scrollHeight + "px";
  };
  const handleDocumentClick = (e) => {
    const targetIsForm = util.checkClickedElementIsForm(e.target);

    if (targetIsForm) {
      return;
    }

    if (!targetIsForm && (note + title).trim() !== "") {
      if (editMode) {
        let content = util.getSingleNoteBasedOnList(checkListItems);
        if (!title && !content) {
          deleteNote(editableNote.id);
        } else {
          const noteToUpdate = {
            title: editableNote.title,
            content: content,
            author: editableNote.userName,
            updatedon: new Date().getTime(),
            id: editableNote.id,
          };
          updateNote(noteToUpdate);
        }
      } else {
        const newUuid = uuid();
        const newNote = {
          title: title,
          content: note,
          author: userName,
          updatedon: new Date().getTime(),
          id: newUuid,
        };
        addNote(newNote);
      }
    }
    resetNotes();
  };

  useEffect(() => {
    document.body.addEventListener("mousedown", handleDocumentClick);

    return () => {
      document.body.removeEventListener("mousedown", handleDocumentClick);
    };
  }, [editMode, handleDocumentClick, isInputOpen]);

  const handleDeleteCheckList = (event) => {
    let originalListItems = {
      ...checkListItems,
    };
    delete originalListItems[event.target.name];
    if (Object.keys(originalListItems).length === 0) {
      originalListItems = util.createEmptyListItem();
    }
    setCheckListItems(originalListItems);
  };

  return (
    <div
      className={`formContainer inputForm`}
      style={{ backgroundColor: noteBgColor }}
    >
      {isInputOpen && !editMode && (
        <div className="formGroup">
          <input
            className="formInput"
            name="title"
            maxLength="40"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
        </div>
      )}
      <div className="formGroup">
        {checkListMode ? (
          <NoteCheckList
            checkListItems={checkListItems}
            setCheckListItems={setCheckListItems}
            deleteListItem={handleDeleteCheckList}
          />
        ) : (
          <textarea
            className="formTextArea"
            name="note"
            onInput={() => autoGrow(textAreaRef)}
            ref={textAreaRef}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            onClick={() => setInputOpen(true)}
            placeholder="Enter your note..."
          />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    defaultBgColor: state.notes.defaultBgColor,
    userName: state.notes.userName,
    editableNote: { ...state.notes.editableNote },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNote: (note) => dispatch(addNote(note)),
    clearNoteForm: () => dispatch(clearNoteForm()),
    deleteNote: (id) => dispatch(deleteNote(id)),
    updateNote: (note) => dispatch(updateNote(note)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NoteForm)
);
