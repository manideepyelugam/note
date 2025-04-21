import React, { useState, useRef, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { Context } from "../contexts/ThemeContext";
import { GeminiContext } from "../contexts/GeminiContext";
import parseFlashcards from "../utility/parseFlashcards"
import FlashcardViewer from "./FlashcardViewer";
import { SpacesContext } from "../contexts/SpacesContext";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { NoteContext } from "../contexts/NoteContext";
import SummaryMenu from "./SummaryMenu";
import NotebookPopup from "./NotebookPopup";
import SpacePopup from "./SpacePopup";




const Response = () => {
  const { sendMessage,sendImageToGemini } = useContext(GeminiContext);
   const [input, setInput] = useState("");
  const chatEndRef = useRef(null);
  const { canvas,setDesmos,setGraphExpr,setCanvas,setShowFlashcards,showFlashcards,setFlashcards,flashcards } = useContext(Context);
  const navigate = useNavigate(); 

  const {notebookPopup, setNotebookPopup,createNotebook,currentNotebookId, setCurrentNotebookId} = useContext(NoteContext);


  const { createSpace, setCurrentSpaceId,currentSpaceId,sendChatToSpace, chats, loadChatsForSpace,spacePopup, setSpacePopup } = useContext(SpacesContext);

const [newSpaceName, setNewSpaceName] = useState("");
const [newNotebookName, setNewNotebookName] = useState("");





  useEffect(() => {
    if (!currentSpaceId) {
      setSpacePopup(true);
    }
  }, [currentSpaceId]);



 
const handleCreateSpace = async () => {
  if (!newSpaceName.trim()) return;

  const createdSpace = await createSpace(newSpaceName.trim());
  setNewSpaceName("");
  if (createdSpace?._id) {
    setCurrentSpaceId(createdSpace._id);
    setSpacePopup(false);
    navigate(`/spaces/${createdSpace._id}`); 

  }
};


  

  const handleSend = async() => {
    const trimmedInput = input.trim();

    if (!currentSpaceId) {
      setSpacePopup(true);
      return;
    }

    if (trimmedInput.startsWith("@flashcard")) {
      const topic = trimmedInput.replace("@flashcard", "").trim();
      if (!topic) return;
  
      const flashcardPrompt = `Generate 5 flashcards for the topic "${topic}". Format as:
  Q: [question]
  A: [answer]`;
  
      const result = await sendMessage(flashcardPrompt, true); // 'true' to mark it as flashcard type
      setFlashcards(parseFlashcards(result));
      setShowFlashcards(true);
      setInput("");
      return;
    }
  
    // If message starts with @graph
    if (trimmedInput.startsWith("@graph")) {
      const match = trimmedInput.match(/^@graph\s*(.*)/i);
      const expression = match[1]?.trim() || "y=x^2";
      setGraphExpr(expression);
      setDesmos(true); // open Desmos
      setCanvas(false); // close canvas if open
      setInput("");
      return;
    }
  
    // If message starts with @canvas
    if (trimmedInput.startsWith("@canvas")) {
      setCanvas(true); // open canvas
      setDesmos(false); // close desmos if open
      setInput("");
      return;
    }
  
    // Default: send to Bard API
    await sendChatToSpace(currentSpaceId, input, "user");
    setInput("");


  const aiResponse = await sendMessage(input); // Your Gemini/Bard API

  // console.log("AI Response:", aiResponse,input);
  await sendChatToSpace(currentSpaceId, aiResponse, "ai");

 
  
  };
  
  useEffect(() => {
    if (currentSpaceId) {
      loadChatsForSpace(currentSpaceId);
    }
  }, [currentSpaceId]);
  

  // Auto-scroll to the latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);



  return (

    
    <div className={`h-[100%] flex flex-col text-white p-4 rounded-lg ${canvas ? "w-full" : "w-[80%]"}`}>
      {/* Chat Box */}
      <div className="flex-1 w-full p-2 space-y-3 flex flex-col overflow-y-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
  {chats.map((msg, index) => (
    <div
      key={index}
      dangerouslySetInnerHTML={{ __html: msg.message }}
      className={`p-3 rounded-lg max-w-[500px] break-words whitespace-pre-wrap ${
        msg.sender === "user"
          ? "bg-blue-600 text-white self-end"
          : "bg-gray-700 text-white self-start"
      }`}
    />
  ))}
  <div ref={chatEndRef} /> {/* Keeps chat auto-scrolled */}
</div>


      {showFlashcards && (
  <FlashcardViewer flashcards={flashcards} onClose={() => setShowFlashcards(false)} />
)}

{spacePopup && (
     <SpacePopup/>
    )}



{notebookPopup && (
     <NotebookPopup/>)}

<SummaryMenu spaceId={currentSpaceId} />


<div className="h-[15%] flex flex-col items-start justify-center">
  <div className="w-full flex items-center">
    <textarea
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && handleSend()}
      placeholder="Ask anything..."
      className="w-[1000px] py-4 bg-[#303030] outline-none px-5 rounded-xl text-[#e6e5e5] text-[16px] pr-20"
    />
    <button onClick={handleSend}>
      <FontAwesomeIcon
        icon={faPaperPlane}
        className="bg-[#06d6a0] text-black relative right-12 text-xl p-2.5 hover:border hover:border-[#06d6a0] hover:text-[#06d6a0] hover:bg-transparent rounded-md"
      />
    </button>
  </div>

  {/* Quick Command Buttons */}
  <div className="flex gap-2 mt-4 flex-wrap">
    {["@graph", "@canvas", "@flashcard"].map((cmd) => (
      <button
        key={cmd}
        onClick={() => setInput(cmd + " ")}
        className="bg-[#2c2c2c] hover:bg-[#3a3a3a] text-white px-4 py-2 rounded-full text-sm shadow-md transition"
      >
        {cmd}
      </button>
    ))}

  </div>
</div>

    </div>
  );
};

export default Response;
