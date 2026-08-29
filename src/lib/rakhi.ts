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

export async function saveRakhi(record: RakhiRecord) {
  // Keep a local copy too.
  localStorage.setItem(
    `${RECORD_PREFIX}${record.id}`,
    JSON.stringify(record)
  );

  sessionStorage.setItem(ACTIVE_RAKHI_KEY, record.id);

  // Wait for MongoDB to save before continuing.
  const response = await fetch(`/api/rakhi/${record.id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(record),
  });

  if (!response.ok) {
    throw new Error("Could not save Rakhi online.");
  }

  return record;
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

    if (!response.ok) {
      return null;
    }

    const record = (await response.json()) as RakhiRecord;

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

/**
 * Reads a photo from the user's phone and automatically
 * resizes/compresses it before storing it.
 *
 * This allows large iPhone/Android camera photos to work
 * without putting huge Base64 images into storage/database.
 */
export function readPhoto(file: File) {
  return new Promise<string>((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("Please select an image file."));
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const image = new Image();

      image.onload = () => {
        const MAX_SIZE = 1200;

        let width = image.width;
        let height = image.height;

        // Resize large photos while preserving their aspect ratio.
        if (width > MAX_SIZE || height > MAX_SIZE) {
          if (width > height) {
            height = Math.round((height * MAX_SIZE) / width);
            width = MAX_SIZE;
          } else {
            width = Math.round((width * MAX_SIZE) / height);
            height = MAX_SIZE;
          }
        }

        const canvas = document.createElement("canvas");

        canvas.width = width;
        canvas.height = height;

        const context = canvas.getContext("2d");

        if (!context) {
          reject(new Error("Could not process the photo."));
          return;
        }

        context.drawImage(image, 0, 0, width, height);

        // JPEG compression keeps the image much smaller
        // while maintaining good visual quality.
        const compressedPhoto = canvas.toDataURL(
          "image/jpeg",
          0.75
        );

        resolve(compressedPhoto);
      };

      image.onerror = () => {
        reject(new Error("We couldn't process that photo."));
      };

      image.src = String(reader.result);
    };

    reader.onerror = () => {
      reject(new Error("We couldn't read that photo."));
    };

    reader.readAsDataURL(file);
  });
}