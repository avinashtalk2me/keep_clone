import {
  SAVE_USER_INFO_REQUEST,
  ADD_NOTE,
  DELETE_NOTE,
  EDIT_NOTE,
  CLEAR_NOTE_FORM,
  UPDATE_NOTE,
} from "../actions/constant";
import { utils } from "../actions/utils";

const initProductsState = {
  notes: [],
  userName: "",
  defaultBgColor: "",
  editableNote: {},
  isUserAuthenticated: false,
};

const notes = (state = initProductsState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SAVE_USER_INFO_REQUEST:
      return {
        ...state,
        userName: payload.userName,
        defaultBgColor: payload.defaultBgColor,
        isUserAuthenticated: true,
      };
    case ADD_NOTE:
      return {
        ...state,
        notes: utils.addNewNote(state, payload),
      };
    case DELETE_NOTE:
      return {
        ...state,
        notes: utils.deleteNote(state, payload),
      };
    case EDIT_NOTE:
      return {
        ...state,
        editableNote: payload,
      };
    case UPDATE_NOTE:
      return {
        ...state,
        notes: utils.updateNote(state, payload),
      };
    case CLEAR_NOTE_FORM:
      return {
        ...state,
        editableNote: {},
      };
    default:
      return state;
  }
};

export { notes };
