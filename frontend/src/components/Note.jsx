// import React, { useEffect, useState, useContext } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import { NoteContext } from '../contexts/NoteContext';
// import { quillModules, quillFormats } from '../utility/quillModules';
// import NotebookPopup from './NotebookPopup';
// import { SpacesContext } from '../contexts/SpacesContext';
// import SpacePopup from './SpacePopup';




// export default function Note() {
//   const {
//     openNotebookId,
//     loadNotes,
//     notes,
//     renameNotebook,
//     setNotes,
//     notebookPopup
//   } = useContext(NoteContext);

//   const {spacePopup} = useContext(SpacesContext);

//   const [title, setTitle] = useState('');
//   const [summary, setSummary] = useState('');


//   // Load notebook data when openNotebookId changes
//   useEffect(() => {
//     if (openNotebookId) {
//       loadNotes(openNotebookId);
//     }
//   }, [openNotebookId]);

  
//   // Sync context notes into local state
//   useEffect(() => {
//     if (notes.length > 0) {
//       setTitle(notes[0].title || '');
//       setSummary(notes[0].summary || '');
//     }
//   }, [notes]);

//   // Save updates to notebook
//   const handleSave = () => {
//     renameNotebook(openNotebookId, {
//       title,
//       summary,
//     });
//   };

  
  

//   return (
//     <div className="p-6 w-full h-screen bg-[#212121] text-white overflow-y-scroll">
//       {openNotebookId ? (
//         <>
//           <input
//             type="text"
//             className="w-full text-3xl font-bold mb-4 bg-transparent text-white outline-none"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="Notebook Title"
//           />

// {notebookPopup && (
//      <NotebookPopup/>)}

//     {spacePopup && (
//          <SpacePopup/>
//         )}
    
        

//           <div className="mb-6">
//             <h2 className="text-xl font-semibold mb-2">Summary</h2>
//             <div className="mb-9">

//             <ReactQuill
//   value={summary}
//   onChange={setSummary}
//   modules={quillModules}
//   formats={quillFormats}
//   className="h-[50%] text-black text-xl border-none"
// />

//             </div>
//           </div>

//           <button
//             className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-md font-semibold"
//             onClick={handleSave}
//           >
//             Save
//           </button>
//         </>   ) : (
//         <p>Select a notebook to start editing.</p>
//       )}
//     </div>
//   );
// }


// Install required packages
// // npm install marked dompurify

// import React, { useEffect, useState, useContext } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import { marked } from 'marked';
// import DOMPurify from 'dompurify';
// import { NoteContext } from '../contexts/NoteContext';
// import { quillModules, quillFormats } from '../utility/quillModules';
// import NotebookPopup from './NotebookPopup';
// import { SpacesContext } from '../contexts/SpacesContext';
// import SpacePopup from './SpacePopup';

// export default function Note() {
//   const {
//     openNotebookId,
//     loadNotes,
//     notes,
//     renameNotebook,
//     notebookPopup
//   } = useContext(NoteContext);

//   const {spacePopup} = useContext(SpacesContext);

//   const [title, setTitle] = useState('');
//   const [summary, setSummary] = useState('');

//   // Load notebook data when openNotebookId changes
//   useEffect(() => {
//     if (openNotebookId) {
//       loadNotes(openNotebookId);
//     }
//   }, [openNotebookId]);

//   // Sync context notes into local state
//   useEffect(() => {
//     if (notes.length > 0) {
//       setTitle(notes[0].title || '');
      
//       const content = notes[0].summary || '';
      
//       try {
//         // Convert markdown to HTML
//         const html = marked(content);
//         // Sanitize HTML to prevent XSS
//         const sanitizedHtml = DOMPurify.sanitize(html);
//         setSummary(sanitizedHtml);
//       } catch (error) {
//         console.error('Error converting markdown:', error);
//         setSummary(content);
//       }
//     }
//   }, [notes]);

//   // Save updates to notebook
//   const handleSave = () => {
//     renameNotebook(openNotebookId, {
//       title,
//       summary,
//     });
//   };

//   return (
//     <div className="p-6 w-full h-screen bg-[#212121] text-white overflow-y-scroll">
//       {openNotebookId ? (
//         <>
//           <input
//             type="text"
//             className="w-full text-3xl font-bold mb-4 bg-transparent text-white outline-none"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="Notebook Title"
//           />

//           {notebookPopup && <NotebookPopup/>}
//           {spacePopup && <SpacePopup/>}
        
//           <div className="mb-6">
//             <h2 className="text-xl font-semibold mb-2">Summary</h2>
//             <div className="mb-9">
//               <ReactQuill
//                 value={summary}
//                 onChange={setSummary}
//                 modules={quillModules}
//                 formats={quillFormats}
//                 className="h-[50%] text-black text-xl border-none"
//               />
//             </div>
//           </div>

//           <button
//             className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-md font-semibold"
//             onClick={handleSave}
//           >
//             Save
//           </button>
//         </>
//       ) : (
//         <p>Select a notebook to start editing.</p>
//       )}
//     </div>
//   );
// }

// import React, { useEffect, useState, useContext } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import { NoteContext } from '../contexts/NoteContext';
// import { quillModules, quillFormats } from '../utility/quillModules';
// import NotebookPopup from './NotebookPopup';
// import { SpacesContext } from '../contexts/SpacesContext';
// import SpacePopup from './SpacePopup';

// // Enhanced function to convert markdown to HTML
// const markdownToHTML = (markdown) => {
//   if (!markdown) return '';

//   let html = markdown;

//   // Convert headers (h1-h6)
//   html = html.replace(/^######\s(.+)$/gm, '<h6>$1</h6>');
//   html = html.replace(/^#####\s(.+)$/gm, '<h5>$1</h5>');
//   html = html.replace(/^####\s(.+)$/gm, '<h4>$1</h4>');
//   html = html.replace(/^###\s(.+)$/gm, '<h3>$1</h3>');
//   html = html.replace(/^##\s(.+)$/gm, '<h2>$1</h2>');
//   html = html.replace(/^#\s(.+)$/gm, '<h1>$1</h1>');

//   // Convert bold and italic
//   html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
//   html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');
//   html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
//   html = html.replace(/_(.+?)_/g, '<em>$1</em>');

//   // Convert lists
//   html = html.replace(/^\*\s(.+)$/gm, '<li>$1</li>');
//   html = html.replace(/^\-\s(.+)$/gm, '<li>$1</li>');
//   html = html.replace(/^\d+\.\s(.+)$/gm, '<li>$1</li>');
  
//   // Wrap list items in ul/ol
//   html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => {
//     return `<ul>${match}</ul>`;
//   });

//   // Convert links
//   html = html.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2">$1</a>');

//   // Convert inline code
//   html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

//   // Convert code blocks
//   html = html.replace(/```[\s\S]*?```/g, function(match) {
//     const code = match.replace(/```/g, '').trim();
//     return `<pre><code>${code}</code></pre>`;
//   });

//   // Convert paragraphs (lines separated by blank lines)
//   html = html.split('\n\n').map(para => {
//     // Don't wrap HTML tags that are already present
//     if (para.startsWith('<') && para.endsWith('>')) {
//       return para;
//     }
//     return `<p>${para}</p>`;
//   }).join('');

//   // Convert line breaks within paragraphs
//   html = html.replace(/\n/g, '<br/>');

//   // Clean up empty paragraphs
//   html = html.replace(/<p>\s*<\/p>/g, '');
  
//   return html;
// };

// export default function Note() {
//   const {
//     openNotebookId,
//     loadNotes,
//     notes,
//     renameNotebook,
//     notebookPopup
//   } = useContext(NoteContext);

//   const {spacePopup} = useContext(SpacesContext);

//   const [title, setTitle] = useState('');
//   const [summary, setSummary] = useState('');

//   // Load notebook data when openNotebookId changes
//   useEffect(() => {
//     if (openNotebookId) {
//       loadNotes(openNotebookId);
//     }
//   }, [openNotebookId]);

//   // Sync context notes into local state
//   useEffect(() => {
//     if (notes.length > 0) {
//       setTitle(notes[0].title || '');
      
//       // Check if the content is markdown (has markdown indicators)
//       const content = notes[0].summary || '';
//       const isMarkdown = /[#*`\[\]!>\-]/.test(content);
      
//       if (isMarkdown) {
//         // Convert markdown to HTML
//         const htmlContent = markdownToHTML(content);
//         setSummary(htmlContent);
//       } else {
//         setSummary(content);
//       }
//     }
//   }, [notes]);

//   // Save updates to notebook
//   const handleSave = () => {
//     renameNotebook(openNotebookId, {
//       title,
//       summary,
//     });
//   };

//   return (
//     <div className="p-6 w-full h-screen bg-[#212121] text-white overflow-y-scroll">
//       {openNotebookId ? (
//         <>
//           <input
//             type="text"
//             className="w-full text-3xl font-bold mb-4 bg-transparent text-white outline-none"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="Notebook Title"
//           />

//           {notebookPopup && <NotebookPopup/>}
//           {spacePopup && <SpacePopup/>}
        
//           <div className="mb-6">
//             <h2 className="text-xl font-semibold mb-2">Summary</h2>
//             <div className="mb-9">
//               <ReactQuill
//                 value={summary}
//                 onChange={setSummary}
//                 modules={quillModules}
//                 formats={quillFormats}
//                 className="h-[50%] text-black text-xl border-none"
//               />
//             </div>
//           </div>

//           <button
//             className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-md font-semibold"
//             onClick={handleSave}
//           >
//             Save
//           </button>
//         </>
//       ) : (
//         <p>Select a notebook to start editing.</p>
//       )}
//     </div>
//   );
// }



import React, { useEffect, useState, useContext } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { NoteContext } from '../contexts/NoteContext';
import { quillModules, quillFormats } from '../utility/quillModules';
import NotebookPopup from './NotebookPopup';
import { SpacesContext } from '../contexts/SpacesContext';
import SpacePopup from './SpacePopup';

// Add global styles for the Quill editor
const quillStyles = `
  .ql-editor h1 {
    font-size: 2em !important;
    font-weight: bold !important;
    margin-bottom: 0.5em !important;
  }
  .ql-editor h2 {
    font-size: 1.5em !important;
    font-weight: bold !important;
    margin-bottom: 0.5em !important;
  }
  .ql-editor p {
    margin-bottom: 1em !important;
  }
  .ql-editor ul, .ql-editor ol {
    margin-bottom: 1em !important;
  }
`;

export default function Note() {
  const {
    openNotebookId,
    loadNotes,
    notes,
    renameNotebook,
    notebookPopup
  } = useContext(NoteContext);

  const {spacePopup} = useContext(SpacesContext);

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');

  // Add styles to the document
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = quillStyles;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Load notebook data when openNotebookId changes
  useEffect(() => {
    if (openNotebookId) {
      loadNotes(openNotebookId);
    }
  }, [openNotebookId]);

  // Sync context notes into local state
  useEffect(() => {
    if (notes.length > 0) {
      setTitle(notes[0].title || '');
      
      const content = notes[0].summary || '';
      
      try {
        // Convert markdown to HTML with breaks enabled
        marked.setOptions({
          breaks: true,
          gfm: true
        });
        
        const html = marked(content);
        
        // Sanitize HTML to prevent XSS
        const sanitizedHtml = DOMPurify.sanitize(html);
        
        setSummary(sanitizedHtml);
      } catch (error) {
        console.error('Error converting markdown:', error);
        setSummary(content);
      }
    }
  }, [notes]);

  // Save updates to notebook
  const handleSave = () => {
    renameNotebook(openNotebookId, {
      title,
      summary,
    });
  };

  return (
    <div className="p-6 w-full h-screen bg-[#212121] text-white overflow-y-scroll">
      {openNotebookId ? (
        <>
          <input
            type="text"
            className="w-full text-3xl font-bold mb-4 bg-transparent text-white outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Notebook Title"
          />

          {notebookPopup && <NotebookPopup/>}
          {spacePopup && <SpacePopup/>}
        
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Summary</h2>
            <div className="mb-9">
              <ReactQuill
                value={summary}
                onChange={setSummary}
                modules={quillModules}
                formats={quillFormats}
                className="h-[50%] text-black text-xl border-none"
              />
            </div>
          </div>

          <button
            className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-md font-semibold"
            onClick={handleSave}
          >
            Save
          </button>
        </>
      ) : (
        <p>Select a notebook to start editing.</p>
      )}
    </div>
  );
}