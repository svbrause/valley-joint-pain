/**
 * Posts to Slack Incoming Webhook for #gae-pilot (URL is channel-scoped when created in Slack).
 * Env: SLACK_WEBHOOK_GAE_PILOT — if unset, all calls no-op.
 */

const WEBHOOK = process.env.SLACK_WEBHOOK_GAE_PILOT;

function clip(s, max = 900) {
  const t = String(s ?? "").trim();
  if (!t) return "—";
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1)}…`;
}

/** Strip Slack mrkdwn control chars so a name is safe inside *bold*. */
function safeNameForSlack(s, max = 48) {
  const t = String(s ?? "")
    .trim()
    .replace(/[*_`]/g, "")
    .replace(/\s+/g, " ")
    .slice(0, max);
  return t || "Someone";
}

function field(label, value) {
  return {
    type: "mrkdwn",
    text: `*${label}*\n${clip(value, 900)}`,
  };
}

async function postSlack({ fallback, blocks }) {
  if (!WEBHOOK) {
    console.warn("[slack] SLACK_WEBHOOK_GAE_PILOT not set; skipping notification");
    return;
  }
  const res = await fetch(WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: fallback,
      blocks,
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Slack webhook ${res.status}: ${body.slice(0, 500)}`);
  }
}

/**
 * @param {"lead_magnet"|"assessment"|"consultation"} kind
 * @param {Record<string, string|number|undefined|null>} data
 */
async function notifyGaePilot(kind, data) {
  if (kind === "lead_magnet") {
    const firstName = data.firstName;
    const email = data.email;
    const utm = data.utmSource;
    const airtableId = data.airtableId;
    const fallback = `Lead magnet: ${firstName} <${email}>`;
    const blocks = [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*📥 Lead magnet* — homepage (name + email)",
        },
      },
      {
        type: "section",
        fields: [
          field("First name", firstName),
          field("Email", email),
          field("UTM / source", utm),
          ...(airtableId ? [field("Airtable record", airtableId)] : []),
        ],
      },
    ];
    await postSlack({ fallback, blocks });
    return;
  }

  if (kind === "assessment") {
    const fallback = `Assessment: ${data.firstName} <${data.email}> · ${data.painArea}`;
    const blocks = [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*📋 Assessment submitted* — full quiz + contact",
        },
      },
      {
        type: "section",
        fields: [
          field("First name", data.firstName),
          field("Email", data.email),
          field("Phone", data.phone),
          field("Pain area", data.painArea),
          field("Pain duration", data.painDuration),
          field("Pain score (1–10)", data.painScore),
        ],
      },
      {
        type: "section",
        fields: [
          field("Treatments tried", data.treatmentsTried),
          field("Surgery situation", data.surgerySituation),
          field("Patient notes", data.patientNotes),
          field("UTM / source", data.utmSource),
          ...(data.airtableId ? [field("Airtable record", data.airtableId)] : []),
        ],
      },
    ];
    await postSlack({ fallback, blocks });
    return;
  }

  if (kind === "consultation") {
    const who = safeNameForSlack(data.firstName);
    const fallback = `${who} requested a free consultation`;
    const blocks = [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `☎️ *${who} requested a free consultation* — tapped “Request a free consultation” on the assessment thank-you page.`,
        },
      },
      {
        type: "section",
        fields: [
          field("Name (from assessment)", data.firstName),
          field("Email", data.email),
          field("Phone (if provided)", data.phone),
        ],
      },
    ];
    await postSlack({ fallback, blocks });
    return;
  }

  console.warn("[slack] unknown kind:", kind);
}

module.exports = { notifyGaePilot };
