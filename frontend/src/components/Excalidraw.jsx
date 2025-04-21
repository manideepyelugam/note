import React, { useState, useRef, useContext, useEffect } from "react";
import { Stage, Layer, Line } from "react-konva";
import { Context } from "../contexts/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GeminiContext } from "../contexts/GeminiContext";
import { faPen, faEraser, faRotateLeft, faBroom, faXmark } from "@fortawesome/free-solid-svg-icons";
import { SpacesContext } from "../contexts/SpacesContext";

const Excalidraw = () => {
  const [lines, setLines] = useState([]);
  const [tool, setTool] = useState("pen");
  const [color, setColor] = useState("#ffffff");
  const isDrawing = useRef(false);
  const { canvas, setCanvas } = useContext(Context);
  const { currentSpaceId, sendChatToSpace } = useContext(SpacesContext);
  const stageRef = useRef();
  const { sendImageToGemini } = useContext(GeminiContext);

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines((prevLines) => [
      ...prevLines,
      { tool, color, points: [pos.x, pos.y] },
    ]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current) return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    setLines((prevLines) => {
      const lastLine = prevLines[prevLines.length - 1];
      const updatedLine = {
        ...lastLine,
        points: [...lastLine.points, point.x, point.y],
      };
      return [...prevLines.slice(0, -1), updatedLine];
    });
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleUndo = () => {
    setLines((prevLines) => prevLines.slice(0, -1));
  };

  const handleClear = () => {
    setLines([]);
  };

  const handleSendToBard = async () => {
    const uri = stageRef.current.toDataURL();
    const base64ImageString = uri.replace(/^data:image\/png;base64,/, "");
    const response = await sendImageToGemini(base64ImageString);

    if (response) {
      await sendChatToSpace(currentSpaceId, "explain the drawing in the canvas", "user");
      await sendChatToSpace(currentSpaceId, response, "ai");
    }
  };

 

  return canvas ? (
    <div className="flex flex-col bg-[#171717] px-3 text-white items-center">
      {/* Toolbar */}
      <div className="mt-10 flex gap-8 bg-[#212121] py-3 px-8 rounded-lg">
        <button
          onClick={() => setTool("pen")}
          className={`${
            tool === "pen" ? "bg-blue-600" : "bg-transparent"
          } p-2 rounded-lg`}
        >
          <FontAwesomeIcon icon={faPen} />
        </button>
        <button
          onClick={() => setTool("eraser")}
          className={`${
            tool === "eraser" ? "bg-blue-600" : "bg-transparent"
          } p-2 rounded-lg`}
        >
          <FontAwesomeIcon icon={faEraser} />
        </button>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          disabled={tool === "eraser"}  
          className="h-7 w-7 rounded-full border-none cursor-pointer bg-transparent p-0 shadow-lg"
        />
        <button
          onClick={handleUndo}
          className={`${
            tool === "undo" ? "bg-blue-600" : "bg-transparent"
          } p-2 rounded-lg`}
        >
          <FontAwesomeIcon icon={faRotateLeft} />
        </button>
        <button
          onClick={handleClear}
          className={`${
            tool === "clear" ? "bg-blue-600" : "bg-transparent"
          } p-2 rounded-lg`}
        >
          <FontAwesomeIcon icon={faBroom} />
        </button>
        <button
          onClick={() => setCanvas(!canvas)}
          className="text-xl bg-transparent p-2 rounded-lg"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>

      {/* Drawing Canvas */}
      <div
        style={{
          width: "450px",
          height: "800px",
          border: "2px solid #333",
          position: "relative",
          marginTop: "20px",
          overflow: "auto",
        }}
      >
        {/* Hide scrollbars in WebKit */}
        <style>
          {`
            div::-webkit-scrollbar {
              display: none;
            }
            div {
              -ms-overflow-style: none;
            }
          `}
        </style>

        <Stage
          ref={stageRef}
          width={2000}
          height={2000}
          draggable
          onMouseDown={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}
        >
          <Layer>
            {lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke={line.tool === "eraser" ? "black" : line.color}
                strokeWidth={line.tool === "eraser" ? 20 : 3}
                tension={0.5}
                lineCap="round"
                lineJoin="round"
                globalCompositeOperation={
                  line.tool === "eraser" ? "destination-out" : "source-over"
                }
              />
            ))}
          </Layer>
        </Stage>
      </div>

      {/* Send to Bard button */}
      <button
        onClick={handleSendToBard}
        className="text-white absolute bottom-7 right-6 bg-blue-600 px-4 py-2 rounded mt-4"
      >
        Send
      </button>
    </div>
  ) : (
    ""
  );
};

export default Excalidraw;
