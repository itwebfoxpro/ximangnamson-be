const express = require("express");
const router = express.Router();
const noteController = require("../controllers/note.controller");

router.post("/notes", noteController.createNote);
router.get("/notes", noteController.getAllNotes);
router.get("/notes/:id", noteController.getNoteDetail);
router.put("/notes/:id/read", noteController.markNoteAsRead);
router.get("/notes-unread-count", noteController.countUnread);

module.exports = router;
