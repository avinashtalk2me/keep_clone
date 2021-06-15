import React, { useState, useEffect } from "react";
import "./Modal.css";
import { connect } from "react-redux";
import { NoteForm } from "../../components";
const Modal = (props) => {
  const { editableNote } = props;
  const [showModalBox, setShowModalBox] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (Object.keys(editableNote).length > 0) {
      setShowModal(true);
      setTimeout(() => setShowModalBox(true), 0);
    } else {
      setShowModalBox(false);
      setTimeout(() => setShowModal(false), 100);
    }
  }, [editableNote]);

  return (
    <div
      className="modal-main"
      style={{ visibility: showModal ? "visible" : "hidden" }}
    >
      <div
        className="modal"
        style={{ transform: showModalBox ? "scale(1)" : "scale(0.4)" }}
      >
        {showModal && <NoteForm editMode={true} />}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    editableNote: state.notes.editableNote,
  };
};

export default connect(mapStateToProps)(Modal);
