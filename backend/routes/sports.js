const express = require("express");
const router = express.Router();
const couch = require("../utils/couchdbClient");

// ---------------- UTILS ----------------

const formatDocId = (rawId) => {
  if (rawId === 'team_profile') return 'team_profile';

  const parts = rawId.split('_');
  if (parts.length === 3) {
    const [year, type, season] = parts;
    if (type === 'schedule') return `schedule_${year}_${season.toUpperCase()}`;
    if (type === 'stats') return `seasonal_stats_${year}_${season.toUpperCase()}`;
  }

  return rawId;
};

// ---------------- ROUTES ----------------

// Count CouchDB databases starting with "vandy_"
router.get("/stats/teams-count", async (req, res) => {
  try {
    const dbList = await couch.db.list();
    const count = dbList.filter(db => db.startsWith("vandy_")).length;
    res.json({ count });
  } catch (err) {
    console.error("[!] Failed to fetch team count:", err.message);
    res.status(500).json({ error: "Failed to fetch team count" });
  }
});

// Count total games played across all vandy databases
router.get("/stats/games-count", async (req, res) => {
  try {
    const dbList = await couch.db.list();
    const vandyDbs = dbList.filter(db => db.startsWith("vandy_"));

    let totalGames = 0;

    const years = ['2023', '2024'];
    const types = ['REG', 'CT', 'PST'];

    for (const dbName of vandyDbs) {
      const db = couch.use(dbName);

      for (const year of years) {
        for (const type of types) {
          const docId = `seasonal_stats_${year}_${type}`;
          try {
            const doc = await db.get(docId);

            const gamesPlayed =
              doc?.data?.record?.games_played ??
              doc?.data?.own_record?.total?.games_played ?? 0;

            totalGames += gamesPlayed;
          } catch (err) {
            console.log(`[!] Skipped ${dbName}/${docId}: ${err.reason || err.message}`);
            continue;
          }
        }
      }
    }

    res.json({ count: totalGames });
  } catch (err) {
    console.error("[!] Failed to fetch games count:", err.message);
    res.status(500).json({ error: "Failed to fetch games count" });
  }
});

// Count total unique players tracked across all vandy databases
router.get("/stats/players-count", async (req, res) => {
  try {
    const dbList = await couch.db.list();
    const vandyDbs = dbList.filter(db => db.startsWith("vandy_"));

    const years = ['2023', '2024'];
    const types = ['REG', 'CT', 'PST'];

    const seenPlayers = new Set();

    for (const dbName of vandyDbs) {
      const db = couch.use(dbName);

      for (const year of years) {
        for (const type of types) {
          const docId = `seasonal_stats_${year}_${type}`;
          try {
            const doc = await db.get(docId);
            const players = doc?.data?.players || [];

            for (const player of players) {
              if (player.id) {
                seenPlayers.add(player.id);
              }
            }
          } catch (err) {
            console.log(`[!] Skipped ${dbName}/${docId}: ${err.reason || err.message}`);
            continue;
          }
        }
      }
    }

    res.json({ count: seenPlayers.size });
  } catch (err) {
    console.error("[!] Failed to fetch players count:", err.message);
    res.status(500).json({ error: "Failed to fetch players count" });
  }
});

// Must come after all /stats routes
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
