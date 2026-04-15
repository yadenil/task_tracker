const express = require("express");
const cors = require('cors');
const tasksRouter = require("./routes/tasks");

const app = express();

const allowedOrigins = [
  "http://localhost:5173", 
  "https://task-tracker-gamma-topaz.vercel.app/", 
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  }),
);
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
