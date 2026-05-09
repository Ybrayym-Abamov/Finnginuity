import { Client } from "@hubspot/api-client";

export function getHubSpotClient(): Client | null {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!token) {
    return null;
  }
  return new Client({ accessToken: token });
}

/** Call from Stripe webhooks or forms; implement search-then-create to avoid duplicates. */
export async function syncLeadPlaceholder(email: string, source: string) {
  const client = getHubSpotClient();
  if (!client) {
    return { ok: false as const, reason: "missing_token" as const };
  }

  void client;
  void email;
  void source;
  // Example: client.crm.contacts.searchApi.doSearch({ filterGroups: [...] })
  // then basicApi.create or basicApi.update.

  return { ok: true as const };
}
