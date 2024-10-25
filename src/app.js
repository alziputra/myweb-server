require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

// Routes akan diimpor dan digunakan di sini
app.get("/", (req, res) => {
  res.send(`Server running on port ${PORT}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
