export const normalizePhone = (value: string) => {
  const digits = value.replace(/\D/g, "");

  if (digits.length === 11 && digits.startsWith("8")) return `+7${digits.slice(1)}`;
  if (digits.length === 11 && digits.startsWith("7")) return `+${digits}`;
  if (digits.length === 10) return `+7${digits}`;

  return value.trim();
};

export const formatPhoneInput = (value: string) => value.replace(/[^\d+() -]/g, "").slice(0, 24);
