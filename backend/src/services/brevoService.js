const BREVO_BASE_URL = "https://api.brevo.com/v3";

function getHeaders() {
  if (!process.env.BREVO_API_KEY) {
    throw new Error("BREVO_API_KEY is not configured.");
  }

  return {
    "Content-Type": "application/json",
    "api-key": process.env.BREVO_API_KEY,
  };
}

export async function addSubscriberToBrevo(email) {
  const listId = Number(process.env.BREVO_LIST_ID);

  if (!Number.isInteger(listId) || listId < 1) {
    throw new Error("BREVO_LIST_ID must be a valid numeric Brevo list ID.");
  }

  const response = await fetch(`${BREVO_BASE_URL}/contacts`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      email,
      listIds: [listId],
      updateEnabled: true,
    }),
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.message || "Unable to add contact to Brevo.");
  }

  return response.json().catch(() => ({}));
}

export async function removeSubscriberFromBrevo(email) {
  const listId = Number(process.env.BREVO_LIST_ID);

  if (!Number.isInteger(listId) || listId < 1) {
    throw new Error("BREVO_LIST_ID must be a valid numeric Brevo list ID.");
  }

  const response = await fetch(
    `${BREVO_BASE_URL}/contacts/lists/${listId}/contacts/remove`,
    {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ emails: [email] }),
    }
  );

  // A missing Brevo contact is already effectively unsubscribed.
  if (!response.ok && response.status !== 404) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.message || "Unable to remove contact from Brevo.");
  }
}