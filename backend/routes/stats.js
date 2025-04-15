// backend/routes/stats.js

const express = require('express');
const router = express.Router();
const nano = require('nano')('http://admin:group1pass@10.56.1.163:5984'); // adjust creds/URL if needed

router.get('/teams-count', async (req, res) => {
  try {
    const dbs = await nano.db.list();
    const teamDbs = dbs.filter(name => name.startsWith('vandy_'));
    res.json({ teams: teamDbs.length });
  } catch (err) {
    console.error("[!] Failed to get team count:", err);
    res.status(500).json({ error: 'Failed to count team databases' });
  }
});

module.exports = router;
