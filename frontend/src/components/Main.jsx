import React from 'react'
import Response from './Response'
import{ Context} from '../contexts/ThemeContext';
import { useContext } from 'react';
import Note from './Note';
import { NoteContext } from '../contexts/NoteContext';

const Main = () => {
  const { sidebar } = useContext(Context);
  const { mode } = useContext(NoteContext);

  return (
    <div className={`${sidebar ? 'w-[85%]' : 'w-full'} flex items-center flex-col bg-[#212121] h-full`}>
     {mode === 'notebook' && <Note />}
{mode === 'space' && <Response />}
{!mode && (
  <Response /> // still show input, even if mode not explicitly set
)}

    </div>
  );
};
export default Main;