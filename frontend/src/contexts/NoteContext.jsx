import { createContext, useState } from "react";
import axios from "axios";

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [mode, setMode] = useState(null); // 'space' or 'notebook'

  const [notebooks, setNotebooks] = useState([]);
  const [openNotebookId, setOpenNotebookId] = useState(false);
  const [currentNotebookId, setCurrentNotebookId] = useState(null);
  const [notes, setNotes] = useState([]);
  const [notePopup, setNotePopup] = useState(false);
  const [loadingNotebooks, setLoadingNotebooks] = useState(false);
  const [notebookPopup, setNotebookPopup] = useState(false);
  

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");

  const authHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Create a new notebook
  const createNotebook = async ({ title, content, summary }) => {
    try {
      const res = await axios.post(`${BASE_URL}/notebooks/`, { title, content, summary }, authHeaders);
      const newNotebook = res.data;
      setNotebooks((prev) => [...prev, newNotebook]);
      setCurrentNotebookId(newNotebook._id);
      return newNotebook;
    } catch (err) {
      console.error("Error creating notebook:", err);
    }
  };

  // Rename / Update notebook
  const renameNotebook = async (notebookId, updatedFields) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/notebooks/${notebookId}`,
        updatedFields,
        authHeaders
      );
      const updatedNotebook = res.data;
      setNotebooks((prev) =>
        prev.map((nb) => (nb._id === notebookId ? updatedNotebook : nb))
      );
    } catch (err) {
      console.error("Error updating notebook:", err);
    }
  };

  // Delete notebook
  const deleteNotebook = async (notebookId) => {
    try {
      await axios.delete(`${BASE_URL}/notebooks/${notebookId}`, authHeaders);
      setNotebooks((prev) => prev.filter((nb) => nb._id !== notebookId));
      if (currentNotebookId === notebookId) {
        setCurrentNotebookId(null);
        setNotes([]);
      }
    } catch (err) {
      console.error("Error deleting notebook:", err);
    }
  };

  // Fetch all notebooks
  const fetchNotebooks = async () => {
    setLoadingNotebooks(true);
    try {
      const res = await axios.get(`${BASE_URL}/notebooks/`, authHeaders);
      setNotebooks(res.data);
    } catch (err) {
      console.error("Error fetching notebooks:", err);
    } finally {
      setLoadingNotebooks(false);
    }
  };

  // Fetch a notebook by ID (for notes or detailed view)
  const loadNotes = async (notebookId) => {
    try {
      const res = await axios.get(`${BASE_URL}/notebooks/${notebookId}`, authHeaders);
      const notebook = res.data;
      setNotes([{ title: notebook.title, content: notebook.content, summary: notebook.summary }]);
    } catch (err) {
      console.error("Error loading notebook details:", err);
    }
  };

  return (
    <NoteContext.Provider
      value={{
        notebooks,
        currentNotebookId,
        setCurrentNotebookId,
        notes,
        setNotes,
        createNotebook,
        renameNotebook,
        deleteNotebook,
        fetchNotebooks,
        loadNotes,
        notePopup,
        setNotePopup,
        loadingNotebooks,
        openNotebookId,mode,setMode,

        setOpenNotebookId,notebookPopup, setNotebookPopup
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
