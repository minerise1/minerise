import express from "express";

const router = express.Router();

let cachedRates: Record<string, number> | null = null;
let lastFetch = 0;

router.get("/", async (_, res) => {
  try {
    if (cachedRates && Date.now() - lastFetch < 1000 * 60 * 60) {
      return res.json(cachedRates);
    }

    const response = await fetch("https://open.er-api.com/v6/latest/USD");
    const data = await response.json();

    if (!data || data.result !== "success" || !data.rates) {
      throw new Error("Invalid exchange API response");
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
      AUD: 1.52,
      CAD: 1.36,
    });
  }
});

export default router;
