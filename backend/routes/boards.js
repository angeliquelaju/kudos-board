const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const boards = await prisma.board.findMany({ include: { cards: true } });
  res.json(boards);
});

router.post("/", async (req, res) => {
  const { title, description, category, image, author } = req.body;
  const board = await prisma.board.create({
    data: { title, description, category, image, author },
  });
  res.status(201).json(board);
});

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const board = await prisma.board.findUnique({
    where: { id },
    include: { cards: true },
  });
  board ? res.json(board) : res.status(404).send("Board not found");
});

router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await prisma.card.deleteMany({ where: { boardId: id } });
  await prisma.board.delete({ where: { id } });
  res.status(204).send();
});

module.exports = router;
