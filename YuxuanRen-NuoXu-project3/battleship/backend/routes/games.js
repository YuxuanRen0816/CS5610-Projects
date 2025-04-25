const express = require("express");
const router = express.Router();
const Game = require("../models/Game");
const generateRandomBoard = require("../utils/boardGenerator");
const authMiddleware = require("../middleware/auth");

// GET /api/games/user
// Returns categorized games for the logged-in user
router.get("/user", authMiddleware, async (req, res) => {
  try {
    const username = req.user.username;
    const games = await Game.find();

    const categorized = {
      open: games.filter((g) => !g.player2 && g.player1 !== username),
      myOpen: games.filter((g) => g.player1 === username && !g.player2),
      myActive: games.filter(
        (g) => (g.player1 === username || g.player2 === username) && g.status === "Active"
      ),
      myCompleted: games.filter(
        (g) => (g.player1 === username || g.player2 === username) && g.status === "Completed"
      ),
      other: games.filter(
        (g) => g.player1 !== username && g.player2 !== username && g.status !== "Open"
      ),
    };

    res.json(categorized);
  } catch (err) {
    console.error("Error in /user route:", err);
    res.status(500).json({ message: "Failed to fetch user games" });
  }
});

// GET /api/games/public
// Returns active and completed games for logged-out users
router.get("/public", async (req, res) => {
  try {
    const games = await Game.find();
    const publicGames = {
      active: games.filter((g) => g.status === "Active"),
      completed: games.filter((g) => g.status === "Completed"),
    };
    res.json(publicGames);
  } catch (err) {
    console.error("Error in /public route:", err);
    res.status(500).json({ message: "Failed to fetch public games" });
  }
});

// GET /api/games/:gameId
router.get("/:gameId", authMiddleware, async (req, res) => {
  try {
    const game = await Game.findById(req.params.gameId);
    if (!game) return res.status(404).json({ message: "Game not found" });
    res.json(game);
  } catch (err) {
    console.error("Error fetching game:", err);
    res.status(500).json({ message: "Failed to fetch game" });
  }
});

router.post("/new", authMiddleware, async (req, res) => {
  try {
    const user = req.user;

    const newGame = new Game({
      player1: user.username,
      board1: generateRandomBoard(),
      board2: Array(10).fill().map(() =>
        Array(10).fill().map(() => ({ type: "empty", hit: false }))
      ),
      currentTurn: user.username,
      status: "Open",
      createdAt: new Date(),
    });

    await newGame.save();

    res.status(201).json({ gameId: newGame._id });
  } catch (err) {
    console.error("Error creating new game:", err);
    res.status(500).json({ message: "Failed to create game" });
  }
});

// PUT /api/games/:gameId/fire
router.put("/:gameId/fire", authMiddleware, async (req, res) => {
  try {
    const { gameId } = req.params;
    const { x, y } = req.body;
    const username = req.user.username;

    const game = await Game.findById(gameId);
    if (!game) return res.status(404).json({ message: "Game not found" });

    if (game.status !== "Active") {
      return res.status(400).json({ message: "Game is not active" });
    }

    if (game.currentTurn !== username) {
      return res.status(403).json({ message: "Not your turn" });
    }

    const isPlayer1 = game.player1 === username;
    const targetBoard = isPlayer1 ? game.board2 : game.board1;

    const targetCell = targetBoard[x][y];
    if (targetCell === "hit" || targetCell === "miss") {
      return res.status(400).json({ message: "You already fired there" });
    }

    if (targetCell === "ship") {
      targetBoard[x][y] = "hit";
    } else {
      targetBoard[x][y] = "miss";
    }

    // Check win condition
    const hasRemainingShips = targetBoard.some(row => row.includes("ship"));
    if (!hasRemainingShips) {
      game.status = "Completed";
      game.winner = username;
    } else {
      game.currentTurn = isPlayer1 ? game.player2 : game.player1; // Switch turns
    }

    if (isPlayer1) {
      game.board2 = targetBoard;
    } else {
      game.board1 = targetBoard;
    }

    await game.save();
    res.json({ message: "Move recorded" });
  } catch (err) {
    console.error("Error in /fire:", err);
    res.status(500).json({ message: "Internal error" });
  }
});


module.exports = router;