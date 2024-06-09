import e from "express";
import cors from "cors";
import { connectMongoDB } from "./utils/connectMongoDB.js";
import bodyParser from "body-parser";
import "dotenv/config";
import userRouter from "./routes/user.js";
import tweetRouter from "./routes/tweet.js";

const app = e();
const PORT = process.env.PORT || 8000;

// ? middlewares
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(e.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(e.json());

// ? MongoDB connection
connectMongoDB(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connection to MongoDB Successful");
  })
  .catch((err) => {
    console.log("MongoDB connection error: ", err);
  });

// ? Home route of server
app.get("/", (req, res) => {
  return res.send("Welcome to TweeTopia Server");
});

// ? Routes
app.use("/api/user", userRouter);
app.use("/api/tweet", tweetRouter);

app.listen(PORT, () => console.log(`server running on port: ${PORT}`));
