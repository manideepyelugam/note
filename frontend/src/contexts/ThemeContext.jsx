import { createContext, useContext, useState } from 'react';

export const Context = createContext();

export default function ThemeProvider({ children }) {
  const [sidebar, setSidebar] = useState(true);
  const [canvas, _setCanvas] = useState(false);
  const [desmos, _setDesmos] = useState(false);
  const [graphExpr, setGraphExpr] = useState(""); 
  const [flashcards, setFlashcards] = useState([]);
  const [showFlashcards, setShowFlashcards] = useState(false);

  // Custom setters that toggle and ensure exclusivity
  const setCanvas = (value) => {
    _setCanvas(value);
    if (value) _setDesmos(false); // turn off desmos when canvas opens
  };

  const setDesmos = (value) => {
    _setDesmos(value);
    if (value) _setCanvas(false); // turn off canvas when desmos opens
  };

  const value = {
    sidebar,
    setSidebar,
    canvas,
    setCanvas,
    desmos,
    setDesmos,graphExpr,
    setGraphExpr,showFlashcards,
    setShowFlashcards,flashcards,setFlashcards
  };

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
}
