const Space = require("../models/space.model");
const User = require("../models/user.model");



exports.createSpace = async (req, res) => {
    try {
        const { name } = req.body;
        const userId = req.user.id; // Assuming you're using JWT middleware that sets req.user
    
        // Create the new space
        const space = await Space.create({
          name,
          user: userId
        });
    
        // Add the space to the user's `spaces` array
        await User.findByIdAndUpdate(userId, { $push: { spaces: space._id } });
    
        res.status(201).json(space);
      } catch (error) {
        console.error("Error creating space:", error);
        res.status(500).json({ message: "Server Error" });
      }
};



// exports.addChatToSpace = async (req, res) => {
//     try {
//         const { spaceId } = req.params;
//         const { message, sender } = req.body;

//         const space = await Space.findById(spaceId);
//         if (!space) {
//             return res.status(404).json({ success: false, message: "Space not found" });
//         }

//         // Add new chat message to the space's chat array
//         space.chats.push({ message, sender });
//         await space.save();

//         res.status(201).json({ success: true, space });
//     } catch (err) {
//         res.status(500).json({ success: false, error: err.message });
//     }
// };


// exports.getChatsFromSpace = async (req, res) => {
//     try {
//         const { spaceId } = req.params;

//         const space = await Space.findById(spaceId);
//         if (!space) {
//             return res.status(404).json({ success: false, message: "Space not found" });
//         }

//         res.json({ success: true, chats: space.chats });
//     } catch (err) {
//         res.status(500).json({ success: false, error: err.message });
//     }
// };


exports.chatInSpace = async (req, res) => {
    try {
      const { spaceId } = req.params;
      const { message, sender } = req.body;
  
      const space = await Space.findById(spaceId);
      if (!space) {
        return res.status(404).json({ success: false, message: "Space not found" });
      }
  
      // If message and sender are provided, add to chat
      if (message && sender) {
        space.chats.push({ message, sender });
        await space.save();
      }
  
      // Return all chats
      res.status(200).json({ success: true, chats: space.chats });
    } catch (err) {
      console.error("Error in chatInSpace:", err);
      res.status(500).json({ success: false, error: err.message });
    }
  };
  

exports.renameSpace = async (req, res) => {
    try {
        const { spaceId } = req.params;
        const { newName } = req.body;

        const space = await Space.findByIdAndUpdate(
            spaceId,
            { name: newName },
            { new: true }
        );

        if (!space) {
            return res.status(404).json({ success: false, message: "Space not found" });
        }

        res.json({ success: true, space });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};


exports.deleteSpace = async (req, res) => {
    try {
        const { spaceId } = req.params;

        const deletedSpace = await Space.findByIdAndDelete(spaceId);
        if (!deletedSpace) {
            return res.status(404).json({ success: false, message: "Space not found" });
        }

        res.json({ success: true, message: "Space deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.getUserSpaces = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).populate("spaces");
      res.status(200).json(user.spaces);
    } catch (error) {
      console.error("Error fetching spaces:", error);
      res.status(500).json({ message: "Server Error" });
    }
  };