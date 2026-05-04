/**
 * POST /api/notify-consultation-request
 * Fired when the user taps “Request a free consultation” (tel:) on the assessment results page.
 * Body (optional): { firstName?, email?, phone? } — whatever the browser still has from the quiz.
 */
const { notifyGaePilot } = require("./slackGaePilot");

module.exports = async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }

  const firstName = String(body.firstName || "").trim();
  const email = String(body.email || "").trim();
  const phone = String(body.phone || "").trim();

  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    await notifyGaePilot("consultation", { firstName, email, phone });
  } catch (e) {
    console.error("[slack] consultation notify failed:", e.message || e);
  }
  return res.status(200).json({ ok: true });
};
