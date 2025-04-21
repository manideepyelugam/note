import React, { useContext, useState, useEffect, useRef } from 'react';
import spaces from '../assets/message.png';
import notes from '../assets/wirte.png';
import Folders from './Folders';
import down_arrow from '../assets/down-arrow.png';
import closee from '../assets/close.png';
import open from '../assets/share.png';
import { Context } from '../contexts/ThemeContext';
import { useNavigate, Link } from 'react-router-dom';
import { IoMdAdd } from "react-icons/io";
import { SpacesContext } from '../contexts/SpacesContext';
import { NoteContext } from '../contexts/NoteContext';
import Notebook from './Notebook';

const Sidebar = () => {
    const { openNotebookId, setOpenNotebookId,mode,setMode,fetchNotebooks, notebooks, notebookPopup, setNotebookPopup } = useContext(NoteContext);
    const [spaceOpen, setSpaceOpen] = useState(true);
    const [notebookOpen, setNotebookOpen] = useState(true);
    const [sidebarWidth, setSidebarWidth] = useState(250);
    const isResizing = useRef(false);

    const {
        spaces: userSpaces,
        fetchSpaces,
        createSpace,
        currentSpaceId,
        setCurrentSpaceId,
        spacePopup,
        setSpacePopup
    } = useContext(SpacesContext);

    const { sidebar, setSidebar, canvas, setCanvas, setDesmos, desmos } = useContext(Context);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            fetchSpaces();
            fetchNotebooks();
        }
    }, [localStorage.getItem('user')]);

    const handleMouseDown = () => {
        isResizing.current = true;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e) => {
        if (!isResizing.current) return;
        let newWidth = e.clientX;
        if (newWidth < 300) newWidth = 250;
        if (newWidth > 400) newWidth = 400;
        setSidebarWidth(newWidth);
    };

    const handleMouseUp = () => {
        isResizing.current = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    return (
        <div className="flex h-full">
            <div
                style={{ width: sidebar ? `${sidebarWidth}px` : '60px' }}
                className="h-full bg-[#171717] text-white flex flex-col px-4 py-6 relative"
            >
                <button onClick={() => setSidebar(!sidebar)} className="mb-4">
                    {sidebar ? (
                        <img src={closee} className="h-4 opacity-55" alt="Close Sidebar" />
                    ) : (
                        <img src={open} className="h-6 opacity-55" alt="Open Sidebar" />
                    )}
                </button>

                {sidebar && (
                    <div className="flex items-center justify-between py-4">
                        <h1 className="text-[#b4b4b4]">Hi {localStorage.getItem('user')}</h1>
                        
                    </div>
                )}

                {sidebar && (
                    <div className="flex flex-col">
                        {/* Spaces */}
                        <div className="my-2">
                            <div className="flex justify-between items-center cursor-pointer rounded-md px-1">
                                <p className="text-[#b4b4b4] font-medium py-2 px-1">Spaces</p>
                                <div className="flex">
                                    <IoMdAdd onClick={() => setSpacePopup(true)} className="mr-2 text-xl text-[#949494]" />
                                    <img
                                        src={down_arrow}
                                        onClick={() => setSpaceOpen(!spaceOpen)}
                                        className={`h-5 opacity-55 transition-transform ${spaceOpen ? 'rotate-180' : ''}`}
                                        alt="Toggle Spaces"
                                    />
                                </div>
                            </div>

                            {spaceOpen && Array.isArray(userSpaces) && (
                                <div className="flex max-h-[185px] overflow-y-auto flex-col gap-1
                                    [&::-webkit-scrollbar]:w-2
                                    [&::-webkit-scrollbar-track]:rounded-full
                                    [&::-webkit-scrollbar-track]:bg-gray-100
                                    [&::-webkit-scrollbar-thumb]:rounded-full
                                    [&::-webkit-scrollbar-thumb]:bg-gray-300
                                    dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                                    dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                                    {userSpaces.map((space) => (
                                        <Folders key={space._id} img={'space'} name={space.name} id={space._id} />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Notebooks */}
                        <div className="my-2">
                            <div className="flex justify-between items-center cursor-pointer rounded-md px-1">
                                <p className="text-[#b4b4b4] font-medium py-2 px-1">Notebooks</p>
                                <div className="flex">
                                    <IoMdAdd onClick={() => setNotebookPopup(true)} className="mr-2 text-xl text-[#949494]" />
                                    <img
                                        src={down_arrow}
                                        onClick={() => setNotebookOpen(!notebookOpen)}
                                        className={`h-5 opacity-55 transition-transform ${notebookOpen ? 'rotate-180' : ''}`}
                                        alt="Toggle Notebooks"
                                    />
                                </div>
                            </div>

                            {notebookOpen && Array.isArray(notebooks) && (
                                <div className="flex max-h-[185px] overflow-y-auto flex-col gap-1
                                    [&::-webkit-scrollbar]:w-2
                                    [&::-webkit-scrollbar-track]:rounded-full
                                    [&::-webkit-scrollbar-track]:bg-gray-100
                                    [&::-webkit-scrollbar-thumb]:rounded-full
                                    [&::-webkit-scrollbar-thumb]:bg-gray-300
                                    dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                                    dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                                    {notebooks.map((notebook) => (
                                        <Notebook key={notebook._id} img={'notes'} name={notebook.title} id={notebook._id} />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Toggle Tools */}
                        <div onClick={() => setCanvas(!canvas)} className="hover:bg-[#2d2d2d] cursor-pointer mb-1 rounded-md mt-1 px-1">
                            <p className="text-[#b4b4b4] font-medium py-2 px-1">{canvas ? "Close" : "Open"} Canvas</p>
                        </div>

                        <div onClick={() => setDesmos(!desmos)} className="hover:bg-[#2d2d2d] cursor-pointer mb-1 rounded-md mt-1 px-1">
                            <p className="text-[#b4b4b4] font-medium py-2 px-1">{desmos ? "Close" : "Open"} Desmos</p>
                        </div>

                        {/* Other Options */}
                        <Link to={'/logout'}>
                            <div className="hover:bg-[#2d2d2d] cursor-pointer mb-1 rounded-md px-1">
                                <p className="text-[#b4b4b4] font-medium py-2 px-1">Logout</p>
                            </div>
                        </Link>

                        <div className="hover:bg-[#2d2d2d] cursor-pointer rounded-md px-1">
                            <p className="text-[#b4b4b4] font-medium py-2 px-1">Settings</p>
                        </div>
                    </div>
                )}

                {/* Resize Handle */}
                {sidebar && (
                    <div
                        onMouseDown={handleMouseDown}
                        className="absolute top-0 right-0 h-full w-0.5 cursor-ew-resize bg-gray-500 opacity-50 hover:opacity-100"
                    ></div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
