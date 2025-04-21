const parseFlashcards = (text) => {
    const flashcards = [];
    const lines = text.split("\n");
    let question = "", answer = "";
  
    for (const line of lines) {
      if (line.startsWith("Q:")) {
        question = line.replace("Q:", "").trim();
      } else if (line.startsWith("A:")) {
        answer = line.replace("A:", "").trim();
        if (question && answer) {
          flashcards.push({ question, answer });
          question = "";
          answer = "";
        }
      }
    }
  
    return flashcards;
  };
  

export default parseFlashcards;