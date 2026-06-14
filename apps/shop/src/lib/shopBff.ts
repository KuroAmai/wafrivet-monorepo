function readErrorMessage(data: unknown, status: number): string {
  if (data && typeof data === "object") {
    const record = data as { message?: string | string[]; error?: string };
    if (typeof record.message === "string" && record.message.trim()) {
      return record.message;
    }
    if (Array.isArray(record.message) && record.message.length > 0) {
      return record.message.join(", ");
    }
    if (typeof record.error === "string" && record.error.trim()) {
      return record.error;
    }
  }
  return `Request failed (${status})`;
}

export async function shopBff<T>(path: string, init?: RequestInit & { json?: unknown }): Promise<T> {
  const headers = new Headers(init?.headers);
  if (init?.json !== undefined) {
    headers.set("Content-Type", "application/json");
  }
  const res = await fetch(path, {
    ...init,
    headers,
    credentials: "same-origin",
    body: init?.json !== undefined ? JSON.stringify(init.json) : init?.body,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(readErrorMessage(data, res.status));
  }
  return data as T;
}

export async function shopBffForm<T>(path: string, formData: FormData): Promise<T> {
  const res = await fetch(path, {
    method: "POST",
    body: formData,
    credentials: "same-origin",
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(readErrorMessage(data, res.status));
  }
  return data as T;
}
