/**
 * Shared Airtable helper for GAE Leads table.
 */
const path = require("path");
const fs = require("fs");

const projectRoot = path.join(__dirname, "..");
try {
  const dotenv = require("dotenv");
  for (const name of [".env.local", ".env"]) {
    const full = path.join(projectRoot, name);
    if (fs.existsSync(full)) dotenv.config({ path: full });
  }
} catch (_) {}

const AIRTABLE_API = "https://api.airtable.com/v0";

async function postGaeLead(fields) {
  const token = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_TABLE_NAME || "GAE Leads";

  if (!token || !baseId) {
    const err = new Error(
      "Server misconfiguration: set AIRTABLE_API_KEY and AIRTABLE_BASE_ID"
    );
    err.statusCode = 500;
    throw err;
  }

  const airtableUrl = `${AIRTABLE_API}/${encodeURIComponent(
    baseId
  )}/${encodeURIComponent(tableName)}`;

  const airtableRes = await fetch(airtableUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ records: [{ fields }] }),
  });

  const data = await airtableRes.json().catch(() => ({}));

  if (!airtableRes.ok) {
    const hint =
      data?.error?.message ||
      data?.error?.type ||
      JSON.stringify(data).slice(0, 200);
    const err = new Error(hint || "Airtable request failed");
    err.statusCode = 502;
    err.details = data;
    throw err;
  }

  return data;
}

module.exports = { postGaeLead };
