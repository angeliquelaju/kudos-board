const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const cards = await prisma.card.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json(cards);
});

router.post("/", async (req, res) => {
  const { title, description, gif, author, boardId } = req.body;
  const card = await prisma.card.create({
    data: { title, description, gif, author, boardId },
  });
  res.status(201).json(card);
});

router.put("/:id/upvote", async (req, res) => {
  const id = parseInt(req.params.id);
  const card = await prisma.card.update({
    where: { id },
    data: { votes: { increment: 1 } },
  });
  res.json(card);
});

router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await prisma.card.delete({ where: { id } });
  res.status(204).send();
});

module.exports = router;
