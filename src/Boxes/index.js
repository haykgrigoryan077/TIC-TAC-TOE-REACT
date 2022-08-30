import { useEffect, useState } from "react";
import "./style.css";

let flag = true;
const CreateOneBox = (props) => {
  const winingConditions = (matrix, turn, finalMessage, count) => {
    let verticalCheckArray = [];
    let diagonalCheckArray = [];

    // check for horizontal lines
    for (let index = 0; index < matrix.length; index++) {
      if (matrix[index].every((val, i, arr) => val === turn) && turn !== "") {
        return {
          horizontal: index,
        }; // returns the index of won line
      }
    }

    // checks for vertical lines
    for (let index = 0; index < matrix.length; index++) {
      verticalCheckArray = [];
      for (let j = 0; j < matrix.length; j++) {
        verticalCheckArray.push(matrix[j][index]);
      }
      if (
        verticalCheckArray.every((val, i, arr) => val === turn) &&
        turn !== ""
      ) {
        alert(`won ${turn} with ${index} vertical`);
        return {
          vertical: index,
        };
      }
    }

    //check for diagonals
    for (let index = 0; index < matrix.length; index++) {
      for (let j = 0; j < matrix.length; j++) {
        if (index === j) {
          diagonalCheckArray.push(matrix[index][j]);
        }
      }
    }
    if (
      diagonalCheckArray.every((val, i, arr) => val === turn) &&
      turn !== ""
    ) {
      return "wonFirstDiagonal";
    }

    // check for second diagonal
    let secondDiagonalCheckArray = [];
    for (let index = 0; index < matrix.length; index++) {
      for (let j = matrix.length; j > -1; j--) {
        if (+finalMessage - 1 === index + j) {
          secondDiagonalCheckArray.push(matrix[index][j]);
        }
      }
    }
    if (
      secondDiagonalCheckArray.every((val, i, arr) => val === turn) &&
      turn !== ""
    ) {
      return "wonSecondDiagonal";
    }
    if (count === finalMessage ** 2) {
      return 'draw'
    }
  };

  const [turn, setTurn] = useState("");
  let newCount = 0;

  const changeTurn = (state, xCoord, yCoord) => {
    if (state[xCoord][yCoord]) {
      alert("lav ches ara");
      props.setCount(props.count)
      return turn;
    } else {
      if (flag) {
        setTurn("x");
        flag = !flag;
        return "x";
      } else {
        setTurn("o");
        flag = !flag;
        return "o";
      }
    }
  };

  const doOnBoxClick = () => {
    
    props.setCount(props.count+1);
    const newState = JSON.parse(JSON.stringify(props.gameState));
    const xCoord = Math.floor(+props.index / +props.finalMessage);
    const yCoord = Math.floor(
      +props.index -
        +props.finalMessage * Math.floor(+props.index / +props.finalMessage)
    );
    const currentTurn = changeTurn(newState, xCoord, yCoord);
    newState[xCoord][yCoord] = currentTurn;
    props.setGameState(newState);
    console.log(winingConditions(newState, currentTurn, +props.finalMessage, props.count));
    // setCount(3);
  };
  return (
    <div
      onClick={() => {
        doOnBoxClick();
      }}
      className="box"
    >
      <h3>{turn}</h3>
    </div>
  );
};

const CreatePlayground = (props) => {
  const arrayForMap = new Array((+props.finalMessage) ** 2).fill("");
  const [count, setCount] = useState(1)
  return (
    <div className="container">
      <div
        className="playground"
        style={{
          width: `${props.finalMessage * 100 + props.finalMessage * 2}px`,
          height: `${props.finalMessage * 100 + props.finalMessage * 2}px`,
        }}
      >
        {arrayForMap.map((box, index) => {
          return (
            <CreateOneBox
              setCount={setCount}
              count={count}
              key={`${index} + box`}
              finalMessage={+props.finalMessage}
              index={index}
              setGameState={props.setGameState}
              gameState={props.gameState}
            />
          );
        })}
      </div>
    </div>
  )
};

export default CreatePlayground;
