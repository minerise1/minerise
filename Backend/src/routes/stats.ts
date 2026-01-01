import express from "express";
import { status } from "minecraft-server-util";

const router = express.Router();

router.get("/", async (_req, res) => {
  try {
    const server = await status("node3.celestialnodes.xyz", 25570, {
      timeout: 3000,
    });

    res.json({
      online: true,
      onlinePlayers: server.players.online,
      maxPlayers: server.players.max,
    });
  } catch {
    res.json({
      online: false,
      onlinePlayers: 0,
      maxPlayers: 0,
    });
  }
});

export default router;
