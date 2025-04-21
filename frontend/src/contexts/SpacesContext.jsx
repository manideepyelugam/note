import { createContext, useState } from "react";
import axios from "axios";

export const SpacesContext = createContext();

export const SpacesProvider = ({ children }) => {
  const [spaces, setSpaces] = useState([]);
  const [currentSpaceId, setCurrentSpaceId] = useState(null);
  const [loadingSpaces, setLoadingSpaces] = useState(false);
  const [chats, setChats] = useState([]);
const [spacePopup, setSpacePopup] = useState(false);


  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");

  const authHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Create a space and redirect
  const createSpace = async (name) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/spaces/`,
        { name },authHeaders
      );

      const newSpace = res.data;
      setSpaces((prev) => [...prev, newSpace]);
      setCurrentSpaceId(newSpace._id);

      return newSpace;
    } catch (err) {
      console.error("Error creating space:", err);
      return null;
    }
  };


  const renameSpace = async (spaceId, newName) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/spaces/${spaceId}/rename`,
        { newName },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedSpace = res.data.space;
      setSpaces((prev) =>
        prev.map((space) => (space._id === spaceId ? updatedSpace : space))
      );
    } catch (err) {
      console.error("Error renaming space:", err);
    }
  };

  const deleteSpace = async (spaceId) => {
    try {
      await axios.delete(`${BASE_URL}/spaces/${spaceId}`, authHeaders);
      setSpaces((prev) => prev.filter((space) => space._id !== spaceId));
      if (currentSpaceId === spaceId) {
        setCurrentSpaceId(null);
      }
    } catch (err) {
      console.error("Error deleting space:", err);
    }
  };



  const fetchSpaces = async () => {
    setLoadingSpaces(true);
    try {
      const res = await axios.get(`${BASE_URL}/spaces/allspaces`,  {headers: {
        Authorization: `Bearer ${token}`,
      }});
      setSpaces(res.data);
      
    } catch (err) {
      console.error("Error fetching spaces:", err);
    } finally {
      setLoadingSpaces(false);
    }
  };



  // Inside SpacesContext.js

const sendChatToSpace = async (spaceId, message, sender) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/spaces/${spaceId}/chat`,
      { message, sender },
      authHeaders
    );
    setChats(res.data.chats); // Update local chat state
  } catch (err) {
    console.error("Error sending chat:", err);
  }
};

const loadChatsForSpace = async (spaceId) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/spaces/${spaceId}/chat`,
      {}, // no message or sender – just fetch
      authHeaders
    );
    setChats(res.data.chats);
  } catch (err) {
    console.error("Error loading chats:", err);
  }
};




  return (
    <SpacesContext.Provider
      value={{
        spaces,
        currentSpaceId,
        setCurrentSpaceId,
        createSpace,
        renameSpace,
        deleteSpace,
        loadingSpaces,
        chats,
        setChats,fetchSpaces,
        sendChatToSpace,    // NEW
        loadChatsForSpace,  
        spacePopup, setSpacePopup
      }}
    >
      {children}
    </SpacesContext.Provider>
  );
};
