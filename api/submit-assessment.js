/**
 * POST /api/submit-assessment
 * Body: assessment answers mapped to GAE Leads schema.
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
  const phone = String(body.phone || "").trim();
  const painArea = String(body.painArea || "").trim();
  const painDuration = String(body.painDuration || "").trim();
  const painScore = Number(body.painScore);
  const treatmentsTried = String(body.treatmentsTried || "").trim();
  const surgerySituation = String(body.surgerySituation || "").trim();
  const patientNotes = String(body.patientNotes || "").trim();
  const utmSource =
    String(body.utm_source || "").trim() || "assessment page";

  if (!firstName) {
    return res.status(400).json({ error: "firstName is required" });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "A valid email is required" });
  }
  if (!painArea || !painDuration || !surgerySituation) {
    return res.status(400).json({
      error: "Incomplete assessment: pain area, duration, and surgery responses are required",
    });
  }
  if (!Number.isFinite(painScore) || painScore < 1 || painScore > 10) {
    return res.status(400).json({ error: "painScore must be between 1 and 10" });
  }

  const fields = {
    Source: "Assessment",
    "Source Detail": "assessment-quiz",
    "First Name": firstName,
    Email: email,
    "Pain Area": painArea,
    "Pain Duration": painDuration,
    "Pain Score": painScore,
    "Treatments Tried": treatmentsTried || "none indicated",
    "Surgery Situation": surgerySituation,
    Status: "New",
    utm_source: utmSource,
  };

  if (phone) {
    fields["Phone Number"] = phone;
  }
  if (patientNotes) {
    fields["Patient Notes"] = patientNotes;
  }

  try {
    const data = await postGaeLead(fields);
    const recordId = data.records?.[0]?.id;
    try {
      await notifyGaePilot("assessment", {
        firstName,
        email,
        phone: phone || "",
        painArea,
        painDuration,
        painScore: String(painScore),
        treatmentsTried: treatmentsTried || "none indicated",
        surgerySituation,
        patientNotes: patientNotes || "",
        utmSource,
        airtableId: recordId,
      });
    } catch (slackErr) {
      console.error("[slack] assessment notify failed:", slackErr.message || slackErr);
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
