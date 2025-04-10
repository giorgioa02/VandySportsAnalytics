// backend/routes/sports.js

const express = require("express");
const router = express.Router();
const couch = require("../utils/couchdbClient");

// Utility function to format the correct CouchDB doc ID
const formatDocId = (rawId) => {
  if (rawId === 'team_profile') return 'team_profile';

  const parts = rawId.split('_'); // e.g., ['2024', 'schedule', 'ct']
  if (parts.length === 3) {
    const [year, type, season] = parts;
    if (type === 'schedule') return `schedule_${year}_${season.toUpperCase()}`;
    if (type === 'stats') return `seasonal_stats_${year}_${season.toUpperCase()}`;
  }

  return rawId; // fallback if format doesn't match
};

// Route: GET /api/:sport/:docId
router.get("/:sport/:docId", async (req, res) => {
  const { sport, docId: rawId } = req.params;
  const dbName = `vandy_${sport}`;
  const docId = formatDocId(rawId);

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
