import {
  SAVE_USER_INFO_REQUEST,
  ADD_NOTE,
  DELETE_NOTE,
  EDIT_NOTE,
  CLEAR_NOTE_FORM,
  UPDATE_NOTE,
} from "./constant";

const saveUserInfoRequest = (userInfo) => {
  return {
    type: SAVE_USER_INFO_REQUEST,
    payload: userInfo,
  };
};

const addNoteRequest = (userInfo) => {
  return {
    type: ADD_NOTE,
    payload: userInfo,
  };
};

const deleteNoteRequest = (id) => {
  return {
    type: DELETE_NOTE,
    payload: id,
  };
};

const getSelectedNoteRequest = (note) => {
  return {
    type: EDIT_NOTE,
    payload: note,
  };
};

const clearNoteFormRequest = () => {
  return {
    type: CLEAR_NOTE_FORM,
  };
};

const updateNoteRequest = (note) => {
  return {
    type: UPDATE_NOTE,
    payload: note,
  };
};

export const saveUserInfo = (userInfo) => (dispatch) => {
  dispatch(saveUserInfoRequest(userInfo));
};

export const addNote = (note) => (dispatch) => {
  dispatch(addNoteRequest(note));
};

export const deleteNote = (id) => (dispatch) => {
  dispatch(deleteNoteRequest(id));
};

export const getSelectedNote = (note) => (dispatch) => {
  dispatch(getSelectedNoteRequest(note));
};

export const clearNoteForm = () => (dispatch) => {
  dispatch(clearNoteFormRequest());
};

export const updateNote = (note) => (dispatch) => {
  dispatch(updateNoteRequest(note));
};
