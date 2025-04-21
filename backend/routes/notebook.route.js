const express = require('express');
const router = express.Router();
const notebookController = require('../controllers/notebookController');
const authenticate = require('../middleware/authMiddleware');

router.post('/', authenticate, notebookController.createNotebook);
router.get('/', authenticate, notebookController.getAllNotebooks);
router.get('/:id', authenticate, notebookController.getNotebookById);
router.put('/:id', authenticate, notebookController.updateNotebook);
router.delete('/:id', authenticate, notebookController.deleteNotebook);

module.exports = router;
