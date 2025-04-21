// DesmosGraph.jsx
import { useEffect, useRef, useContext } from "react";
import { Context } from "../contexts/ThemeContext";

const DesmosGraph = () => {
  const calculatorRef = useRef(null);
  const calculatorInstance = useRef(null); // to hold the calculator instance
  const { desmos, setDesmos,graphExpr } = useContext(Context);

  
useEffect(() => {
  if (!window.Desmos || !calculatorRef.current || !desmos) return;

  const calculator = Desmos.GraphingCalculator(calculatorRef.current, {
    expressions: true,
    settingsMenu: true,
  });

  if (graphExpr) {
    calculator.setExpression({ id: "graph1", latex: graphExpr });
  }

  return () => calculator.destroy();
}, [desmos, graphExpr]);

  if (!desmos) return null;

  return (
    <div className="relative w-[600px] h-[100vh] bg-white shadow-lg">
      <button
        onClick={() => setDesmos(false)}
        className="absolute top-2 right-2 px-2 py-1 text-sm bg-red-500 text-white rounded"
      >
        Close
      </button>
      <div className="w-full h-full" ref={calculatorRef}></div>
    </div>
  );
};

export default DesmosGraph;
