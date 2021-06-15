import React from "react";
import "./NoteFooter.css";

import moment from "moment";

const NoteFooter = (props) => {
  const { author, updatedon } = props;

  return (
    <div className="noteFooter">
      <div>
        <h5>Author: </h5> <span className="spanFooter">{author}</span>
      </div>
      <div>
        <h5>Modified On: </h5>{" "}
        <span className="spanFooter">
          {moment(updatedon).format("DD/MM/YYYY, h:mm a")}
        </span>
      </div>
    </div>
  );
};

export default NoteFooter;
