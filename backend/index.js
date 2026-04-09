const express = require("express");
const cors = require('cors');
const tasksRouter = require("./routes/tasks");

const app = express();
app.use(cors());
app.use(express.json());

// Middleware to log all requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

app.use("/tasks", tasksRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`[START] Server is running on port ${PORT}`);
});
