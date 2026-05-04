/**
 * POST /api/submit-lead-magnet
 * Body: { firstName, email, utm_source? }
 */
const { postGaeLead } = require("./airtableClient");
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
      return res.status(400).json({ error: "Invalid JSON" });
    }
  }

  const firstName = String(body.firstName || "").trim();
  const email = String(body.email || "").trim();
  const utmSource =
    String(body.utm_source || "").trim() || "landing page lead form";

  if (!firstName) {
    return res.status(400).json({ error: "firstName is required" });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "A valid email is required" });
  }

  const fields = {
    Source: "Lead Magnet",
    "Source Detail": "homepage-conversation-guide",
    "First Name": firstName,
    Email: email,
    Status: "New",
    utm_source: utmSource,
  };

  try {
    const data = await postGaeLead(fields);
    const recordId = data.records?.[0]?.id;
    try {
      await notifyGaePilot("lead_magnet", {
        firstName,
        email,
        utmSource,
        airtableId: recordId,
      });
    } catch (slackErr) {
      console.error("[slack] lead_magnet notify failed:", slackErr.message || slackErr);
    }
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(200).json({
      ok: true,
      id: recordId,
      createdTime: data.records?.[0]?.createdTime,
    });
  } catch (e) {
    const code = e.statusCode || 500;
    if (code === 500) {
      return res.status(500).json({ error: e.message });
    }
    console.error("Airtable error", e.details || e.message);
    return res.status(code).json({
      error: "Could not save to Airtable",
      details:
        process.env.VERCEL_ENV === "development" ||
        process.env.NODE_ENV === "development"
          ? e.message
          : undefined,
    });
  }
};
