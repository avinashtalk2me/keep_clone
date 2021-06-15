import uuid from "uuid";

const util = {
  checkClickedElementIsForm: (target) => {
    if (!target) return false;
    const className = target.className;
    if (className && className.includes && className.includes("inputForm")) {
      return true;
    }
    return util.checkClickedElementIsForm(target.parentElement);
  },

  getListBasedOnLineTextBreak: (text) => {
    return text.split(/\r?\n/).reduce((newCheckList, noteItem) => {
      const uid = uuid();
      return noteItem.trim() === ""
        ? { ...newCheckList }
        : {
            ...newCheckList,
            [uid]: {
              listItem: noteItem.trim(),
              uid,
            },
          };
    }, {});
  },
  getSingleNoteBasedOnList: (list) => {
    return Object.values(list)
      .map((listItem) => listItem.listItem.trim())
      .join("\r\n");
  },
  createEmptyListItem: () => {
    const uid = uuid();
    return {
      [uid]: {
        listItem: "",
        uid,
      },
    };
  },
};

export { util };
