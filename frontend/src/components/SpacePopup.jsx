import React from 'react'
import { useContext, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { SpacesContext } from '../contexts/SpacesContext';
import { useNavigate } from 'react-router-dom';


const SpacePopup = () => {
    const { createSpace, setCurrentSpaceId, spacePopup, setSpacePopup } = useContext(SpacesContext);
    const [newSpaceName, setNewSpaceName] = useState("");
    const navigate = useNavigate();
    
    // Function to handle space creation



 
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

  
  return (
 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
        <div className="bg-[#1e1e1e] p-6  rounded-lg w-[90%] max-w-md text-white">
          <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold mb-4">Create a New Space</h2>
          <IoMdClose onClick={() => setSpacePopup(false)} className="text-2xl cursor-pointer mb-4"/>

          </div>
          <input
            type="text"
            placeholder="Enter space name"
            value={newSpaceName}
            onChange={(e) => setNewSpaceName(e.target.value)}
            className="w-full px-4 py-2 bg-[#2c2c2c] text-white rounded mb-4 outline-none"
          />
          <div className="flex justify-end">
            <button
              onClick={handleCreateSpace}
              className="bg-[#06d6a0] text-black px-4 py-2 rounded hover:bg-[#04b58a]"
            >
              Create
            </button>
          </div>
        </div>
      </div>  )
}

export default SpacePopup