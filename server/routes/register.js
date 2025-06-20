// server/routes/register.js
import express from "express";
import supabase from "../services/supabase.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { full_name, email, phone, Category, institution } = req.body;

  // Basic validation
  if (!full_name || !email) {
    return res.status(400).json({ error: "Full name and email are required" });
  }

  const { data, error } = await supabase.from("registrations").insert([
    {
      full_name,
      email,
      phone,
      Category,
      institution,
    },
  ]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json({ message: "Registration successful", data });
});

export default router;
