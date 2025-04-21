const { GoogleGenerativeAI } = require("@google/generative-ai");
const Space = require("../models/space.model"); // adjust path as needed

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getSummary = async (req, res) => {
  try {
    const { spaceId } = req.params;

    const space = await Space.findById(spaceId);
    if (!space) return res.status(404).json({ message: "Space not found" });

    const chatText = space.chats.map(chat => `${chat.sender}: ${chat.message}`).join("\n");

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(`Summarize the following conversation into clean, concise study notes. Focus only on the key concepts discussed without referring to who said what. Organize the summary using clear bullet points or headings that can help someone quickly revise the main ideas before an exam.

Here is the conversation:
${chatText}
`);
    const response = await result.response;
    const summary = await response.text();

    res.json({ summary });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ message: "Error generating summary." });
  }
};

module.exports = { getSummary };
