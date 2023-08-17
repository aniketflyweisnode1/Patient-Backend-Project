const express = require("express");
const app = express();
const cors = require("cors");
const dbConnect = require("./config/dbConnect");
require("dotenv").config();

dbConnect();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(cors());
app.use(express.json());
app.use("/api/v1/", require("./routes/Routes"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});
