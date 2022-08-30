import { useEffect, useState } from "react";
import Inputs from "./Inputs";
import CreatePlayground from "./Boxes";
import createMatrix from "./Matrix";
import "./App.css";

function App() {
  const [finalMessage, setFinalMessage] = useState("");
  const [gameState, setGameState] = useState([]);

  useEffect(() => {
    setGameState(createMatrix(finalMessage));
  }, [finalMessage]);

  return (
    <div className="App">
      {!finalMessage && <Inputs setFinalMessage={setFinalMessage} finalMessage={finalMessage} />}
      {finalMessage && <CreatePlayground
        gameState={gameState}
        startingMatrix={gameState}
        setGameState={setGameState}
        finalMessage={finalMessage}
      />}
    </div>
  );
}

export default App;
