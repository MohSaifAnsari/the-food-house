require("dotenv").config(); // ✅ Top of the file
console.log("✅ Loaded Admin Email from .env:", process.env.ADMIN_EMAIL); // ✅ test

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// ✅ Socket.io
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

app.use(cors());
app.use(express.json());

// ✅ MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB Connected");
    server.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
  })
  .catch((err) => console.error("❌ MongoDB Error:", err));

// ✅ Add ping route to prevent Render from sleeping
app.get("/api/ping", (req, res) => {
  res.send("🏓 Pong");
});

// ✅ Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/orders", require("./routes/orderRoutes")(io));
app.use("/api/admin", require("./routes/adminauth")); // ✅ Admin login route

// ✅ Socket.io connection
io.on("connection", (socket) => {
  console.log("🟢 New client connected");
  socket.on("disconnect", () => console.log("🔴 Client disconnected"));
});
