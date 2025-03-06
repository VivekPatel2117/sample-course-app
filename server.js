const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", 
  },
});

app.use(cors());

// Emit updated course data every 5 seconds
setInterval(async () => {
  try {
    const response = await fetch("http://localhost:5000/courses");
    const courses = await response.json();
    io.emit("courseLikesUpdated", courses); // Send updated data to frontend
  } catch (error) {
    console.error("Error fetching courses:", error);
  }
}, 5000);

server.listen(4000, () => console.log("WebSocket server running on port 4000"));
