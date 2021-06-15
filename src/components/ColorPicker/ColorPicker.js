import React, { useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import "./ColorPicker.css";

const ColorPicker = (props) => {
  const {
    setNoteBgColor,
    colorPickerDialog,
    choosenColor,
    setColorPickerDialog,
  } = props;

  return (
    <>
      {colorPickerDialog ? (
        <div className="popover">
          <div
            className="cover"
            onClick={() => {
              setColorPickerDialog((prevState) => !prevState);
            }}
          />
          <SketchPicker
            color={choosenColor}
            onChangeComplete={(color) => {
              setNoteBgColor(color.hex);
            }}
          />
        </div>
      ) : null}
    </>
  );
};

export default ColorPicker;
