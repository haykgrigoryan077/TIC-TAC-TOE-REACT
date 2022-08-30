import React from "react";
import "./style.css";
import { useState } from "react";

const Inputs = ({ setFinalMessage, finalMessage }) => {
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const [myInput, setInput] = useState([
    {
      type: "number",
      id: "message",
      label: "NxN",
    },
  ]);

  return (
    <div className="inputButton">
      {myInput.map((obj, index) => (
        <div className="numberInput" key={index + "input"}>
          <label>{obj.label}</label>
          <input
            className="input"
            type={obj.type}
            value={message}
            onChange={handleChange}
          />
          <button
            onClick={() => {
              setFinalMessage(+message);
              setInput([]);
            }}
          >
            SUBMIT
          </button>
          <h2>{finalMessage}</h2>
        </div>
      ))}
    </div>
  );
};

export default Inputs;
