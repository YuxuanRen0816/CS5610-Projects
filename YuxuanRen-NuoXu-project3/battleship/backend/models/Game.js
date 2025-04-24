// backend/models/Game.js
const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  player1: { type: String, required: true },
  player2: { type: String },
  board1: [[{
    type: { type: String, default: "empty" },
    hit: { type: Boolean, default: false }
  }]],
  board2: [[{
    type: { type: String, default: "empty" },
    hit: { type: Boolean, default: false }
  }]],
  currentTurn: { type: String },
  status: { type: String, enum: ['Open', 'Active', 'Completed'], default: 'Open' },
  winner: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Game', gameSchema);
