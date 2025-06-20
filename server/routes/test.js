// server/routes/test.js
import express from "express";
import supabase from "../services/supabase.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("registrations").select("*");

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

export default router;
