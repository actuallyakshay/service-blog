require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoDBconnect = require("./config/connect");
const router = require("./routes");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use(router);

app.get("/", (req, res) => {
  res.send("ping");
});

app.listen(PORT, async () => {
  try {
    await mongoDBconnect();
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
});
