import React from "react";
import "./NoteCheckList.css";
import uuid from "uuid";
import { util } from "../../util/util";

const NoteCheckList = (props) => {
  const { checkListItems, setCheckListItems, deleteListItem } = props;

  const handleChange = (e, item) => {
    if (e.target.value === "") {
      let originalListItems = {
        ...checkListItems,
      };
      delete originalListItems[item.uid];
      if (Object.keys(originalListItems).length === 0) {
        originalListItems = util.createEmptyListItem();
      }
      setCheckListItems(originalListItems);
      return;
    }
    setCheckListItems({
      ...checkListItems,
      [item.uid]: {
        ...checkListItems[item.uid],
        listItem: e.target.value,
      },
    });
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      let emptyCheckList = 0;
      const checkEmptyCheckList = () => {
        emptyCheckList = Object.values(checkListItems).filter(
          (item) => !item.listItem
        ).length;
      };
      checkEmptyCheckList();
      if (emptyCheckList === 0) {
        const uid = uuid();
        const newCheckList = {
          ...checkListItems,
          [uid]: {
            listItem: "",
            uid,
          },
        };
        setCheckListItems(newCheckList);
      }
    }
  };

  return (
    <ul className="noteListContainer">
      {Object.values(checkListItems).map((item, i, arr) => (
        <li className="noteItemContainer" key={item.uid}>
          <span className="noteCheckItem">
            <input type="checkbox" />
            <input
              className="checkListItemInput"
              autoFocus={i === arr.length - 1}
              value={checkListItems[item.uid].listItem}
              onChange={(e) => handleChange(e, item)}
              onKeyUp={handleKeyUp}
              placeholder="Add new checklist"
            />
          </span>
          <button
            name={item.uid}
            className={`deleteListItem fa fa-trash-o`}
            onClick={deleteListItem}
          />
        </li>
      ))}
    </ul>
  );
};

export default NoteCheckList;
