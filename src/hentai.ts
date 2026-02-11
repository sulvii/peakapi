export function hentaiIMeanFixTheUrl(input: string): string {
  const cleaned = input.replace(/\\\//g, "/");

  if (/^https?:\/\//i.test(cleaned)) {
    return cleaned;
  }

  return `https://${cleaned.replace(/^\/+/, "")}`;
}
