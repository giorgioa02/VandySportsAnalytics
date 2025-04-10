const express = require("express");
const router = express.Router();
const couch = require("../utils/couchdbClient");

// GET: /api/sports/:sport/:docId
router.get("/:sport/:docId", async (req, res) => {
  const { sport, docId } = req.params;
  const dbName = `vandy_${sport}`;

  try {
    const db = couch.use(dbName);
    const doc = await db.get(docId);
    res.json(doc);
  } catch (err) {
    console.error(`[!] Failed to retrieve ${docId} from ${dbName}:`, err.reason || err);
    res.status(404).json({ error: "Document not found" });
  }
});

module.exports = router;
