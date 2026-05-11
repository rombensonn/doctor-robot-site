export type AnalyticsEvent =
  | "click_phone"
  | "click_whatsapp"
  | "click_telegram"
  | "lead_submit"
  | "open_modal"
  | "service_click";

export const trackEvent = (event: AnalyticsEvent, payload: Record<string, unknown> = {}) => {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...payload });
};
