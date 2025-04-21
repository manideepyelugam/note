const Notebook = require('../models/notebook.model');
const User = require("../models/user.model");


exports.createNotebook = async (req, res) => {
    try {
      const { title, summary } = req.body;
      const userId = req.user.id; // JWT middleware should provide this
  
      // 1. Create the notebook
      const notebook = await Notebook.create({
        title,
        summary,
        user: userId
      });
  
      // 2. Push notebook ID into user's `notebooks` array
      await User.findByIdAndUpdate(userId, {
        $push: { Notebook: notebook._id }
      });
  
      // 3. Return the created notebook
      res.status(201).json(notebook);
    } catch (err) {
      console.error("Error creating notebook:", err);
      res.status(500).json({ error: 'Failed to create notebook', details: err.message });
    }
  };

// Get all notebooks for the logged-in user
exports.getAllNotebooks = async (req, res) => {
  try {
    const notebooks = await Notebook.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(notebooks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notebooks', details: err.message });
  }
};

// Get a specific notebook by ID
exports.getNotebookById = async (req, res) => {
  try {
    const notebook = await Notebook.findOne({ _id: req.params.id, user: req.user.id });
    if (!notebook) return res.status(404).json({ error: 'Notebook not found' });
    res.json(notebook);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve notebook', details: err.message });
  }
};


// Update a notebook
exports.updateNotebook = async (req, res) => {
  try {
    const { title, summary, appendSummary = false } = req.body;

    const notebook = await Notebook.findOne({ _id: req.params.id, user: req.user.id });
    if (!notebook) return res.status(404).json({ error: 'Notebook not found or unauthorized' });

    if (title !== undefined) notebook.title = title;

    if (summary !== undefined) {
      notebook.summary = appendSummary
        ? (notebook.summary ? notebook.summary + "\n\n" + summary : summary)
        : summary;
    }

    await notebook.save();
    res.json(notebook);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update notebook', details: err.message });
  }
};




// Delete a notebook
exports.deleteNotebook = async (req, res) => {
  try {
    const notebook = await Notebook.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!notebook) return res.status(404).json({ error: 'Notebook not found or unauthorized' });
    res.json({ message: 'Notebook deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete notebook', details: err.message });
  }
};
