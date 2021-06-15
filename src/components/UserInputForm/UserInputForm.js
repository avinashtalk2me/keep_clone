import React, { useState } from "react";
import "./UserInputForm.css";
import { saveUserInfo } from "../../redux/actions/actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { ColorPicker } from "../../components";

const UserInputForm = (props) => {
  const [name, setName] = useState("");
  const [submit, setSubmit] = useState(false);
  const [noteBgColor, setNoteBgColor] = useState("#fefefe");
  const [colorPickerDialog, setColorPickerDialog] = useState(false);

  const handleOpenPicker = () => {
    setColorPickerDialog((prevState) => !prevState);
  };

  const handleSubmit = () => {
    setSubmit((prevState) => !prevState);
    let errorFlag = false;

    if (!name || name.trim().length === 0) {
      setName("");
      errorFlag = true;
    }

    if (!errorFlag) {
      props.saveUserInfo({
        userName: name,
        defaultBgColor: noteBgColor,
      });
      props.history.push("/notes");
    }
  };
  return (
    <div className="userContainer">
      <div className="card">
        <h3>Welcome to Keep Clone</h3>
        <div className="form">
          <div className="formElem">
            <label>Enter user name:</label>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <input
                className="loginFormInput"
                type="text"
                style={{
                  border:
                    submit && name.trim().length == 0 ? "solid 1px red" : "",
                }}
                value={name}
                onChange={(ev) => setName(ev.target.value)}
              ></input>
              <p
                className="error"
                style={{
                  display: submit && name.trim().length == 0 ? "block" : "none",
                }}
              >
                Please input user name
              </p>
            </div>
          </div>
          <div className="formElem">
            <label>
              Background color
              <br /> for notes:
            </label>
            <div className="colorPicker">
              <div
                className="setColor"
                style={{ backgroundColor: noteBgColor }}
                onClick={handleOpenPicker}
              ></div>
            </div>
            <ColorPicker
              choosenColor={noteBgColor}
              colorPickerDialog={colorPickerDialog}
              setNoteBgColor={setNoteBgColor}
              setColorPickerDialog={setColorPickerDialog}
            />
          </div>
          <button className="submitButton" type="submit" onClick={handleSubmit}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveUserInfo: (userInfo) => dispatch(saveUserInfo(userInfo)),
  };
};

export default withRouter(connect(null, mapDispatchToProps)(UserInputForm));
