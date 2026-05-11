import { normalizePhone } from "./formatPhone";

export type LeadPayload = {
  name: string;
  phone: string;
  car?: string;
  transmissionType?: string;
  symptom?: string;
  message?: string;
  pageUrl: string;
  formSource: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  website?: string;
};

type ApiResponse = {
  success: boolean;
  message: string;
};

let csrfToken: string | null = null;

export const getUtmParams = () => {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);

  return {
    utm_source: params.get("utm_source") ?? "",
    utm_medium: params.get("utm_medium") ?? "",
    utm_campaign: params.get("utm_campaign") ?? "",
    utm_content: params.get("utm_content") ?? "",
    utm_term: params.get("utm_term") ?? "",
  };
};

export const getCsrfToken = async () => {
  if (csrfToken) return csrfToken;

  const response = await fetch("/api/csrf.php", {
    credentials: "same-origin",
    headers: { Accept: "application/json" },
  });

  if (!response.ok) throw new Error("Не удалось получить CSRF token");

  const data = (await response.json()) as { token?: string };
  if (!data.token) throw new Error("Пустой CSRF token");

  csrfToken = data.token;
  return csrfToken;
};

export const submitLead = async (payload: LeadPayload): Promise<ApiResponse> => {
  const token = await getCsrfToken();
  const response = await fetch("/api/lead.php", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-CSRF-Token": token,
    },
    body: JSON.stringify({
      ...payload,
      phone: normalizePhone(payload.phone),
    }),
  });

  const data = (await response.json().catch(() => null)) as ApiResponse | null;

  if (!response.ok || !data) {
    throw new Error(data?.message || "Не удалось отправить заявку");
  }

  if (!data.success) throw new Error(data.message || "Не удалось отправить заявку");

  return data;
};
