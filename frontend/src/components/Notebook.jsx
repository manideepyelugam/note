import { useNavigate } from "react-router-dom";
import { NoteContext } from "../contexts/NoteContext";
import { SpacesContext } from "../contexts/SpacesContext";
import { useContext, useState } from "react";
import { MdDelete } from "react-icons/md";

const Notebook = ({ img, name, id, onClick }) => {
  const { setOpenNotebookId, setMode,deleteNotebook } = useContext(NoteContext);
  const { setCurrentSpaceId } = useContext(SpacesContext);
  const [deletee, setDeletee] = useState(true);

  const navigate = useNavigate();

  const handleDelete = (id) => {
        deleteNotebook(id);
  }


  return (
    <div
      onClick={() => {
        setMode("notebook");
        setOpenNotebookId(id);
        setCurrentSpaceId(null); // close space if open
        navigate(`/notebooks/${id}`);
      }}
      className="py-1.5 px-2 w-[96%] text-[#b4b4b4] flex items-center justify-between hover:bg-[#2d2d2d] rounded-md text-[14px] cursor-pointer group"
    >
      <div className="flex items-center justify-between w-full">
        <span>{name}</span>

        <MdDelete
          className={`${
            deletee ? "hidden group-hover:inline" : "hidden"
          } text-red-500 cursor-pointer`}

          onClick={(e) => {
            e.stopPropagation(); // prevent triggering the notebook click
            // You can call delete logic here
            handleDelete(id);
          }}
        />
      </div>
    </div>
  );
};

export default Notebook;
