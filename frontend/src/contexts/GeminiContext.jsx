import React, { createContext } from "react";
import { GoogleGenAI } from "@google/genai";

export const GeminiContext = createContext();

const GeminiProvider = ({ children }) => {
  const ai = new GoogleGenAI({ apiKey: "AIzaSyBgK_InBLKLMPzei_r88jEqPZpmBjiRNxk" });

  const sendMessage = async (input, isFlashcard = false) => {
    if (!input.trim()) return;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [{ role: "user", parts: [{ text: input }] }],
      });

      let aiText = response?.candidates[0]?.content?.parts[0].text || "I couldn't generate a response.";
      if (isFlashcard) return aiText;

      aiText = aiText
      .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") // Bold
      .replace(/^\* (.*?)/gm, "<li>$1</li>") // Bullet points
      .replace(/\n/g, "<br>"); // Line breaks

    // ✅ Wrap all <li> inside a single <ul>
    if (aiText.includes("<li>")) {
      aiText = aiText.replace(/(<li>.*?<\/li>)/g, "$1"); // no wrap first
      aiText = `<ul>${aiText}</ul>`; // single wrap
    }

      return aiText;
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "Error fetching AI response.";
    }
  };


  const sendImageToGemini = async (base64ImageString) => {
    try {
      const result = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [
          { role: "user", parts: [
            { text: "What is drawn in this image?" },
            {
              inlineData: {
                mimeType: "image/png",
                data: base64ImageString,
              },
            },
          ]}
        ]
      });
  
      
      return result?.candidates[0]?.content?.parts[0]?.text || "No response from Gemini.";
    } catch (err) {
      console.error("Image Gemini Error:", err);
      return "Error analyzing the image.";
    }
  };
  

  return (
    <GeminiContext.Provider value={{ sendMessage,sendImageToGemini }}>
      {children}
    </GeminiContext.Provider>
  );
};

export default GeminiProvider;
