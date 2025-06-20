// server/index.js
import express from "express";
import cors from "cors";
import testRouter from "./routes/test.js";
import registerRouter from "./routes/register.js"; // <-- new line

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/test", testRouter);
app.use("/api/register", registerRouter); // <-- new line

app.get("/", (req, res) => {
  res.send("UPUK Microcon backend is running with Supabase!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
