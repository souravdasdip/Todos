import React from "react";

function FormInput(props) {
  return (
    <div>
      <input placeholder={props.placeholder} name={props.name} />
    </div>
  );
}

export default FormInput;
