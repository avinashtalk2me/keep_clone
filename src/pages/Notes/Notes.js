import React from "react";
import "./Notes.css";
import { NoteForm, NoteList } from "../../components";
import { Modal } from "../../sections";

const Notes = () => {
  return (
    <section className="notecontainer">
      <NoteForm />
      <NoteList />
      <Modal />
    </section>
  );
};

export default Notes;
