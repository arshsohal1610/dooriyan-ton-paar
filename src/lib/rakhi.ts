export type PersonDetails = {
  name: string;
  location: string;
  photo: string;
};

export type RakhiRecord = {
  id: string;
  sister: PersonDetails & { message: string };
  brother?: PersonDetails;
  createdAt: string;
};

const RECORD_PREFIX = "doorian-ton-paar:rakhi:";
const ACTIVE_RAKHI_KEY = "doorian-ton-paar:active-rakhi";

export function createRakhiId() {
  return (
    crypto.randomUUID?.().split("-")[0] ??
    Math.random().toString(36).slice(2, 10)
  );
}

export function saveRakhi(record: RakhiRecord) {
  // Keep local storage so the existing app continues to work.
  localStorage.setItem(
    `${RECORD_PREFIX}${record.id}`,
    JSON.stringify(record)
  );

  sessionStorage.setItem(ACTIVE_RAKHI_KEY, record.id);

  // Also save the Rakhi online so another device can open it.
  fetch(`/api/rakhi/${record.id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(record),
  }).catch((error) => {
    console.error("Could not save Rakhi online:", error);
  });
}

export function getRakhi(id: string): RakhiRecord | null {
  const value = localStorage.getItem(`${RECORD_PREFIX}${id}`);

  if (!value) return null;

  try {
    return JSON.parse(value) as RakhiRecord;
  } catch {
    return null;
  }
}

export async function getRakhiOnline(
  id: string
): Promise<RakhiRecord | null> {
  try {
    const response = await fetch(`/api/rakhi/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) return null;

    const record = (await response.json()) as RakhiRecord;

    // Store the online record locally too.
    localStorage.setItem(
      `${RECORD_PREFIX}${id}`,
      JSON.stringify(record)
    );

    sessionStorage.setItem(ACTIVE_RAKHI_KEY, id);

    return record;
  } catch (error) {
    console.error("Could not load Rakhi online:", error);
    return null;
  }
}

export function setActiveRakhi(id: string) {
  sessionStorage.setItem(ACTIVE_RAKHI_KEY, id);
}

export function getActiveRakhi() {
  return sessionStorage.getItem(ACTIVE_RAKHI_KEY);
}

export function getActiveRecord() {
  const id = getActiveRakhi();
  return id ? getRakhi(id) : null;
}

export function readPhoto(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(String(reader.result));

    reader.onerror = () =>
      reject(new Error("We couldn't read that photo."));

    reader.readAsDataURL(file);
  });
}