const createMatrix = (finalMessage) => {
  const matrix = new Array(+finalMessage).fill(
    new Array(+finalMessage).fill("")
  );
  return matrix;
};

export default createMatrix;
