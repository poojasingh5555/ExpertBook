import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import Booking from "./routes/bookingroute.js"
import Expert from "./routes/expertroute.js"
import { errorHandler } from "./middleware/errorhandler.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Socket.io setup
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
app.use((req, res, next) => { req.io = io; next(); });

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

app.use("/api/bookings",Booking);

app.use("/api/experts",Expert)
app.use(errorHandler);

const PORT = process.env.PORT;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));