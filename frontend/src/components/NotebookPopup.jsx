import React from 'react'
import { IoMdClose } from "react-icons/io";
import { useContext,useState } from 'react';
import { NoteContext } from '../contexts/NoteContext'
import { useNavigate } from 'react-router-dom';

const NotebookPopup = () => {
  const { notebookPopup,setCurrentNotebookId, setNotebookPopup, createNotebook } = useContext(NoteContext);
const [newNotebookName, setNewNotebookName] = useState("");
const navigate = useNavigate();

const handleCreateNotebook = async () => {
  if(!newNotebookName.trim()) return;

  const title = newNotebookName.trim();

  const createdNotebook = await createNotebook({title,content: "", summary: ""});
  setNewNotebookName("");
  if (createdNotebook?._id) {
    setCurrentNotebookId(createdNotebook._id);
    setNotebookPopup(false);
    navigate(`/notebooks/${createdNotebook._id}`); 

  }
  
};

  return (
 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
        <div className="bg-[#1e1e1e] p-6  rounded-lg w-[90%] max-w-md text-white">
          <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold mb-4">Create a New Notebook</h2>
          <IoMdClose onClick={() => setNotebookPopup(false)} className="text-2xl cursor-pointer mb-4"/>

          </div>
          <input
            type="text"
            placeholder="Enter Notebook Name"
            value={newNotebookName}
            onChange={(e) => setNewNotebookName(e.target.value)}
            className="w-full px-4 py-2 bg-[#2c2c2c] text-white rounded mb-4 outline-none"
          />
          <div className="flex justify-end">
            <button
              onClick={handleCreateNotebook}
              className="bg-[#06d6a0] text-black px-4 py-2 rounded hover:bg-[#04b58a]"
            >
              Create
            </button>
          </div>
        </div>
      </div>  )
}

export default NotebookPopup