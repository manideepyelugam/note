import React, { useContext, useEffect, useRef, useState } from 'react';
import notes from '../assets/wirte.png';
import spaces from '../assets/message.png';
import { SpacesContext } from '../contexts/SpacesContext';
import { useNavigate } from 'react-router-dom';
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { NoteContext } from '../contexts/NoteContext';

const Folders = ({ img, name, id }) => {
  const navigate = useNavigate();
  const { setCurrentSpaceId, renameSpace, deleteSpace } = useContext(SpacesContext);
  const { setOpenNotebookId, setMode } = useContext(NoteContext);

  const [showDropdown, setShowDropdown] = useState(false);
  const [showRenamePopup, setShowRenamePopup] = useState(false);
  const [newName, setNewName] = useState(name);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRename = () => {
    setShowDropdown(false);
    setShowRenamePopup(true);
  };

  const handleDelete = () => {
    setShowDropdown(false);
    deleteSpace(id);
  };

  const submitRename = () => {
    renameSpace(id, newName);
    setShowRenamePopup(false);
    setNewName('')
  };

  return (
    <div className="relative w-[96%]">
      {/* Folder row */}
      <div
        onClick={() => {
          setMode('space');
          setCurrentSpaceId(id);
          setOpenNotebookId(null); // close notebook if open
          navigate(`/spaces/${id}`);
        }}
        className="py-1.5 px-2 text-[#b4b4b4] flex items-center hover:bg-[#2d2d2d] justify-between rounded-md text-[14px] cursor-pointer"
      >
        <div className="flex items-center">
          <img src={img === 'notes' ? notes : spaces} className="h-5 opacity-65 mr-2" alt="" />
          {name}
        </div>

        {/* Dots icon */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            setShowDropdown((prev) => !prev);
          }}
          className="relative"
        >
          <BsThreeDotsVertical className="text-[18px]" />
        </div>
      </div>

      {/* Dropdown floating outside flow */}
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute right-2 top-10 z-50 w-32 bg-[#1e1e1e] border border-gray-700 rounded shadow"
        >
          <div onClick={handleRename} className="px-4 py-2 hover:bg-[#2d2d2d] cursor-pointer">
            Rename
          </div>
          <div onClick={handleDelete} className="px-4 py-2 hover:bg-[#2d2d2d] cursor-pointer">
            Delete
          </div>
        </div>
      )}

      {/* Rename Popup */}
      {showRenamePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-[#1e1e1e] p-6 rounded-lg shadow-lg w-[300px]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white text-lg font-medium">Rename Space</h2>
              <button onClick={() => setShowRenamePopup(false)}>
                <IoClose className="text-white text-xl" />
              </button>
            </div>
            <input
              type="text"
              className="w-full px-3 py-2 rounded bg-[#2d2d2d] text-white outline-none"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <button
              onClick={submitRename}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
            >
              Rename
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Folders;
