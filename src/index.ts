import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import favoriteRoutes from "./routes/favoriteRoutes"
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/favorites", favoriteRoutes )


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

