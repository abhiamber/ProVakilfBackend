const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const connectDB = require("./config/db");
const userRoute = require("./routes/user.routes");
const scheduleRoute = require("./routes/schedule.route");
// const eventRoute = require("./routes/event.routes");

const PORT = process.env.PORT || 8080;

// middleware;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/user", userRoute);
app.use("/api/v1/schedule", scheduleRoute);
// app.use("/api/v1/event", eventRoute);

app.get("/", async (req, res) => {
  res.send("api is working fine............");
});

app.listen(PORT, async () => {
  await connectDB();

  console.log(`Server running on PORT: ${PORT}`);
});
