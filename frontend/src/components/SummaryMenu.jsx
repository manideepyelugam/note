import React, { useState,useContext, useEffect } from 'react';
import axios from 'axios';
import { SpacesContext } from '../contexts/SpacesContext';
import { NoteContext } from '../contexts/NoteContext';
import { useNavigate } from 'react-router-dom';

const SummaryMenu = ({ spaceId }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showNotebookList, setShowNotebookList] = useState(false);
  const [showNewNotebookPopup, setShowNewNotebookPopup] = useState(false);
  const [newNotebookName, setNewNotebookName] = useState('');
  const {fetchNotebooks,notebooks} = useContext(NoteContext);

  const { setOpenNotebookId, setMode } = useContext(NoteContext);


  const toggleOptions = () => setShowOptions(prev => !prev);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const handleFetchNotebooks = async () => {
    try {
        fetchNotebooks();
        setShowNotebookList(true);
        setShowOptions(false);
    } catch (err) {
      console.error("Failed to fetch notebooks:", err);
    }
  };
  const handleSelectNotebook = async (notebookId) => {
    try {
      const token = localStorage.getItem("token");
  
      // Step 1: Get the summary from Gemini API
      const { data } = await axios.post(
        `${BASE_URL}/gemini/summary/${spaceId}`,
        {}, // no body
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      const summary = data.summary;
  
      // Step 2: Send summary to update the notebook
      await axios.put(
        `${BASE_URL}/notebooks/${notebookId}`,
        { summary,appendSummary: true  },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      setOpenNotebookId(notebookId);
      setMode('notebook');
      
     setShowNotebookList(false);
    } catch (err) {
      console.error(err);
      alert("Failed to upload summary.");
    }
  };
  

  const handleCreateNotebookAndUpload = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${BASE_URL}/notebooks/`, {
        title: newNotebookName,
        content: "" // empty initially
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      

      const notebookId = res.data._id;

      const { data } = await axios.post(
        `${BASE_URL}/gemini/summary/${spaceId}`, // no body
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      const summary = data.summary;

      // Upload summary to new notebook
      await axios.put(`${BASE_URL}/notebooks/${notebookId}`,    
          { summary },
          {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Notebook created and summary uploaded!");

      setShowNewNotebookPopup(false);
      setOpenNotebookId(notebookId);
      setMode('notebook');
    } catch (err) {
      console.error(err);
      alert("Error creating notebook or uploading summary.");
    }
  };

  return (
    <div className="relative text-black">
      <button onClick={toggleOptions} className="bg-blue-600 text-white px-3 py-1 rounded">
        Summary
      </button>

      {showOptions && (
        <div className="absolute bg-white shadow-lg border rounded p-2 mt-2">
          <button onClick={handleFetchNotebooks} className="block w-full text-left p-2 hover:bg-gray-100">
            Upload to Existing Notebook
          </button>
          <button onClick={() => { setShowNewNotebookPopup(true); setShowOptions(false); }} className="block w-full text-left p-2 hover:bg-gray-100">
            Create New Notebook
          </button>
        </div>
      )}

      {showNotebookList && (
        <div className="absolute z-10 bg-white border p-2 mt-2 w-64 max-h-64 overflow-y-auto rounded shadow-md">
          {notebooks.map((notebook) => (
            <div key={notebook._id} className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleSelectNotebook(notebook._id)}>
              {notebook.title}
            </div>
          ))}
          <button onClick={() => setShowNotebookList(false)} className="text-red-500 mt-2">Cancel</button>
        </div>
      )}

      {showNewNotebookPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-lg font-bold mb-4">New Notebook Name</h2>
            <input
              type="text"
              value={newNotebookName}
              onChange={(e) => setNewNotebookName(e.target.value)}
              className="border p-2 w-full mb-4"
              placeholder="Enter notebook name"
            />
            <div className="flex justify-end gap-2">
              <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => setShowNewNotebookPopup(false)}>Cancel</button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleCreateNotebookAndUpload}>Create & Upload</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SummaryMenu;
