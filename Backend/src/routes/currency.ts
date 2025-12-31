import express from "express";

const router = express.Router();

let cachedRates: Record<string, number> | null = null;
let lastFetch = 0;

router.get("/", async (_, res) => {
  try {
    if (cachedRates && Date.now() - lastFetch < 1000 * 60 * 60) {
      return res.json(cachedRates);
    }

    if (typeof fetch !== "function") {
      throw new Error("fetch not available");
    }

    const response = await fetch("https://api.exchangerate.host/latest?base=USD");
    const data = await response.json();

    if (!data || !data.rates) {
      throw new Error("invalid exchange data");
    }

    cachedRates = data.rates;
    lastFetch = Date.now();

    return res.json(cachedRates);
  } catch (err) {
    console.error("Currency route error:", err);

    return res.json({
      USD: 1,
      EUR: 0.92,
      GBP: 0.79,
      INR: 83,
    });
  }
});

export default router;
