const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
app.use(cors());

const boardRoutes = require("./routes/boards");
const cardRoutes = require("./routes/cards");

app.use(express.json());

app.use("/boards", boardRoutes);
app.use("/cards", cardRoutes);

app.get("/", (req, res) => {
  res.send("active");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
