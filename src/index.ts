import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import express from "express";
import cors, { CorsOptions } from "cors";

const PORT = process.env.PORT || 3008;
const app = express();

const corsOptions: CorsOptions = {
  origin: ["http://localhost:3000", "http://localhost:3001"],
  methods: ["POST", "GET", "PUT", "DELETE"],
  optionsSuccessStatus: 200,
  credentials: true,
};

// Middleware
app.use(cookieParser()); // !!!Ensure cookie-parser is used before authMiddleware is called!!!
app.use(cors(corsOptions));
app.use(express.json());

import signUpRoutes from "./routes/signUpRoutes";
import signInRoutes from "./routes/signInRoutes";
import signOutRoutes from "./routes/signOutRoutes";
import userRoutes from "./routes/userRoutes";
import favoriteRoutes from "./routes/favoriteRoutes"

dotenv.config();

app.use("/sign-up", signUpRoutes);
app.use("/sign-in", signInRoutes);
app.use("/sign-out", signOutRoutes);
app.use("/users", userRoutes);
app.use("/favorites", favoriteRoutes )


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

