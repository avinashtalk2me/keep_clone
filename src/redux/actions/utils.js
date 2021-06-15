const utils = {
  addNewNote: (state, newNote) => {
    let notes = state.notes || [];
    notes.push(newNote);
    return [...notes];
  },

  deleteNote: (state, id) => {
    let filteredNotes = state.notes.filter((item) => item.id !== id);
    return [...filteredNotes];
  },
  updateNote: (state, noteToUpdate) => {
    let updatedValues = state.notes.map((noteItem) =>
      noteItem.id === noteToUpdate.id
        ? {
            ...noteItem,
            content: noteToUpdate.content,
            updatedon: noteToUpdate.updatedon,
          }
        : noteItem
    );
    return updatedValues;
  },
};

export { utils };
