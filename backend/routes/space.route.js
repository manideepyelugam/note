const express = require("express");
const router = express.Router();
const spaceController = require("../controllers/spaceController");
const authenticate = require("../middleware/authMiddleware");

router.post("/", authenticate,spaceController.createSpace); // Create a space
router.put("/:spaceId/rename",authenticate, spaceController.renameSpace); // Rename a space
router.delete("/:spaceId", authenticate,spaceController.deleteSpace); // Delete a space
router.post("/:spaceId/chat", authenticate, spaceController.chatInSpace);
router.get("/allspaces", authenticate, spaceController.getUserSpaces); // Get a space


module.exports = router;
